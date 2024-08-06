const cron = require("node-cron");
const express = require("express");
const moment = require("moment");
const axios = require('axios');

let currentTime = moment().format("hh:mm:ss");
console.log("Inicio de proceso");
console.log(moment().format("hh:mm:ss"));
console.log("********");

const app = express();

cron.schedule("0 0 1 * *", function () {
  axios.get(`https://ahorro-energetico-consumo.herokuapp.com/api/consumo/getMetasIncumplidas`)
  .then((res)=>{
    console.log(`Metas notificadas: ${res}`);
  })
  .catch((error)=>{
    console.log(`Ocurrio un error al notificar las metas ${error}`)
  })
});

// Ejecutamos la aplicación en el puerto 3000
const PORT = process.env.PORT || 4001;
app.listen(PORT);
