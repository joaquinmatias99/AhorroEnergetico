drop database if EXISTS `heroku_015f6837eecf917`;
CREATE DATABASE `heroku_015f6837eecf917`;
USE heroku_015f6837eecf917;

CREATE TABLE `descripcionDisp` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `descripcion` varchar(45) NOT NULL,
	`institucion` varchar(100) NOT NULL default 'La manzana de isaac',
	`jurisdiccion` varchar(100) NOT NULL default 'Ciudad Autonoma de Buenos Aires'
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `dispositivo` (
	`dispositivoID` int(11) NOT NULL AUTO_INCREMENT ,
    `tipoConexion` enum('Electrico', 'Señal', 'Manual','Configuracion') NOT NULL,
    `descID` int(11) NOT NULL,
    `reparacion` tinyint(1) NOT NULL,
    `planta` int(11) NOT NULL,
    `aula` varchar(45) NOT NULL,
    `estado` tinyint(1) NOT NULL,
	`nombre` varchar(100) NOT NULL, 
    `direccionIP` varchar(45) NOT NULL,
    `numeroDispArduino` varchar(2) not NULL,
    `consumo` int(11) NOT NULL,
	`institucion` varchar(100) NOT NULL default 'La manzana de isaac',
	`jurisdiccion` varchar(100) NOT NULL default 'Ciudad Autonoma de Buenos Aires',
	PRIMARY KEY (`dispositivoID`),
	FOREIGN KEY (`DescID`) REFERENCES `descripcionDisp` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
/*KEY `tipo_dispositivo_accion` (`DescID`)*/
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `criterio` (
    `criterioID` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `objetivo` enum('Bajar temperatura', 'Subir temperatura', 'Reducir ruido', 'Ahorrar energia', 'Mejorar aire', 'Reducir humedad','Neutro') NOT NULL,
    `dato` enum('TEMPERATURA', 'NIVEL_DE_RUIDO', 'CALIDAD_DE_AIRE', 'HUMEDAD') NOT NULL,
    `valorMIN` int(11) DEFAULT NULL,
    `valorMAX` int(11) DEFAULT NULL,
	`institucion` varchar(100) NOT NULL default 'La manzana de isaac',
	`jurisdiccion` varchar(100) NOT NULL default 'Ciudad Autonoma de Buenos Aires'
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `accion` (
    `criterioID` int(11) NOT NULL,
    `accionAplicar` enum('ON', 'OFF') NOT NULL,
    `descID` int(11) not NULL,
    `prioridad` int(11) NOT NULL,
	`institucion` varchar(100) NOT NULL default 'La manzana de isaac',
	`jurisdiccion` varchar(100) NOT NULL default 'Ciudad Autonoma de Buenos Aires',
	PRIMARY KEY (`criterioID`,`accionAplicar`,`DescID`),
	FOREIGN KEY (`DescID`) REFERENCES `descripcionDisp` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (`criterioID`) REFERENCES `criterio` (`criterioID`) ON DELETE CASCADE ON UPDATE CASCADE
	/*KEY `criterio_accion` (`criterioID`),
	KEY `tipo_dispositivo_accion` (`DescID`)*/
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `logOperacion` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `fecha` datetime NOT NULL,
    `accion` enum('ON', 'OFF') NOT NULL,
    `objetivo` varchar(100) NOT NULL,
    `tipoDato` varchar(50) NOT NULL,
    `valor` int(11) NOT NULL,
	`nombre` varchar(100) NOT NULL,
    `direccionIP` varchar(45) NOT NULL,
    `numeroDispArduino` varchar(2) not NULL,
    `planta` int(11) NOT NULL,
    `aula` varchar(100) NOT NULL,
	`institucion` varchar(100) NOT NULL default 'La manzana de isaac',
	`jurisdiccion` varchar(100) NOT NULL default 'Ciudad Autonoma de Buenos Aires'
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `perfilXDia` (
    `dia` enum('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo') NOT NULL,
    `horaDesde` time NOT NULL,
    `horaHasta` time NOT NULL,
    `planta` int(11) NOT NULL,
    `fechaUltAccion` date NOT NULL,
	`institucion` varchar(100) NOT NULL default 'La manzana de isaac',
	`jurisdiccion` varchar(100) NOT NULL default 'Ciudad Autonoma de Buenos Aires',
	PRIMARY KEY (`dia`,`planta`,`institucion`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `perfilXEvento` (
    `fecha` date NOT NULL,
    `activado` tinyint(1) NOT NULL,
    `horaDesde` time NOT NULL,
    `horaHasta` time NOT NULL,
    `planta` int(11) NOT NULL,
	`institucion` varchar(100) NOT NULL default 'La manzana de isaac',
	`jurisdiccion` varchar(100) NOT NULL default 'Ciudad Autonoma de Buenos Aires',
	PRIMARY KEY (`fecha`,`planta`,`institucion`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `meta` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `descID` int(11) NOT NULL,
	`fechaDesde` date NOT NULL,
    `fechaHasta` date NOT NULL, 
    `consumoEsperado` int(11) NOT NULL,
	`institucion` varchar(100) NOT NULL default 'La manzana de isaac',
	`jurisdiccion` varchar(100) NOT NULL default 'Ciudad Autonoma de Buenos Aires',
	PRIMARY KEY (`id`),
	FOREIGN KEY (`DescID`) REFERENCES `descripcionDisp` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `metaH` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `descID` int(11) NOT NULL,
	`fechaDesde` date NOT NULL, 
    `fechaHasta` date NOT NULL, 
    `consumoEsperado` int(11) NOT NULL,
	`institucion` varchar(100) NOT NULL default 'La manzana de isaac',
	`jurisdiccion` varchar(100) NOT NULL default 'Ciudad Autonoma de Buenos Aires',
	`enviado` tinyint(1) NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`DescID`) REFERENCES `descripcionDisp` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `recomendacion` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `descID` int(11) NOT NULL,
    `recomendacion` varchar(254) NOT NULL,
	`institucion` varchar(100) NOT NULL NOT NULL default 'La manzana de isaac',
	`jurisdiccion` varchar(100) NOT NULL  default 'Ciudad Autonoma de Buenos Aires',
	PRIMARY KEY (`id`),
	FOREIGN KEY (`DescID`) REFERENCES `descripcionDisp` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `consumo` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `descID` int(11) NOT NULL,
    `nombre` varchar(100) NOT NULL,
	`consumo` int(11) NOT NULL,
	`fecha` date NOT NULL,
	`institucion` varchar(100) NOT NULL default 'La manzana de isaac',
	`jurisdiccion` varchar(100) NOT NULL default 'Ciudad Autonoma de Buenos Aires',
	PRIMARY KEY (`id`),
	FOREIGN KEY (`DescID`) REFERENCES `descripcionDisp` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `recomendacionRec` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `descID` int(11) NOT NULL,
    `recomendacion` varchar(254) NOT NULL,
	`nombreAlumno` varchar(254) NOT NULL,
	`institucion` varchar(100) NOT NULL NOT NULL default 'La manzana de isaac',
	`jurisdiccion` varchar(100) NOT NULL  default 'Ciudad Autonoma de Buenos Aires',
	PRIMARY KEY (`id`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `dispositivoRec` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`descID` int(11) NOT NULL,
    `planta` int(11) NOT NULL,
    `aula` varchar(45) NOT NULL,
	`nombre` varchar(100) NOT NULL, 
	`nombreAlumno` varchar(254) NOT NULL,
	`institucion` varchar(100) NOT NULL default 'La manzana de isaac',
	`jurisdiccion` varchar(100) NOT NULL default 'Ciudad Autonoma de Buenos Aires',
	PRIMARY KEY (`id`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `telefonoEmergencia` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`tipoEmergencia` enum('Accion_Manual', 'Urgencia') NOT NULL,
	`telefono` varchar(45) NOT NULL,
    `nombre` varchar(100) NOT NULL,
	`institucion` varchar(100) NOT NULL default 'La manzana de isaac',
	`jurisdiccion` varchar(100) NOT NULL default 'Ciudad Autonoma de Buenos Aires',
	PRIMARY KEY (`id`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Stored_Procedure*/
delimiter //
create procedure pasarHistorico(fecha date)
begin
	insert into metah (descID,fechaDesde,fechaHasta,consumoEsperado,institucion,jurisdiccion,enviado) 
	select descID,fechaDesde,fechaHasta,consumoEsperado,institucion,jurisdiccion,0 enviado from meta where fechaHasta=fecha;
	update meta set fechaDesde=fecha, fechaHasta=DATE(DATE_ADD(fecha, INTERVAL 30 DAY))  where fechaHasta=fecha;
end //

delimiter ;


delimiter //
create procedure actualizarEnviado()
begin
	SET SQL_SAFE_UPDATES = 0;
	update metaH set enviado=1 where id in (
    SELECT id FROM (select * from metaH where enviado=0)as x) ;
	SET SQL_SAFE_UPDATES = 1;
end //

delimiter ;


/*Insert de datos*/

INSERT INTO `descripcionDisp` (`id`,`descripcion`)	 VALUES			
(1,'Ventilador Techo'),				
(2,'Ventilador pared'),				
(3,'Cañón – Proyector'),				
(4,'Televisor'),				
(5,'Aire Acondicionado split'),				
(6,'Aire Acondicionado multisplit'),				
(7,'Aire Acondicionado portatil'),				
(8,'Aire Acondicionado solar'),				
(9,'Micro-Ondas'),				
(10,'Dispenser Agua'),				
(11,'Termo tanque'),				
(12,'Calefón'),				
(13,'Horno'),				
(14,'Heladera'),				
(15,'Impresora'),				
(16,'Tablet'),				
(17,'Notebook'),				
(18,'Netbook'),				
(19,'PC Escritorio'),				
(20,'Impresora 3D'),				
(21,'Drones'),				
(22,'Carritos para equipos digitales'),				
(23,'Iluminación – Halógena'),				
(24,'Iluminación – Bajo consumo'),				
(25,'Iluminación – Tubo fluorescente'),			
(26,'Iluminación – LED'),				
(27,'Pantallas Digitales'),				
(28,'Dispenser de Alcohol'),
(29,'Dispenser de Jabon');

	
insert into meta values (1,1,'2022-11-1',CURDATE(),1760,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (2,2,'2022-11-1',CURDATE(),4760,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (3,3,'2022-11-1',CURDATE(),2640,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (4,4,'2022-11-1',CURDATE(),3641,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (5,5,'2022-11-1',CURDATE(),1760,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (6,6,'2022-11-1',CURDATE(),1360,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (7,7,'2022-11-1',CURDATE(),2630,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (8,8,'2022-11-1',CURDATE(),2621,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (9,7,'2022-11-1',CURDATE(),2610,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (10,7,'2022-11-1',CURDATE(),2240,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');

insert into meta values (11,11,'2022-11-1',CURDATE(),560,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (12,12,'2022-11-1',CURDATE(),1210,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (13,13,'2022-11-1',CURDATE(),5434,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (14,14,'2022-11-1',CURDATE(),4564,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (15,15,'2022-11-1',CURDATE(),1786,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (16,16,'2022-11-1',CURDATE(),5424,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (17,17,'2022-11-1',CURDATE(),2457,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (18,18,'2022-11-1',CURDATE(),2456,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (19,17,'2022-11-1',CURDATE(),5743,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (20,20,'2022-11-1',CURDATE(),573,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');

insert into meta values (21,21,'2022-11-1',CURDATE(),1345,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (22,22,'2022-11-1',CURDATE(),1676,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (23,23,'2022-11-1',CURDATE(),2374,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (24,24,'2022-11-1',CURDATE(),2675,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (25,25,'2022-11-1',CURDATE(),3454,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (26,26,'2022-11-1',CURDATE(),4561,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (27,27,'2022-11-1',CURDATE(),345,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into meta values (28,28,'2022-11-1',CURDATE(),5437,'La manzana de isaac','Ciudad Autonoma de Buenos Aires');





insert into metah values (1,1,'2022-09-1','2022-11-2',4543,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (2,2,'2022-09-1','2022-11-2',4543,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (3,3,'2022-09-1','2022-11-2',24560,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (4,4,'2022-09-1','2022-11-2',4556,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (5,5,'2022-09-1','2022-11-2',3542,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (6,6,'2022-09-1','2022-11-2',4575,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (7,7,'2022-09-1','2022-11-2',4567,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (8,8,'2022-09-1','2022-11-2',7853,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (9,9,'2022-09-1','2022-11-2',3547,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (10,10,'2022-09-1','2022-11-2',4573,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);

insert into metah values (11,11,'2022-09-1','2022-11-2',1574,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (12,12,'2022-09-1','2022-11-2',1887,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (13,13,'2022-09-1','2022-11-2',2643,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (14,14,'2022-09-1','2022-11-2',57675,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (15,15,'2022-09-1','2022-11-2',5673,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (16,16,'2022-09-1','2022-11-2',6745,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (17,17,'2022-09-1','2022-11-2',5673,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (18,18,'2022-09-1','2022-11-2',1373,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (19,19,'2022-09-1','2022-11-2',1553,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (20,20,'2022-09-1','2022-11-2',2456,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);

insert into metah values (21,21,'2022-09-1','2022-11-2',1543,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (22,22,'2022-09-1','2022-11-2',1675,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (23,23,'2022-09-1','2022-11-2',3457,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (24,24,'2022-09-1','2022-11-2',34567,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (25,25,'2022-09-1','2022-11-2',3453,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (26,26,'2022-09-1','2022-11-2',3456,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (27,27,'2022-09-1','2022-11-2',4864,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);
insert into metah values (28,28,'2022-09-1','2022-11-2',13457,'La manzana de isaac','Ciudad Autonoma de Buenos Aires',0);




insert into consumo values (1,1,'197.168.0.2',45,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (2,2,'197.168.0.2',54,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (3,3,'197.168.0.3',56,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (4,4,'197.168.0.3',92,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (5,5,'197.168.0.4',82,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (6,6,'197.168.0.4',82,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (7,7,'197.168.0.5',62,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (8,8,'197.168.0.5',72,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (9,9,'197.168.0.6',56,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (10,10,'197.168.0.6',63,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');


insert into consumo values (11,11,'197.168.0.7',56,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (12,12,'197.168.0.7',43,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (13,13,'197.168.0.8',23,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (14,14,'197.168.0.8',33,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (15,15,'197.168.0.9',42,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (16,16,'197.168.0.10',22,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (17,17,'197.168.1.2',25,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (18,18,'197.168.1.2',56,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (19,19,'197.168.1.3',23,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (20,20,'197.168.1.3',22,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');


insert into consumo values (21,21,'197.168.1.4',345,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (22,22,'197.168.1.4',18,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (23,23,'197.168.1.5',26,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (24,24,'197.168.1.5',33,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (25,25,'197.168.1.6',52,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (26,26,'197.168.1.6',72,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (27,27,'197.168.1.7',62,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');
insert into consumo values (28,28,'197.168.1.7',12,CURDATE(),'La manzana de isaac','Ciudad Autonoma de Buenos Aires');


insert into `recomendacion` 
(`id`, `descID`, `recomendacion`,`institucion`,`jurisdiccion`) VALUES 
(1, 1, 'No dejar el ventilador en el Nivel 4 o 5 para que no se vuelen los papeles','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(2, 2, 'No dejar fijo el ventilador porque luego nose puede alcanzar el boton para cambiarlo','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(3, 3, 'Apagar el proyector cuando ya no se este utilizando','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(4, 4, 'Apagar el televisor si ya no va haber nadie en el lugar','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(5, 5, 'Utilizar aire acondicionado de eficiencia A','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(6, 6, 'Mantener ventanas y puertas cerradas','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(7, 7, 'Poner en un lugar en donde no sea transitable y llegue a el aire a cada rincon','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(8, 8, 'Los ventiladores es una opciones recomendable, ya que gastan hasta 9 veces menos que un Aire Acondicionado','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(9, 9, 'El micro-ondas consume mas por el reloj que cuando calienta la comida','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(10, 10, 'Mantener la limpieza del mismo al utilizar','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(11, 11, 'Mantenelo limpio: un termotanque con sarro produce sobreconsumo.','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(12, 12, 'Poner una alarma en el celular para saber cuando desconectar el calefon','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(13, 13, 'Solo utilizar cuando sea necesario','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(14, 14, 'Mantener las puertas cerradas','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(15, 15, 'No dejar la impresora encendida si ya no se esta utilizando','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(16, 16, 'Apagar si ya no se utilizara','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(17, 17, 'Apagar si ya no se utilizará','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(18, 18, 'Apagar si ya no se utilizará','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(19, 19, 'Es recomendable usar monitores LED/LCD en lugar de CRT (de rayos catódicos), ya que permiten ahorrar energía.','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(20, 20, 'No dejar la impresora encendida si ya no se esta utilizando','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(21, 21, 'Apagar Drone y sacar pilas del control remoto cuando ya no se utilice','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(22, 22, 'Poner a cargar todas las tablets al mismo tiempo','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(23, 23, 'Cuando compres nuevas lámparas tené en cuenta su etiquetado: clase A o superior permiten un mayor ahorro de energía.','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(24, 24, 'Usá lámparas LED, especialmente en los lugares donde necesites iluminación por mucho tiempo. Este tipo de lámparas reducen significativamente el consumo de energía.','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(25, 25, 'No utilices lámparas fluorescentes en ambientes donde comúnmente se realicen muchos encendidos y apagados en poco tiempo; por ejemplo, los baños. Para estos casos usá lámparas halógenas o LED','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(26, 26, 'Usá lámparas LED, especialmente en los lugares donde necesites iluminación por mucho tiempo.','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(27, 27, 'Apagar cuando ya no se este utilizando','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(28, 28, 'Utiliza la cantidad Necesaria','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(29 ,11, 'Hacé un uso responsable del agua caliente en la ducha: no dejarla correr. Hacé lo posible por ducharte en un tiempo razonable, que no supere los cinco minutos.','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(30, 4, 'nivel de eficiencia: clase A o superior permiten un mayor ahorro de energía.','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(31, 4, 'Regulá el brillo y el contraste del televisor para maximizar el rendimiento. Con un correcto calibrado de la imagen podés ahorrar entre el 30 % y el 50 % del consumo de energía habitual del televisor','La manzana de isaac','Ciudad Autonoma de Buenos Aires'),
(32, 14, 'Dejá unos 15 cm entre la parte trasera de la heladera, la pared y los laterales, de modo que se facilite la ventilación y aumente el rendimiento.','La manzana de isaac','Ciudad Autonoma de Buenos Aires');
