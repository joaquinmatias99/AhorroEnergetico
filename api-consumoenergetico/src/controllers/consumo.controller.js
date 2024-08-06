import { getConnection } from "../database/database";
const axios = require("axios");
var moment = require("moment");

const calcularConsumoDiario = async (req, res) => {
  //TODO: TOCAR FROTN DISPOSITIVO ACLARAR QUE EL CONSUMO ES POR MINUTO
  //TODO: La app de ema tiene que poner el estado del dispositivo
  const { nombre, consumo, jurisdiccion, institucion, descID } = req.body;
  console.log(
    `Nombre:${nombre} Consumo: ${consumo} Jurisdiccion: ${jurisdiccion} Institucion:${institucion}, descID: ${descID}`
  );
  try {
    const connection = await getConnection();
    console.log(
      `PRIMERA CONSULTA: select * from logoperacion where nombre='${nombre}' and fecha = CURDATE()  order by id desc LIMIT 1 `
    );
    const result1 = await connection.query(
      `select * from logoperacion where nombre='${nombre}' and fecha = CURDATE()  order by id desc LIMIT 1 `
    );
    if (result1.length > 0) {
      if (result1[0].accion == "ON") {
        const fechaAccion = moment(result1[0].fecha);
        const fechaActual = moment();
        let duracion = moment.duration(fechaActual.diff(fechaAccion));
        let minutos = parseInt(duracion.asMinutes());
        let consumoTotal = minutos * consumo;
        console.log(
          `Accion de tipo ON fechaAccion:${fechaAccion} fechaActual:${fechaActual} minutos${minutos} consumoTotal:${consumoTotal}`
        );
        try {
          console.log(`SEGUNDA CONSULTA - select * from consumo where nombre='${nombre}'  
                    and institucion='${institucion}' and jurisdiccion='${jurisdiccion}' and fecha = CURDATE()`);
          const result2 =
            await connection.query(`select * from consumo where nombre='${nombre}'  
                    and institucion='${institucion}' and jurisdiccion='${jurisdiccion}' and fecha = CURDATE()`);
          try {
            if (result2.length > 0) {
              console.log(
                "Consumo: ",
                result2[0].consumo + consumoTotal,
                "id: ",
                result2[0].id
              );
              console.log(
                `QUERY IF: UPDATE consumo SET consumo=${
                  result2[0].consumo + consumoTotal
                } WHERE id = ${result2[0].id}`
              );
              const result3 = await connection.query(
                "UPDATE consumo SET consumo=? WHERE id = ?",
                [result2[0].consumo + consumoTotal, result2[0].id]
              );
              res.status(200).send({ mensaje: "Consumo actualizado" });
            } else {
              console.log(`QUERY ELSE insert into consumo set ${obj}`);
              var obj = {
                descID: descID,
                nombre: nombre,
                consumo: consumoTotal,
                fecha: moment().toDate(),
                institucion: institucion,
                jurisdiccion: jurisdiccion,
              };
              const result2 = await connection.query(
                "insert into consumo set ?",
                obj
              );
              res.status(200).send({ mensaje: "Consumo agregado" });
            }
          } catch (error) {
            console.log("error: ", error);
            res.status(500);
            res.send(
              "Error interno con la base de datos al actualizar/insertar el consumo: ",
              error
            );
          }
        } catch (error) {
          res.status(500);
          res.send(
            "Error interno con la base de datos al obtener el consumo: ",
            error
          );
        }
      }
    } else {
      console.log(`No hay registros para nombre: ${nombre}`);
    }
  } catch (error) {
    res.status(500).send({
      mensaje: `Error interno con la base de datos al recuperar registro de acciones: ${error}`,
    });
  }
};

const getConsumoDiarioInstitucionDispositivo = async (req, res) => {
  const { institucion, jurisdiccion, tipoDispositivo } = req.body;
  console.log(
    `Institucion: ${institucion}, Jurisdiccion: ${jurisdiccion}, TipoDispositivo: ${tipoDispositivo}`
  );
  try {
    const connection = await getConnection();
    console.log(
      `QUERY select * from consumo where institucion=${institucion} and jurisdiccion=${jurisdiccion} and descID=${tipoDispositivo} and fecha = CURDATE()`
    );
    const result = await connection.query(
      `select * from consumo where institucion=${institucion} and jurisdiccion=${jurisdiccion} and descID=${tipoDispositivo} and fecha = CURDATE()`
    );
    if (result) {
      res.status(200);
      res.json({ consumo: result });
    }
  } catch (error) {
    res.status(500);
    res.send("Error interno con la base de datos: ", error);
  }
};

const getConsumoDiarioInstitucion = async (req, res) => {
  const { institucion, jurisdiccion } = req.body;
  console.log(`Institucion: ${institucion}, Jurisdiccion: ${jurisdiccion}`);
  try {
    const connection = await getConnection();
    console.log(
      `QUERY select * from consumo where institucion=${institucion} and jurisdiccion=${jurisdiccion} and fecha = CURDATE()`
    );
    const result = await connection.query(
      `select * from consumo where institucion=${institucion} and jurisdiccion=${jurisdiccion} and fecha = CURDATE()`
    );
    if (result) {
      res.status(200);
      res.json({ consumo: result });
    }
  } catch (error) {
    res.status(500);
    res.send("Error interno con la base de datos: ", error);
  }
};

const getConsumoDiarioPorDispositivo = async (req, res) => {
  const { nombre } = req.body;
  console.log(`Nombre: ${nombre}`);
  try {
    const connection = await getConnection();
    console.log(
      `QUERY: select * from consumo where nombre='${nombre}' and fecha = CURDATE()`
    );
    const result = await connection.query(
      `select * from consumo where nombre='${nombre}' and fecha = CURDATE()`
    );
    if (result) {
      res.status(200);
      res.json({ consumo: result });
    }
  } catch (error) {
    res.status(500);
    res.send("Error interno con la base de datos: ", error);
  }
};

const getAllConsumoDiarioPorDispositivo = async (req, res) => {
  const { nombre } = req.body;
  console.log(`Nombre: ${nombre}`);
  try {
    const connection = await getConnection();
    console.log(
      `select * from consumo where fecha = CURDATE() order by jurisdiccion+institucion`
    );
    const result = await connection.query(
      `select * from consumo where fecha = CURDATE() order by jurisdiccion+institucion`
    );
    if (result) {
      res.status(200);
      res.json({ consumo: result });
    }
  } catch (error) {
    res.status(500);
    res.send("Error interno con la base de datos: ", error);
  }
};

const getMetasIncumplidas = async (req, res) => {
  try {
    var dia = moment().format("YYYY-MM-DD");
    console.log(dia);
    var listaMails = [];
    const MailsDirectivos = await axios
      .get("https://www.inkdesign.com.ar/wp-json/mo/v1/Directivos/manzana")
      .then((data) => {
        for (const directivos of data.data) {
          if (
            directivos.Tecnico != "si" &&
            directivos.Email != null &&
            directivos.Email != ""
          ) {
            listaMails.push(directivos.Email);
          }
        }
      })
      .catch((error) => {
        console.log(`Error ${error}`);
      });
    console.log(listaMails);
    const connection = await getConnection();
    const result0 = await connection.query(
      "CALL pasarHistorico('" + dia + "')"
    );
    console.log(result0);
    var queryConsumo =
      "select sum(consumo) consumoActual,c.descID,descripcion,consumoEsperado,m.fechadesde,m.fechahasta,c.institucion,c.jurisdiccion,1 tipo " +
      "from consumo c " +
      "join descripciondisp d on c.descid=d.id " +
      "join meta m on m.descID=c.descID " +
      "where c.fecha>=m.fechadesde and c.fecha<=m.fechahasta " +
      "group by c.descID,descripcion,consumoEsperado,c.institucion,c.jurisdiccion ";
    queryConsumo += " union ";
    queryConsumo +=
      " select sum(consumo) consumoActual,c.descID,descripcion,consumoEsperado,m.fechadesde,m.fechahasta,c.institucion,c.jurisdiccion,2 tipo " +
      "from consumo c " +
      "join descripciondisp d on c.descid=d.id  " +
      "join metah m on m.descID=c.descID " +
      "where enviado=0 " +
      "and c.fecha>=m.fechadesde and c.fecha<=m.fechahasta group by c.descID,descripcion,consumoEsperado,c.institucion,c.jurisdiccion ";

    console.log(queryConsumo);
    const result = await connection.query(queryConsumo);
    if (result.length>0) {
      var meta = [];
      var ret = new Object();
      ret.mail = listaMails;
      for (const data of result) {
        if (data.consumoActual > data.consumoEsperado) {
          var objetoMeta = new Object();
          objetoMeta.idTipoDispositivo = data.descID;
          objetoMeta.tipoDispositivo = data.descripcion;
          objetoMeta.meta = data.consumoEsperado;
          objetoMeta.consumoActual = data.consumoActual;
          objetoMeta.fechaDesde = data.fechadesde
            .toISOString()
            .substring(0, 10);
          objetoMeta.fechaHasta = data.fechahasta
            .toISOString()
            .substring(0, 10);
          objetoMeta.vigente = data.tipo == 1 ? true : false;
          objetoMeta.institucion = data.institucion;
          objetoMeta.jurisdiccion = data.jurisdiccion;
          meta.push(objetoMeta);
        }
        ret.meta = meta;
        var queryUpdate = "CALL actualizarEnviado();";
        const result1 = await connection.query(queryUpdate);
        console.log(result1);
  
        const metasBoletin = await axios
          .post("https://labo-app.herokuapp.com/api/events/metas", ret)
          .then(({ data }) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(`Error ${error}`);
          });
      }

      ret.meta = meta;
      res.status(200).json({ ret });
    }
  } catch (error) {
    res.status(500);
    res.send("Error interno con la base de datos: ", error);
  }
};

const getMetasCumplidas = async (req, res) => {
  try {
    var dia = moment().format("YYYY-MM-DD");
    console.log(dia);
    const connection = await getConnection();
    const result0 = await connection.query(
      "CALL pasarHistorico('" + dia + "')"
    );
    var queryConsumo =
      " select sum(consumo) consumoActual,c.descID,descripcion,consumoEsperado,m.fechadesde,m.fechahasta,c.institucion,c.jurisdiccion,2 tipo " +
      "from consumo c " +
      "join descripciondisp d on c.descid=d.id  " +
      "join metah m on m.descID=c.descID " +
      "where c.fecha>=m.fechadesde and c.fecha<=m.fechahasta and month(m.fechahasta)=month(CURDATE()) and year(m.fechahasta)=year(CURDATE())" +
      "group by c.descID,descripcion,consumoEsperado,c.institucion,c.jurisdiccion ";

    console.log(queryConsumo);
    const result = await connection.query(queryConsumo);
    if (result) {
      var meta = [];
      var ret = new Object();

      for (const data of result) {
        if (data.consumoActual <= data.consumoEsperado) {
          var objetoMeta = new Object();
          objetoMeta.idTipoDispositivo = data.descID;
          objetoMeta.tipoDispositivo = data.descripcion;
          objetoMeta.meta = data.consumoEsperado;
          objetoMeta.consumoActual = data.consumoActual;
          objetoMeta.fechaDesde = data.fechadesde
            .toISOString()
            .substring(0, 10);
          objetoMeta.fechaHasta = data.fechahasta
            .toISOString()
            .substring(0, 10);
          objetoMeta.institucion = data.institucion;
          objetoMeta.jurisdiccion = data.jurisdiccion;
          meta.push(objetoMeta);
        }
      }
      ret.meta = meta;
      res.status(200).json({ ret });
    }
  } catch (error) {
    res.status(500);
    res.send("Error interno con la base de datos: ", error);
  }
};

export const methods = {
  getAllConsumoDiarioPorDispositivo,
  getConsumoDiarioInstitucion,
  getConsumoDiarioPorDispositivo,
  getConsumoDiarioInstitucionDispositivo,
  calcularConsumoDiario,
  getMetasIncumplidas,
  getMetasCumplidas,
};
