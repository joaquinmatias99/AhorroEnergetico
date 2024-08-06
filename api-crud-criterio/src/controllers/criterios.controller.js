import { getConnection } from "../database/database";

const getCriterios = async (req, res) => {
  try {
    const dato = req.query.dato === undefined || parseInt(req.query.dato, 10) == 0? "" : req.query.dato;
    var valor = req.query.valor === undefined ? "" : req.query.valor;
    const institucion = req.query.institucion === undefined ? "" : req.query.institucion;

    var where = ``;

    if (dato != "") {
      where += `WHERE dato = "${dato}" `;
    }
    if (valor != "") {
      valor = parseInt(valor, 10);
      if (where.length == 0) 
        where += `WHERE valorMIN <= ${valor} AND valorMAX >= ${valor} `;
      else 
        where += `AND valorMIN <= ${valor} AND valorMAX >= ${valor} `;
    }
    if (institucion != "") {
      if(where.length == 0)
        where += `WHERE institucion = "${institucion}" `;
      else
        where += `AND institucion = "${institucion}" `;
    }

    const connection = await getConnection();
    const result = await connection.query(`SELECT * FROM criterio ` + where);

    return res.json(result);
  } catch (error) {
      return res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const getCriterio = async (req, res) => {
  try {
    const institucion = req.query.institucion;
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT * FROM criterio WHERE criterioID = ? and institucion = ? ",
      [id, institucion]
    );

    return res.json(result);
  } catch (error) {
      return res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const addCriterio = async (req, res) => {
  try {

    const { objetivo, dato, valorMIN, valorMAX,institucion } = req.body;

    if (
      objetivo === undefined ||
      dato === undefined ||
      valorMIN === undefined ||
      valorMAX === undefined ||
      institucion === undefined
    ) {
      return res.status(400).json({ message: "Faltan campos por rellenar" });
    }

    const connection = await getConnection();

    if (
      await buscarDuplicado(
        connection,
        objetivo,
        dato,
        valorMIN,
        valorMAX,
        institucion
      )
    ) {
      const criterio = {
        objetivo,
        dato,
        valorMIN,
        valorMAX,
        institucion,
      };

      await connection.query("INSERT INTO criterio SET ?", criterio);
      return res.json({ message: "criterio agregado" });
    } else {
      res.json({
        message: "Existe un criterio con exactamente los mismos datos",
      });
    }
  } catch (error) {
      return res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const updateCriterio = async (req, res) => {
  try {
    const { id } = req.params;
    const institucion = req.query.institucion;
    const { objetivo, dato, valorMIN, valorMAX } = req.body;

    if (
      id === undefined ||
      objetivo === undefined ||
      dato === undefined ||
      valorMIN === undefined ||
      valorMAX === undefined ||
      institucion === undefined
    ) {
        return res.status(400).json({ message: "Faltan campos por rellenar" });
    }
    const connection = await getConnection();

    if (
      await buscarDuplicado(
        connection,
        objetivo,
        dato,
        valorMIN,
        valorMAX,
        institucion
      )
    ) {
      const criterio = {
        objetivo,
        dato,
        valorMIN,
        valorMAX,
        institucion,
      };
      const result = await connection.query(
        "UPDATE criterio SET ? WHERE criterioID = ?",
        [criterio, id]
      );

      if (result.affectedRows > 0)
        return res.json({ message: "Criterio actualizado" });
      else
        return res.json({ message: "Criterio no existe. No se aplico cambios" });
    } else {
        return res.status(400).json({
        message: "Existe un criterio con exactamente los mismos datos",
      });
    }
  } catch (error) {
      return res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const deleteCriterio = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query("DELETE FROM criterio WHERE criterioID = ?",id);

    if (result.affectedRows > 0) return res.json({ message: "Criterio eliminando" });
    else
      return res.status(400).json({
        message:
          "Criterio no existe o no se puede elminar. No se aplico cambios",
      });
  } catch (error) {
      return res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const buscarDuplicado = async function (
  connection,
  objetivo,
  dato,
  valorMin,
  valorMax,
  institucion
) {
  const result = await connection.query(
    "SELECT * FROM criterio WHERE objetivo = ? AND dato = ? AND valorMIN = ? AND valorMAX = ? AND institucion = ?",
    [objetivo, dato, valorMin, valorMax, institucion]
  );

  if (result.length == 0) return true;
  else return false;
};

export const methods = {
  getCriterios,
  getCriterio,
  addCriterio,
  updateCriterio,
  deleteCriterio,
};
