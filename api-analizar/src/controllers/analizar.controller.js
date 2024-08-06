import { getConnection } from "../database/database";
const axios = require('axios');

const derivarAcciones = (acciones, sensor, area) => {
    console.log("Acciones: ", acciones)
    var disp = []
    //let logeoOk = true
    acciones.forEach(accion=>{
        if (accion.tipoDispositivo != 'Manual'){
            
            disp.push({
                "accion":accion.accionAplicar,
                "objetivo": accion.objetivo,
                "tipoDato": sensor.tipo,
                "valor": sensor.registros[(sensor.registros.length)-1].valor,
                "nombre": accion.nombre,
                "direccionIP":accion.direccionIP,
                "numeroDispArduino":accion.numeroDispArduino,
                "planta":area.piso,
                "aula":area.nombre
            });
            
            console.log("Ejecutando...Manda")
        }
        else{
            let msg = `Modulo Ahorro Enegergetico: Se recomienda ${accion.objetivo} del dispositivo ${accion.descripcion} en el aula ${accion.aula} , piso ${accion.planta}`
            //TODO: LLAMAR SERVICIO NOTIFICAR
            //TODO: Si es que hay que llemar a log accion agregar el llamado
            
            /*axios.post('https://ahorro-energetico-api-log.herokuapp.com/api/logAcciones',{
                accion:accion.accionAplicar,
                objetivo: accion.objetivo,
                tipoDato: sensor.tipo,
                valor: sensor.registros[(sensor.registros.length)-1].valor,
                nombre:`${accion.direccionIP}${accion.numeroDispArduino}`,
                direccionIP:accion.direccionIP,
                numeroDispArduino:accion.numeroDispArduino,
                planta:area.piso,
                aula:area.nombre
            })
            .then((res)=> console.log(`Accion registrada ${accion.objetivo} del dispositivo ${accion.descripcion} en el aula ${accion.aula} , piso ${accion.planta}`))
            .catch((error) => {console.log("No se pudo logear la accion ", error); logeoOk=false})*/
            console.log("Notificando... " , msg)
        }
    })

    return disp;   
}

const generarConsulta = (aula, sensor) => {
    return `SELECT criterio.objetivo,descripcionDisp.descripcion,dispositivo.direccionIP,dispositivo.tipoConexion, dispositivo.numeroDispArduino,accion.prioridad, accion.accionAplicar, dispositivo.aula, dispositivo.planta, dispositivo.nombre 
    FROM criterio JOIN accion on criterio.criterioID=accion.criterioID
    JOIN dispositivo on accion.descID=dispositivo.descID
    JOIN descripcionDisp on descripcionDisp.id=dispositivo.descID
    WHERE dispositivo.planta=${aula.piso} AND dispositivo.aula="${aula.nombre}" AND criterio.dato="${sensor.tipo}"
    AND dispositivo.reparacion=false AND criterio.valorMIN <= ${sensor.registros[(sensor.registros.length)-1].valor}
    AND criterio.valorMAX >= ${sensor.registros[(sensor.registros.length)-1].valor} ORDER BY accion.prioridad ASC`
}



const analizar = async (req, res) => {
    const  {institucion, plantas}  = req.body;
    console.log(`Institucion: ${institucion}, Plantas: ${plantas}`)
    
    var acciones = [];
    const plantasIOT = await axios.get('http://localhost:3099/sensores/consulta')
    .then((response) => {
        return response.data
    })
    .catch((error) =>{console.log(`Error ${error}`)})

    const plantasKeys = Object.keys(plantasIOT)
    //Me quedo unicamente con las plantas que vinieron en el request
    
    const plantasMap = plantasKeys.map((plantaKey) => {
        if(plantas.includes(plantaKey)){
            return plantasIOT[plantaKey]
        }
        else{
            return null
        }
    })
    //Elimino nulos
    let  plantasFiltradas= plantasMap.filter((planta)=>planta!=undefined);
    const connection = await getConnection();

    for await (const planta of plantasFiltradas) {
        for await (const aula of planta) {
            for await (const sensor of aula.sensores) {
                if(sensor.registros.length > 0){
                    try {
                        const result = await connection.query(generarConsulta(aula, sensor));
                        if (result.length > 0){
                            acciones = acciones.concat(derivarAcciones(result,sensor,aula));
                        }                   
                    }
                    catch{(error) =>{console.log(error)}}
                }
            }
        }
    };
    
    return res.json(acciones);
}

export const methods = {
    analizar,
};
