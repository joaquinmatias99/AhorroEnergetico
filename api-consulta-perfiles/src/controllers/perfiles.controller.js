const axios = require('axios');
const moment = require("moment");
var institucionGlobal;

const getPerfiles = async (req, res) => {
    var { date, institucion } = req.body;

    date = moment(date);
    institucionGlobal = institucion;

    const fecha = date.format('YYYY-MM-DD');
    const hora = date.format('HH:mm:ss');
    const dia = date.day() == 0 ? 7 : date.day();

    console.log(institucionGlobal, fecha, hora, dia)

    try {
        var acciones = [];

        //perfil por evento
        var result = await axios.get("https://ahorro-energetico-api-pereven.herokuapp.com/api/eventos/get/?fecha=" + fecha + "&institucion=" + institucionGlobal);
        var data = result.data;
        
        if (data.length > 0) {
            acciones = await analizarEvento(data, fecha ,hora);

            res.json(acciones);  
        }

        //perfil por dia
        else{ 
            result = await axios.get("https://ahorro-energetico-api-perfdia.herokuapp.com/api/perfilXDia/get/?dia=" + dia + "&fechaUltAccion=" + fecha + "&institucion=" + institucionGlobal);
            data = result.data;

            if (data.length > 0){
                acciones = await analizarDia(data, fecha, hora);
            } 
            res.json(acciones);
        }

    } catch (error) {
        res.status(500).json({ message: "Error interno: " + error.message});
    }
};


async function analizarEvento(data, fecha, hora){
    var acciones = [];
    var pisos = [];

    for (var i = 0; i < data.length; i++) {
        if (data[i].activado){
            var piso = data[i].planta;

            if (hora >= data[i].horaDesde && hora <= data[i].horaHasta){
                console.log("Evento activo");
                pisos.push("piso " + piso);
            }

            else if (hora > data[i].horaHasta){ 
                console.log("Termino el evento"); 
                
                //desctivar evento
                await axios.put("https://ahorro-energetico-api-pereven.herokuapp.com/eventos/?dia=" + fecha + "&planta=" + piso + "&institucion=" + institucionGlobal, {
                    "fecha": fecha,
                    "activado": 0,
                    "horaHasta": data[i].horaHasta,
                    "horaDesde": data[i].horaDesde,
                    "planta": piso
                });

                acciones = acciones.concat(await apagarPorPlanta(piso));
            }
            else{
                console.log("No hacer nada");
            }
        }
    }

    if(pisos.length > 0) {
        //llamar servicio de acciones
        acciones = acciones.concat(await analizar(pisos))
    }
    return acciones;
}

async function analizarDia(data, fecha, hora) {
    var pisos = [];
    var acciones = [];

    for (var i = 0; i < data.length; i++) {
        var piso = data[i].planta;

        if (hora >= data[i].horaDesde && hora <= data[i].horaHasta){
            console.log("Analizar piso " + i)
            pisos.push("piso " + piso);
        }
        else if (hora > data[i].horaHasta){
            console.log("Actualizar ultima fecha perfil dia");

            //actualizar la fehaUltAccion
            await axios.put("https://ahorro-energetico-api-perfdia.herokuapp.com/api/perfilXDia/?dia=" + data[i].dia + "&planta=" + piso + "&institucion=" + institucionGlobal, {
                "horaHasta": data[i].horaHasta,
                "horaDesde": data[i].horaDesde,
                "fechaUltAccion": fecha
            });
            
            acciones = acciones.concat(await apagarPorPlanta(piso));   
        }
        else{
            console.log("No hacer nada");
        }
    }

    if (pisos.length > 0) {
        //llamar servicio de acciones
        acciones = acciones.concat(await analizar(pisos));
    }
    return acciones;
}


async function analizar(pisos){
    try{
        //servicio de acciones
        const res = await axios.post("https://ahorro-energetico-api-analizar.herokuapp.com/api/analizar", {
            "institucion": institucionGlobal,
            "plantas": pisos
        });
        const data = res.data;
        return data

    } catch(e) {
        return [];
    }
}


async function apagarPorPlanta(piso) {
    var disp = [];
    try {
        var res = await axios.get("https://ahorro-energetico-api-disps.herokuapp.com/api/dispositivos/?planta=" + piso + "&institucion=" + institucionGlobal + "&config=true");
        var data = res.data;

        if(data.length > 0){
            for (var i = 0; i < data.length; i++) {
                if(data[i].tipoConexion == "Manual"){
                    console.log("Mandar aviso de apagar dispositivo " + data[i].nombre);
                    //TODO: llamar servicio de mensajeria aviso/recordatorio
                } else {
                    var log = {
                        "accion":"OFF",
                        "objetivo": "Ahorrar energia",
                        "tipoDato": "PERFIL TERMINADO",
                        "valor":0,
                        "nombre": data[i].nombre,
                        "direccionIP": data[i].direccionIP,
                        "numeroDispArduino": data[i].numeroDispArduino,
                        "planta": data[i].planta,
                        "aula": data[i].aula
                    };
                    disp.push(log);
                }
            }
        } 
        return disp;
    } catch (error) {
        console.log("error");
    }
}

export const methods = {
    getPerfiles
};