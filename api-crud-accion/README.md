#### Consultar acciones
```sh
curl --location --request GET 'http://localhost:4000/api/accion' 
```
#### Consultar accion por Clave
```sh
curl --location --request GET 'http://localhost:4000/api/accion/get/?idCriterio=2&accionAplicar=ON&descId=1'
```
#### Alta de accion
```sh
curl --location --request POST 'http://localhost:4000/api/accion' \
--header 'Content-Type: application/json' \
--data-raw '{
    "criterioID":"3",
    "accionAplicar":"ON",
    "prioridad":"3",
    "descId":"3"
}'
```
### Modificar accion
```sh
curl --location --request PUT 'http://localhost:4000/api/accion/?idCriterio=3&accionAplicar=ON&descId=3' \
--header 'Content-Type: application/json' \
--data-raw '{
    "prioridad":"6"
}'
```
#### Eliminar accion por ID
```sh
curl --location --request DELETE 'http://localhost:4000/api/accion/?idCriterio=3&accionAplicar=ON&descId=3'
```
