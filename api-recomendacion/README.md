# CRUD Recomendación
Curl para poder probar los metodos

#### Consulta a las recomendaciones
```sh
   curl --location --request GET 'http://localhost:4013/api/recomendacion?institucion=La manzana de isaac'
```


#### Consulta a las recomendacion por ID
```sh
   curl --location --request GET 'http://localhost:4013/api/recomendacion/get/?id=1&institucion=La manzana de isaac'
```
#### Agregar recomendacion

```sh
curl --location --request POST 'http://localhost:4013/api/recomendacion' \
--header 'Content-Type: application/json' \
--data-raw '{ 
    "descID": 6,
    "recomendacion": "Apagar en caso de no usarse",
    "institucion": "La manzana de Isaaaac"
}'

```
#### Modificar recomendacion por ID
```sh

curl --location --request PUT 'http://localhost:4013/api/recomendacion/?id=1&institucion=La manzana de Isaac' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "descID": 1,
    "recomendacion": "Apagar todo en caso de no usarse"
}'
```



#### Eliminar recomendacion por ID
```sh

curl --location --request DELETE 'http://localhost:4013/api/recomendacion/?id=9&institucion=La manzana de Isaac' \
--header 'Content-Type: application/json' \
--data-raw '{
}'
```