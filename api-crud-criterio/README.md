# CRUD CRITERIO
Curl para poder probar los metodos

### Valores predefinidos
 Estos valores deben manejarse desde un comboBox en la web
 > objetivo : ('Bajar temperatura','Subir temperatura','Reducir ruido','Ahorrar energia','Bajar mas tempertura','Subir mas temperatura') o (1 a 6)
 > dato : ('Temperatura', 'Nivel de ruido', 'Humedad') o (1 a 3)

### Consulta criterios

```sh
curl --location --request GET 'http://localhost:4006/api/criterios?institucion=La manzana de isaac'
```

### Consulta criterio por ID

```sh
curl --location --request GET 'http://localhost:4006/api/criterios/4?institucion=La manzana de isaac'
```

### Alta de criterio

```sh
curl --location --request POST 'http://localhost:4006/api/criterios?institucion=La manzana de isaac' \
--header 'Content-Type: application/json' \
--data-raw '{
    "objetivo": "Subir temperatura",
    "dato": 1,
    "valorMIN": -15,
    "valorMAX": 15
}'
```

### Modificacion de criterio

```sh
curl --location --request PUT 'http://localhost:4006/api/criterios/4?institucion=La manzana de isaac' \
--header 'Content-Type: application/json' \
--data-raw '{
    "objetivo": 3,
    "dato": 2,
    "valorMIN": 50,
    "valorMAX": 140
}'
```

### Eliminar criterio por ID

```sh
curl --location --request DELETE 'http://localhost:4006/api/criterios/14?institucion=La manzana de isaac'
```

### Consultar criterio con parametros (funcion personalizada para front)

```sh
//obtener todos los criterios (dato = 0 busca cualquier dato, valor = "F" busca todos los valores)

curl --location --request GET 'http://localhost:4007/api/criterios/get/filtrar/?dato=0&valor=F'
```

```sh
//criterios por tipo de dato

curl --location --request GET 'http://localhost:4007/api/criterios/get/filtrar/?dato=TEMPERATURA&valor=F'
```

```sh
//criterios por valor (busca los cuales el valor esta entre valorMIN y valorMAX)

curl --location --request GET 'http://localhost:4007/api/criterios/get/filtrar/?dato=0&valor=5'
```