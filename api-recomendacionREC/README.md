# CRUD Recomendación
Curl para poder probar los metodos

#### Consulta a las recomendaciones de dispositivo
```sh
   curl --location --request GET 'http://localhost:4016/api/recomendacionAlumnos/recomendacionDisp/?institucion=la manzana de isaac'
```

#### Consulta dispositivo roto
```sh
curl --location --request GET 'http://localhost:4016/api/recomendacionAlumnos/recomendacionDispRoto/?institucion=la manzana de isaac'
```
#### Agregar recomendacion

```sh
curl --location --request POST 'http://localhost:4013/api/recomendacion' \
--header 'Content-Type: application/json' \
--data-raw '{ 
    "descID": 6,
    "recomendacion": "Apagar en caso de no usarse"
}'

```
#### Modificar recomendacion por ID
```sh

curl --location --request PUT 'http://localhost:4013/api/recomendacion/?id=1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "descID": 1,
    "recomendacion": "Apagar todo en caso de no usarse"
}'
```



#### Eliminar recomendacion por ID
```sh

curl --location --request DELETE 'http://localhost:4013/api/recomendacion/?id=9' \
--header 'Content-Type: application/json' \
--data-raw '{
}'
```