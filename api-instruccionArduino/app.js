//correr la siguiente linea
//npm i
// npm i body-parser
const express = require("express");
const cors = require("cors")
const app = express();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
var puerto = 8080;
var port = process.env.PORT || puerto;
app.use(express.json());  // debe estar 
//var bodyParser = require('body-parser');
const { json } = require("stream/consumers");
//app.use(bodyParser.json());
app.use(cors(/*origin: ["http://localhost"]*/));


app.post("/accionar", async (req, res) => {

 //  console.log(req.body.acciones);

  const acciones = req.body.acciones;

  

    if (Object.keys(acciones).length > 0) {


      acciones.forEach(async accion => {
      
        
          
        var instruccion = accion.accion;
        var ip = accion.direccionIP;
        var dispositivo = accion.numeroDispArduino;
        
          await fetch("http://" + ip + "/" + dispositivo + "=" + instruccion)
          .then( async(response) => {
            console.log(accion);
         await fetch("https://ahorro-energetico-api-log.herokuapp.com/api/logAcciones", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(accion),
            
          }) 
          
          })
          
          .catch(() => console.log("No se pudo comunicar con la placa arduino"));
      
         
          console.log("http://" + ip + "/" + dispositivo + "=" + instruccion);
          
      
         
         
    })
      
    } 

    return res.status(200).json("conexion finalizada");  
  
    
   } );

app.listen(port, () => {
  console.log("El servidor está inicializado en el puerto: " + puerto);
});


