# CRUD Log de Operacion
Curl para poder probar los metodos

#### Consulta operaciones

### Valores para la consulta
 Estos valores deben manejarse desde un comboBox en la web
> operacion : 0 para traer todos los registros, 1 para filtrar por fecha, 2 para filtrar entre fechas
> fecha: campo requerido en el request body para realizar el filtrado por fecha
> fechaDesde : campo requerido en el request body para realizar el filtrado entre fechas, indica el inicio del intervalo
> fechaHasta : campo requerido en el request body para realizar el filtrado entre fechas, indica el fin del intervalo

### Consulta todos las operaciones

```sh
curl --location --request GET 'http://localhost:4008/api/logAcciones/0?institucion=La manzana de isaac' \
--header 'Content-Type: application/json' \
--data-raw '{"operacion": 0}'
```

### Consulta de operaciones en una fecha

```sh
curl --location --request GET 'https://ahorro-energetico-api-log.herokuapp.com/api/logAcciones/1?institucion=La manzana de isaac' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fecha": "2022-10-17 16:52:03"
}'
```

### Consulta de operaciones entre fechas

```sh
curl --location --request GET 'https://ahorro-energetico-api-log.herokuapp.com/api/logAcciones/2?institucion=La manzana de isaac' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fechaDesde": "2022-10-17 16:55:03",
    "fechaHasta": "2022-10-17 17:00:03"
}'

```

### Registrar una operacion

```sh
curl --location --request POST 'http://localhost:4008/api/logAcciones/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "accion":"ON",
    "objetivo": "Bajar temperatura",
    "tipoDato":"TEMPERATURA",
    "valor":30,
    "nombre":"aaaaaa",
    "direccionIP":"asd",
    "numeroDispArduino":"d1",
    "planta":1,
    "aula": "Aula 32",
    "institucion": "La manzana de isaac"
}'
```

### Modificar una operacion

```sh
curl --location --request PUT 'http://localhost:4008/api/logAcciones/?institucion=La manzana de isaac' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id":4,
    "accion":"OFF",
    "objetivo": "Bajar temperatura",
    "tipoDato":"TEMPERATURA",
    "valor":30,
    "planta":1,
    "aula": "Aula 33"
}'
```

### Eliminar una operacion

```sh
curl --location --request DELETE 'https://ahorro-energetico-api-log.herokuapp.com/api/logAcciones/1?institucion=La manzana de isaac'
```