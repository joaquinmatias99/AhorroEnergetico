# CRUD PERFILES X EVENTO
Curl para poder probar los metodos

### Valores predefinidos


#### Consulta perfilesEventos
```sh
    curl --location --request GET 'http://localhost:4012/api/eventos'
```

#### Consulta perfilesEventos con institucion
```sh
    curl --location --request GET 'http://localhost:4012/api/eventos?institucion=La manzana de ISAC'
```

#### Consulta perfilEvento x fecha, planta e institucion

```sh
   curl --location --request GET 'http://localhost:4012/api/eventos/get?fecha=2022-11-19&planta=3&institucion=La manzana de ISAC'
```




#### Agregar perfilEvento

```sh
curl --location --request POST 'http://localhost:4012/api/eventos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fecha": "2022-11-19",
    "activado": 0,
    "horaDesde": "09:00",
    "horaHasta": "18:00",
    "planta": 3,
    "institucion": "La manzana de ISAC"
}'

```

#### Modificar perfilEvento
```sh

curl --location --request PUT 'http://localhost:4012/api/eventos/?dia=2022-11-19&planta=2&institucion=La manzana de ISAC' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fecha": "2022-11-18",
    "activado": 1,
    "horaDesde": "07:00",
    "horaHasta": "22:00",
    "planta": 2,
    "institucion": "La manzana de ISAC"
}'
```



#### Eliminar perfilEvento
```sh
curl --location --request DELETE 'http://localhost:4012/api/eventos?fecha=2022-11-18&planta=2&institucion=La manzana de ISAC'
```