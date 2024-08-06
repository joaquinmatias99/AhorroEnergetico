# InstruccionArduino
Curl para poder probar los metodos

### Valores predefinidos
 - d1=ON ó OFF
 - d2=ON ó OFF
 - td=ON ó OFF

### Prender todos los dispositivos conectados a la placa

```sh
curl --location --request GET "http://localhost:8080/accionar/?ip=192.168.0.234&dispositivo=td&instruccion=ON"
```

### Prender todos los dispositivos conectados a d1

```sh
curl --location --request GET 'http://localhost:8080/accionar/?ip=192.168.0.234&dispositivo=d1&instruccion=ON'
```

### Prender todos los dispositivos conectados a d2

```sh
curl --location --request GET 'http://localhost:8080/accionar/?ip=192.168.0.234&dispositivo=d2&instruccion=ON'
```



