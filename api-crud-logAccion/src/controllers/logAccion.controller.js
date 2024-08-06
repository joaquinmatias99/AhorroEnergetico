import { getConnection } from "../database/database";
var moment = require("moment");

const getLogAccion = async (req, res) => {
  // Operacion: 0:todos los registros
  // Operacion: 1:por fecha, tiene que venir el campo fecha
  // Operacion: 2:entre fechas, tiene que venir el campo fechaDesde, fechaHasta
  const institucion =
    req.query.institucion == null ? "" : req.query.institucion;
  console.log(institucion);
  const { operacion } = req.params;
  if (operacion && operacion < 3) {
    if (operacion == 1) {
      const { fecha } = req.body;
      !fecha
        ? res.status(400).json({
            message:
              "Bad Request. Campo fecha es obligatorio para el filtrado por fecha.",
          })
        : "";
      try {
        const connection = await getConnection();
        const result = await connection.query(
          `SELECT * FROM logoperacion WHERE institucion='${institucion}' and fecha='${moment(
            fecha
          ).format("YYYY-MM-DD HH:mm:ss")}'`
        );

        if (result.lenght > 0) {
          res.status(200).json(result);
        } else {
          res.status(204).json({
            message: `No se encontraron registros en la fecha ${moment(
              fecha
            ).format("YYYY-MM-DD HH:mm:ss")} `,
          });
        }
      } catch (error) {
        res.status(500).json({ message: `Ocurrio un error: ${error}` });
      }
    } else {
      if (operacion == 2) {
        const { fechaDesde, fechaHasta } = req.body;
        !fechaDesde && !fechaHasta
          ? res.status(400).json({
              message:
                "Bad Request. Campos fechaDesde y fechaHasta son obligatorios para el filtrado entre fechas.",
            })
          : "";
        try {
          const connection = await getConnection();
          const result = await connection.query(
            `SELECT * FROM logoperacion WHERE fecha BETWEEN '${moment(
              fechaDesde
            ).format("YYYY-MM-DD HH:mm:ss")}' and '${moment(fechaHasta).format(
              "YYYY-MM-DD HH:mm:ss"
            )}'`
          );
          if (result.lenght > 0) {
            res.status(200).json(result);
          } else {
            res.status(204).json({
              message: `No se encontraron registros entre las fechas ${moment(
                fechaDesde
              ).format("YYYY-MM-DD HH:mm:ss")} y ${moment(fechaHasta).format(
                "YYYY-MM-DD HH:mm:ss"
              )}`,
            });
          }
        } catch (error) {
          res.status(500).json({ message: `Ocurrio un error: ${error}` });
        }
      }
    }
    if (operacion == 0) {
      try {
        const connection = await getConnection();
        const result = await connection.query(`SELECT * FROM logoperacion`);
        if (result.length > 0) {
          console.log("Result IF: ", result);
          res.status(200).json(result);
        } else {
          console.log("Result ELSE: ", result);
          res.status(204).json({ message: `No se existen registros` });
        }
      } catch (error) {
        res.status(500).json({ message: `Ocurrio un error: ${error}` });
      }
    }
  } else {
    res
      .status(400)
      .json({ message: "Bad Request. Campo operacion es obligatorio." });
  }
};

const addLogAccion = async (req, res) => {
  try {
    const {
      accion,
      objetivo,
      tipoDato,
      valor,
      nombre,
      direccionIP,
      numeroDispArduino,
      planta,
      aula,
      institucion,
    } = req.body;
    const fecha = moment().format("YYYY-MM-DD HH:mm:ss");
    if (
      accion === undefined ||
      objetivo === undefined ||
      tipoDato === undefined ||
      valor === undefined ||
      nombre === undefined ||
      direccionIP === undefined ||
      numeroDispArduino === undefined ||
      planta === undefined ||
      aula === undefined ||
      institucion === undefined
    ) {
      res
        .status(400)
        .json({ message: "Bad Request. Todos los campos son obligatorios." });
    }

    const accionInsert = {
      accion,
      objetivo,
      tipoDato,
      valor,
      nombre,
      direccionIP,
      numeroDispArduino,
      planta,
      aula,
      fecha,
      institucion,
    };
    const connection = await getConnection();
    await connection.query("INSERT INTO logOperacion SET ?", accionInsert);
    res.status(200).json({ message: "Registro de accion creado" });
  } catch (error) {
    res.status(500).json({ message: `Ocurrio un error: ${error}` });
  }
};

const updateLogAccion = async (req, res) => {
  console.log("Params: ", req.body);
  try {
    const institucion =
      req.query.institucion == null ? "" : req.query.institucion;
    const { id, accion, objetivo, tipoDato, valor, planta, aula } = req.body;
    //const fechaParseada = moment(fecha).format("YYYY-MM-DD HH:mm:ss");
    if (
      id === undefined ||
      accion === undefined ||
      objetivo === undefined ||
      tipoDato === undefined ||
      valor === undefined ||
      planta === undefined ||
      aula === undefined
    ) {
      res
        .status(400)
        .json({ message: "Bad Request. Todos los campos son obligatorios." });
    }
    const accionUpdate = {
      accion,
      objetivo,
      tipoDato,
      valor,
      planta,
      aula,
    };
    console.log("UPDATE logOperacion SET ? WHERE id = ? and institucion= ?", [
      accionUpdate,
      id,
      institucion,
    ]);
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE logOperacion SET ? WHERE id = ? and institucion= ?",
      [accionUpdate, id, institucion]
    );
    res.status(200).json({ message: `Modificacion de accion: ${id}` });
  } catch (error) {
    res.status(500).json({ message: `Ocurrio un error: ${error}` });
  }
};

const deleteAccion = async (req, res) => {
  try {
    const institucion =
      req.query.institucion == null ? "" : req.query.institucion;
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM logOperacion WHERE id = ? and institucion= ?",
      id,
      institucion
    );
    res.status(200).json({ message: `Eliminada accion: ${id}` });
  } catch (error) {
    res.status(500).json({ message: `Ocurrio un error: ${error}` });
  }
};

export const methods = {
  getLogAccion,
  addLogAccion,
  updateLogAccion,
  deleteAccion,
};
