const express = require("express");
const bp = require("body-parser");
const app = express();
const port = 3099;
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log("El servidor está inicializado en el puerto 3099");
});

app.get("/", (req, res) => {
  return res.status(200).json("Hello");
});

app.get("/sensores/consulta", (req, res) => {
  
  let obj = {
    "piso 0":[
      {
        id: 2,
        nombre: "Oficina 1",
        piso: 0,
        descripcion: "nose",
        sensores: [
          {
            id: 0,
            tipo: "TEMPERATURA",
            unidadDeMedida: "",
            descripcion: "",
            registros: [
              {
                id: 0,
                fecha: "2022-10-03T21:49:02.535Z",
                unidad: "string",
                valor: 30,
                frecuencia: 0
              }
            ]
          }
        ]
      },
      {
        id: 2,
        nombre: "Oficina 2",
        piso: 0,
        descripcion: "nose",
        sensores: [
          {
            id: 0,
            tipo: "TEMPERATURA",
            unidadDeMedida: "",
            descripcion: "",
            registros: [
              {
                id: 0,
                fecha: "2022-10-03T21:49:02.535Z",
                unidad: "string",
                valor: 10,
                frecuencia: 0
              }
            ]
          }
        ]
      }
    ],
    "piso 2":[
      {
        id: 2,
        nombre: "Aula 11",
        piso: 2,
        descripcion: "nose",
        sensores: [
          {
            id: 0,
            tipo: "TEMPERATURA",
            unidadDeMedida: "",
            descripcion: "",
            registros: [
              {
                id: 0,
                fecha: "2022-10-03T21:49:02.535Z",
                unidad: "string",
                valor: 30,
                frecuencia: 0
              }
            ]
          }
        ]
      },
      {
        id: 2,
        nombre: "Aula 12",
        piso: 2,
        descripcion: "nose",
        sensores: [
          {
            id: 0,
            tipo: "TEMPERATURA",
            unidadDeMedida: "",
            descripcion: "",
            registros: [
              {
                id: 0,
                fecha: "2022-10-03T21:49:02.535Z",
                unidad: "string",
                valor: 10,
                frecuencia: 0
              }
            ]
          }
        ]
      }
    ]
  }
  return res.status(200).json(obj);
});

app.get("/", (req, res) => {
  return res.status(200).json("Hello");
});

app.post("/sensores/obtenerDatos", (request, response) => {
  console.log(request.body);
  return response.status(200).json("holi");
});
