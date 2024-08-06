# CRUD contacto
Curl para poder probar los metodos

#### Consulta contacto
```sh
curl --location --request GET 'http://localhost:4017/api/contactoEmergencia?institucion=La manzana de isaac'
```

#### Alta contacto

```sh
curl --location --request POST 'http://localhost:4017/api/contactoEmergencia?institucion=La manzana de isaac' \
--header 'Content-Type: application/json' \
--data-raw '{
    "telefono":"115220097",
    "nombre":"Adrian Alfonso",
    "tipoEmergencia":"Urgencia"
}'
```

#### Modificar contacto

```sh
curl --location --request PUT 'http://localhost:4017/api/contactoEmergencia/?institucion=La manzana de isaac&id=4' \
--header 'Content-Type: application/json' \
--data-raw ' {
    "telefono":"115220097",
    "nombre":"Adrian Alfonso",
    "tipoEmergencia":"Accion_Manual"
}'
```

#### Eliminar contacto por ID

```sh
curl --location --request DELETE 'http://localhost:4017/api/contactoEmergencia?institucion=La manzana de isaac&id=14'
```
