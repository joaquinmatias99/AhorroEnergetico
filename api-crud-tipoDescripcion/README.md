# CRUD TIPODESCRIPCIONES
Curl para poder probar los metodos

#### Consulta descripciones
```sh
curl --location --request GET 'http://localhost:4001/api/descripciones' 
```

#### Consultar descripcion por ID
```sh
curl --location --request GET 'http://localhost:4001/api/descripciones/1' 
```

#### Consulta por descripcion
```sh
curl --location --request GET 'http://localhost:4001/api/descripciones/descripcion/aire'
```
#### Alta descripcion

```sh
curl --location --request POST 'http://localhost:4001/api/descripciones/' \
--header 'Content-Type: application/json' \
--data-raw '{"descripcion":"test"}'
```

#### Modificar descripcion

```sh
curl --location --request PUT 'http://localhost:4001/api/descripciones/35' \
--header 'Content-Type: application/json' \
--data-raw ' {"descripcion": "test"}'
```

#### Eliminar descripcion por ID

```sh
curl --location --request DELETE 'http://localhost:4001/api/descripciones/35' 
```

#### Busqueda de descripciones (personalizada para front)

```sh
curl --location --request GET 'http://localhost:4001/api/descripciones/ventilador' 
```