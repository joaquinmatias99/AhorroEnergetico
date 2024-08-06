#### Consultar perfil x dia
```sh
curl --location --request GET 'http://localhost:4011/api/perfilxdia?institucion=La manzana de isaac'
```
#### Consultar perfil x dia se puede pasar de a un solo parametro
```sh
curl --location --request GET 'http://localhost:4011/api/perfilxdia/get/?dia=Martes&institucion=La manzana de isaac&planta=1&fechaUltAccion=2022-11-02'
```
#### Alta de perfil x dia
```sh
curl --location --request POST 'http://localhost:4011/api/perfilxdia/?institucion=La manzana de isaac' \
--header 'Content-Type: application/json' \
--data-raw '{
"dia":"Martes",
"horaDesde":"08:00",
"horaHasta":"19:00",
"planta":"0"
}'
```
### Modificar perfil x dia
```sh
curl --location --request PUT 'http://localhost:4011/api/perfilxdia/?dia=Martes&planta=1&institucion=La manzana de isaac' \
--header 'Content-Type: application/json' \
--data-raw '{ 
    "horaDesde":"13:00",
    "horaHasta":"17:00",
    "fechaUltAccion":"2022-09-1"
}'
```
#### Eliminar perfil x dia por ID
```sh
curl --location --request DELETE 'http://localhost:4011/api/perfilxdia/?dia=Martes&planta=1&institucion=La manzana de isaac'
```
