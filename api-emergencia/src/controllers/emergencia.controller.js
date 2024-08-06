import { getConnection } from "../database/database";
const axios = require('axios');


const apagadoEmergencia = async (req, res) => {
    const  {institucion, planta, jurisdiccion, tipoSensor}  = req.body;
    console.log(`Institucion: ${institucion}, Plantas: ${planta} , Jurisdiccion:${jurisdiccion} Tipo sensor: ${tipoSensor}`)
    //TODO: Agregar llamada a servicio de notificacion.
    console.log(`NOTIFICACION!: ! El ${planta} entro en protocolo de emergencia, verificar equipos manuales !`)
    const connection = await getConnection();
    try {
        const dispositivos = await connection.query(`select * from dispositivo where dispositivo.planta=${planta} and dispositivo.institucion=${institucion} and dispositivo.jurisdiccion=${jurisdiccion} and dispositivo.tipoConexion!='Manual'`)
    } catch (error) {
        console.log(`Error al obtener dispositivos de la BD error: ${error}`)
        res.status(500).json({message: `Error al obtener dispositivos de la BD error: ${error}`})
    }
    let offOk=0;
    let offError=0
    if (dispositivos && dispositivos.length>0){
        dipositivos.forEach(async dispositivo => {
            await axios.get(`https://localhost:8080/accionar?ip=${dispositivo.direccionIP}&dispositivo=${numeroDispArduino}&instruccion=OFF`)
            .then(async (res) => {
                console.log(`Dispositivo ${dispositivo.nombre} apagado por protocolo de emergencia`)
                offOk=offOk+1;
                await axios.post('https://ahorro-energetico-api-log.herokuapp.com/api/logAcciones',{
                    accion:'OFF',
                    objetivo: 'Emergencia',
                    tipoDato: tipoSensor,
                    valor: 0,
                    nombre:dipositivo.nombre,
                    direccionIP:dispositivo.direccionIP,
                    numeroDispArduino:dispositivo.numeroDispArduino,
                    planta:planta,
                    aula:dispositivo.aula
                })
                .then((res)=> console.log(`Apagado de emergencia registrado del dispositivo ${dispositivo.nombre} en el aula ${dispositivo.aula} , piso ${dispositivo.planta}`))
                .catch((error) => {console.log("No se pudo logear la accion ", error);})
                //TODO: Agregar log accion?
            })
            .catch((error)=>{
                console.log(`Dispositivo ${dispositivo.nombre} fallo el apagado por protocolo de emergencia. Error: ${error}`)
                offError=offError+1
            })
            });
            res.status(200).json({message: `PROTOCOLO EMERGENCIA DISPOSITIVOS APAGADOR: ${offOk} , DISPOSITIVOS QUE NO SE PUDIERON APAGAR ${offError}`})   
    }}



export const methods = {
    apagadoEmergencia,
};
