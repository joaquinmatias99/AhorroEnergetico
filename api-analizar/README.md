# Nombre Servicio

### Metodo tal 1

```sh
curl --location --request POST 'http://localhost:3099/sensores/obtenerDatos' \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "id": 22,
        "nombre": "aula22",
        "piso": 1,
        "descripcion": "nose",
        "sensores": [
            {
                "id": 0,
                "tipo": "temperatura",
                "unidadDeMedida": "",
                "descripcion": "",
                "registros": [
                    {
                        "id": 0,
                        "fecha": "2022-10-03T21:49:02.535Z",
                        "unidad": "string",
                        "valor": 10,
                        "frecuencia": 0
                    }
                ]
            }
        ]
    }
]'
```

### Metodo tal 2

```sh
curl --location --request GET 'http://localhost:8080/accionar/?ip=101.111.154.1&dispositivo=pp&instruccion=off'
```