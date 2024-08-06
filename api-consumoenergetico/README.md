# Nombre Servicio

### Consulta consumo por dispositivo

```sh
curl --location --request GET 'https://ahorro-energetico-api-consumo.herokuapp.com/api/consumo/dispositivos'
```
### Consulta metas Incumplidas

```sh
curl --location --request GET 'http://localhost:4012/api/consumo/getMetasCumplidas'
```
### Consulta metas cumplidas

```sh
curl --location --request GET 'http://localhost:4012/api/consumo/getMetasCumplidas'
```
### Consulta consumo por nombre de dispositivo

```sh
curl --location --request GET 'https://ahorro-energetico-api-consumo.herokuapp.com/api/consumo/dispositivo' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre":"197.0.0.1"
}'
```