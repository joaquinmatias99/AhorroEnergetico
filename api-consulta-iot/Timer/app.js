//https://blog.nubecolectiva.com/como-programar-tareas-en-node-js/
//https://es.stackoverflow.com/questions/198566/como-obtener-la-hora-del-servidor-con-node-js
//https://www.youtube.com/watch?v=gtzybGmJ3is&ab_channel=StevCode
const cron = require("node-cron");
const express = require("express");
const moment = require("moment");
const config = require('./appsetting.json');

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

console.log("Inicio de proceso");
console.log(moment().format("hh:mm:ss"));
console.log("********");

const app = express();
app.use(express.json());

const institucion = config.institucion;

cron.schedule(" */1 * * * *", async function () {
  try {
    var date = moment();
    console.log(date);
    var res = await fetch("https://ahorro-energetico-api-perfiles.herokuapp.com/api/consultarPerfiles",{ //cambiar con url de heroku
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "date": date,
        "institucion": institucion
      }),
    });
    var data = await res.json();

    if(data.length > 0) {
      await fetch("http://localhost:8080/accionar", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}),
      })
    }
  } catch (error) { 
    console.warn(error) 
  };
})
// Ejecutamos la aplicación en el puerto 3000
app.listen(3000);