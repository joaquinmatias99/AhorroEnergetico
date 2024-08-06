import { getConnection } from "../database/database";

const obtener_acciones = async (req, res) => {
  
  const {institucion} = req.query;
  console.log("Institucion: ", institucion)
  const query = institucion ? `SELECT * FROM accion WHERE accion.institucion='${institucion}'` : `SELECT * FROM accion`
  console.log("query: ", query)
  try {
    const connection = await getConnection();
    const result = await connection.query(query);

    res.json(result);

  } catch (error) {
    return res.status(500).json({ message: "Error interno: " + error.message });
  }
};


const obtener_accion = async (req, res) => {
  try {
    const idCriterio = req.query.idCriterio == null ? "" : req.query.idCriterio;
    const accionAplicar =
      req.query.accionAplicar == null ? "" : req.query.accionAplicar;
    const descId = req.query.descId == null ? "" : req.query.descId;
    const institucion = req.query.institucion ? req.query.institucion : ''
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT * FROM accion WHERE accion.criterioID = ? and accion.accionAplicar= ? and accion.descId= ? and accion.institucion= ?",
      [idCriterio, accionAplicar, descId,institucion]
    );
    
    res.json(result);

  } catch (error) {
    return res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const acciones_descripcion = async (req, res) => {
  try {
    const accionAplicar = req.query.accionAplicar != 'undefined' ? parseInt(req.query.accionAplicar) : "";
    const descID = req.query.descID != 'undefined' ? parseInt(req.query.descID) : '';
    const criterioID = req.query.criterioID != 'undefined' ? parseInt(req.query.criterioID) : '';
    const institucion = req.query.institucion === undefined ? "" : req.query.institucion;

    var query = "SELECT * FROM accion INNER JOIN descripcionDisp ON accion.descID = descripcionDisp.id INNER JOIN criterio ON accion.criterioID = criterio.criterioID ";
    var where = ``;

    if(descID != "" || descID != 0){
      where += `WHERE descID = ${descID} `;
    }
    if(accionAplicar != "" || accionAplicar != 0){ // ó accionAplicar == 1 || accionAplicar == 2
      if(where.length == 0)
        where += `WHERE accionAplicar = ${accionAplicar} `; 
      else
        where += `AND accionAplicar = ${accionAplicar} `;
    }
    if(criterioID != "" || criterioID != 0){ 
      if(where.length == 0)
        where += `WHERE accion.criterioID = ${criterioID} `; 
      else
        where += `AND accion.criterioID = ${criterioID} `;
    }
    if(institucion != ""){ 
      if(where.length == 0)
        where += `WHERE accion.institucion = '${institucion}' `; 
      else
        where += `AND accion.institucion = '${institucion}' `;
    }
    
    const connection = await getConnection();
    const result = await connection.query(query + where);

    res.json(result);

  } catch (error) {
    return res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const agregar_accion = async (req, res) => {
  try {
    const { criterioID, accionAplicar, descId, prioridad, institucion } = req.body;

    if (
      criterioID === undefined ||
      accionAplicar === undefined ||
      descId === undefined ||
      prioridad === undefined
      ||
      institucion === undefined
    ) {
      res.status(400).json({ message: "Falta la agregar algún dato" });
    } else {
      const nueva_accion = { criterioID, accionAplicar, descId, prioridad,institucion };
      const connection = await getConnection();
      console.log("INSERT INTO accion SET ?", nueva_accion)
      await connection.query("INSERT INTO accion SET ?", nueva_accion);
      res.json({ message: "Acción agregada" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Ocurrio un problema al agregar la accion" });
  }
};

const actualizar_accion = async (req, res) => {
  try {
    const idCriterio = req.query.idCriterio;
    const accionAplicar = req.query.accionAplicar;
    const descId = req.query.descId;
    const institucion = req.query.institucion? req.query.institucion : ''
    const { prioridad } = req.body;

    if (
      idCriterio === undefined ||
      accionAplicar === undefined ||
      descId === undefined ||
      prioridad === undefined ||
      institucion == undefined
    ) {
      res.status(400).json({ message: "Falta agregar algún dato" });
    }

    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE accion SET prioridad = ? WHERE criterioID = ? and accionAplicar= ? and descId= ? and institucion=?",
      [prioridad, idCriterio, accionAplicar, descId,institucion]
    );

    if (result.affectedRows > 0) res.json({ message: "Acción actualizada" });
    else
      res.json({ message: "La acción no existe. No se aplico cambios" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Ocurrio un problema al actualizar la accion" });
  }
};

const eliminar_accion = async (req, res) => {
  try {
    const idCriterio = req.query.idCriterio;
    const accionAplicar = req.query.accionAplicar;
    const descId = req.query.descId;
    const institucion = req.query.institucion

    if (
      idCriterio === undefined ||
      accionAplicar === undefined ||
      descId === undefined ||
      institucion === undefined
    ) {
      res.status(400).json({ message: "Falta agregar algún dato" });
    }
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM accion WHERE criterioID = ? and accionAplicar= ? and descId= ? and institucion= ?",
      [idCriterio, accionAplicar, descId,institucion]
    );

    if (result.affectedRows > 0) res.json({ message: "Acción eliminada" });
    else
      res.res.json({ message: "Acción no existe. No se aplico cambios" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Ocurrio un problema al eliminar la accion" });
  }
};

export const methods = {
  obtener_acciones,
  obtener_accion,
  actualizar_accion,
  agregar_accion,
  eliminar_accion,
  acciones_descripcion
};
