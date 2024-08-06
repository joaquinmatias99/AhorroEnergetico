import { getConnection } from "../database/database";

const obtener_descripciones = async (req, res) => {
  try {
    const descripcion = req.query.descripcion === undefined ? "" : req.query.descripcion;
    const institucion = req.query.institucion === undefined ? "" : req.query.institucion;
    const configuraciont = req.query.config === undefined ? "" : req.query.config;

    var where = ``;
    if(configuraciont)  {
      where += `WHERE descripcion NOT IN ('Notebook','Netbook','PC Escritorio','Drones','Tablet') `;
    }
    if(descripcion != "") {
      if(where.length == 0)
        where += `WHERE UPPER(descripcion) LIKE UPPER("%${descripcion}%") `;
      else
        where += `AND UPPER(descripcion) LIKE UPPER("%${descripcion}%") `;
    } 
    if(institucion != "") {
      if(where.length == 0)
        where += `WHERE institucion = "${institucion}" `;
      else 
        where += `AND institucion = "${institucion}" `;
    } 
    
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM descripcionDisp " + where);
    return res.json(result);
  } catch (error) {
    //500 es el codigo de respuesta de HTTP de 500-599 son los errores de servidor
      return res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const obtener_descripcion = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT * FROM descripcionDisp WHERE id = ?",
      id
    );

    return res.json(result);
  } catch (error) {
      return res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const agregar_descripcion = async (req, res) => {
  try {
    const { descripcion, institucion, jurisdiccion } = req.body;

    if (
      descripcion === undefined ||
      institucion === undefined 
    ) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    const connection = await getConnection();
    if (await buscarDuplicado(connection, descripcion,institucion)) {
      await connection.query("INSERT INTO descripcionDisp SET ?", {
        descripcion,
        institucion
      });
      return res.json({ message: "Descripción agregada" });
    } else {
        return res.status(400).json({ message: "Descripcion ya existe" });
    }
  } catch (error) {
      return res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const actualizar_descripcion = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, institucion, jurisdiccion } = req.body;

    if (
      id === undefined ||
      descripcion === undefined ||
      institucion === undefined ||
      jurisdiccion === undefined
    ) {
      return res.status(400).json({
        message:
          "no hay ningún elemento con ese id o no esta definida la descripción",
      });
    }
    const connection = await getConnection();
    if (await buscarDuplicado(connection, descripcion, institucion)) {
      const descripcion_nueva = { descripcion, institucion, jurisdiccion };

      const result = await connection.query(
        "UPDATE descripcionDisp SET ? WHERE id = ?",
        [descripcion_nueva, id]
      );

      if (result.affectedRows == 0)
        res.json({
          message:
            "Descripción no existe o no existe ese ID de referencia. No se aplico cambios",
        });
      else return res.json({ message: "Descripción actualizada" });
    } else {
        return res.status(400).json({ message: "Descripcion ya existe" });
    }
  } catch (error) {
      return res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const eliminar_descripcion = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM descripcionDisp WHERE id = ?",
      id
    );

    if (result.affectedRows == 0)
      return res.json({
        message:
          "Descripción no existe o no existe ese ID de referencia. No se aplico cambios",
      });
    else res.json({ message: "Descripción eliminada" });
  } catch (error) {
      return res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const buscarDuplicado = async function (connection, descripcion, institucion) {
  const result = await connection.query(
    "SELECT * FROM descripcionDisp WHERE descripcion = ? AND institucion = ?",
    [descripcion, institucion]
  );

  if (result.length == 0) return true;
  else return false;
};

const obtener_id = async (req, res) => {
  try {
    const { tipodispostivo } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT * FROM descripcionDisp WHERE descripcion = ?",
      tipodispostivo
    );

    return res.json(result);
  } catch (error) {
      return res.status(500).json({ message: "Error interno: " + error.message });
  }
};

export const methods = {
  obtener_descripciones,
  obtener_descripcion,
  agregar_descripcion,
  actualizar_descripcion,
  eliminar_descripcion,
  obtener_id, //este se agrego obtiene por medio del ID la descripcion del dispositivo
};
