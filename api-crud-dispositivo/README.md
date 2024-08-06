# CRUD DISPOSITIVOS
Curl para poder probar los metodos

### Valores predefinidos
 Estos valores deben manejarse desde un comboBox en la web
> tipoConexion : (Arduino, wifi) o (1,2) 
> funcionalidad : ('Frio','Calor','Hibrido','iluminacion','Humidificacion','Otros') o (1 a 6)
> reparacion : (0,1)
> estado :  (0,1)

#### Consulta dispositivos
```sh
curl --location --request GET 'http://localhost:4009/api/dispositivos'
```

#### Consulta dispositivo por IP y numero Arduino
```sh
curl --location --request GET 'http://localhost:4009/api/dispositivos/get/?IP=197.0.0.1&numeroArduino=d1'
```
#### Alta dispositivo
```sh
curl --location --request POST 'http://localhost:4009/api/dispositivos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "tipoConexion": 2,
    "descID": 3,
    "planta": 3,
    "aula": "aula 3",
    "direccionIP": "197.0.0.3",
    "numeroDispArduino": 2
}'
```

#### Modificar dispositivo

```sh
curl --location --request PUT 'http://localhost:4009/api/dispositivos/?IP=197.0.0.2&numeroArduino=d1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "tipoConexion": 1,
    "descID": 1,
    "reparacion": 0,
    "planta": 2,
    "aula": "Aula 2",
    "estado": 0,
    "direccionIP": "197.0.0.2",
    "numeroDispArduino": "d1"
}'
```

#### Eliminar dispositivo por IP y numero Arduino

```sh
curl --location --request DELETE 'http://localhost:4009/api/dispositivos/?IP=197.0.0.45&numeroArduino=d1'
```

### Consultar dispositivos con parametros (funcion personalizada para front)

```sh
//obtener todos los dispositivos (tipoConexion = 0 busca cualquier conexion, descripcion = 0 busca cualquier descripcion)

curl --location --request GET 'http://localhost:4009/api/dispositivos/descripcion/?conexion=0&descripcion=0'

```

```sh
//dispositivos por tipo de conexion

curl --location --request GET 'http://localhost:4009/api/dispositivos/descripcion/?conexion=1&descripcion=0'

```

```sh
//dispositivos por tipo de dispositivo

curl --location --request GET 'http://localhost:4009/api/dispositivos/descripcion/?conexion=0&descripcion=3'

```
