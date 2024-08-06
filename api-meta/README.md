#### Consultar metas por institucion
```sh
curl --location --request GET 'http://localhost:4012/api/meta/?institucion=La manzana de isaac'
```
#### Consultar metas historica por institucion
```sh
curl --location --request GET 'http://localhost:4012/api/meta/historica/?institucion=La manzana de isaac'
```

#### Alta meta
```sh
curl --location --request POST 'http://localhost:4012/api/meta' \
--header 'Content-Type: application/json' \
--data-raw '{
        "descID": 1,
        "fechaDesde": "2022-11-12T03:00:00.000Z",
        "fechaHasta": "2022-11-26T03:00:00.000Z",
        "consumoEsperado": 1761,
        "institucion": "La manzana de isaaac"
    }'
```

#### Modificar meta
```sh
curl --location --request PUT 'http://localhost:4012/api/meta?id=14&institucion=La manzana de isaaac' \
--header 'Content-Type: application/json' \
--data-raw '{
        "fechaDesde": "2022-11-12T03:00:00.000Z",
        "fechaHasta": "2022-11-26T03:00:00.000Z",
        "consumoEsperado": 1765
    }'
```

#### Eliminar meta
```sh
curl --location --request DELETE 'http://localhost:4012/api/meta?id=14&institucion=La manzana de isaaac'
```
