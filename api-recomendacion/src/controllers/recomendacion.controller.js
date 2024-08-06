import { getConnection } from "../database/database";

const getRecomendaciones = async (req, res) => {
  const institucion = req.query.institucion ? req.query.institucion : ''
  try {
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT descid id,descripcion,recomendacion,R.institucion,R.jurisdiccion FROM recomendacion R join descripcionDisp on R.descid=descripcionDisp.id and R.institucion='${institucion}'`
    );
    if (result.length == 0) {
      res.status(400).json({ message: "No hay recomendaciones que mostrar" });
    } else {
      var tipodis = 0;
      var arrDispositivo = [];
      var ret = new Object();
      ret.institucion = "La manzana de isaac";
      ret.jurisdiccion = "Ciudad Autónoma de Buenos Aires";

      for (const data of result) {
        if (tipodis != data.id) {
          if (tipodis != 0) {
            /* despues del primer cambio de tipo dispositivo */
            arrDispositivo.push(dispositivo);
          }
          var dispositivo = new Object();
          dispositivo.id = data.id;
          dispositivo.dispositivo = data.descripcion;
          dispositivo.recomendacion = [];
        }
        dispositivo.recomendacion.push(data.recomendacion);

        tipodis = data.id;
      }
      arrDispositivo.push(dispositivo); /* para el ultimo dispositivo */
      ret.dispositivo = arrDispositivo;
      res.json(ret);
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message });
  }
};
const getRecomendacionID = async (req, res) => {
  try {
    const id = req.query.id;
    const institucion = req.query.institucion ? req.query.institucion : ''
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT * FROM recomendacion R INNER JOIN descripcionDisp ON R.descID ="
      + "descripcionDisp.id WHERE R.id = ? and R.institucion = ? ", [id, institucion]
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message });
  }
};
  

const getALL = async (req, res) => {
  const sql = 'SELECT recomendacion.*,descripcion FROM recomendacion INNER JOIN descripcionDisp ON recomendacion.descID = descripcionDisp.id '
  const institucion = req.query.institucion === undefined ? "" : req.query.institucion;
  const descripcion = req.query.descripcion === undefined ? "" : req.query.descripcion;
  try {
    var where = ``;

    if(institucion != ""){
      where += `WHERE recomendacion.institucion = ${institucion} `;
    }
    if(descripcion != ""){
      if(where.length == 0)
        where += `WHERE recomendacion.descID = ${descripcion} `;
      else
        where += `AND recomendacion.descID = ${descripcion} `;
    }

    const connection = await getConnection();
    const result = await connection.query(sql + where);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const addRecomendacion = async (req, res) => {
  try {
    const { descID, recomendacion,institucion } = req.body;

    if (descID === undefined || recomendacion === undefined || institucion === undefined) {
      res.status(400).json({ message: "Faltan campos por rellenar" });
    }

    const connection = await getConnection();
    if (await buscarDuplicado(connection, descID, recomendacion,institucion)) {
      const recomendacionAdd = { descID, recomendacion,institucion };

      await connection.query(
        "INSERT INTO recomendacion SET ?", recomendacionAdd
      );
      res.json({ message: "Recomendacion agregada" });
    } else {
      res.status(400).json({ message: "Existe recomendacion con estos datos" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const updateRecomendacion = async (req, res) => {
  try {
    const id = req.query.id;
    const institucion = req.query.institucion === undefined ? "" : req.query.institucion;
    const {recomendacion} = req.body;
    if (
      id === undefined ||
      recomendacion === undefined
    ) {
      res.status(400).json({ message: "Faltan campos por rellenar" });
    }
    const connection = await getConnection();
    
    const recomendacionAux = { recomendacion };
    const result = await connection.query(
      "UPDATE recomendacion SET ? WHERE id = ? and institucion=?",
      [recomendacionAux, id,institucion]
    );

    if (result.affectedRows > 0)
      res.json({ message: "Recomendacion actualizada" });
    else
      res.json({
        message: "Recomendacion no existe. No se aplico cambios",
      });
  } catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const deleteRecomendacion = async (req, res) => {
  try {
      const id = req.query.id;
      const institucion = req.query.institucion ? req.query.institucion : ''
      const connection = await getConnection();
      const result = await connection.query( "DELETE FROM recomendacion WHERE id = ? and institucion = ?",  [id,institucion]);
      
      if(result.affectedRows > 0)
          res.json({ message: "recomendación Eliminada"});
      else   
          res.json({ message: "La recomendación no existe o no se puede elminar. No se aplico cambios" });

  } catch (error) {
      res.status(500).json({ message: "Error interno: " + error.message});
  }
};

const buscarDuplicado = async function (connection, descID, recomendacion,institucion) {
  const result = await connection.query(
    "SELECT * FROM recomendacion WHERE descID = ? AND recomendacion = ? AND institucion = ?",
    [descID, recomendacion,institucion]
  );

  if (result.length == 0) return true;
  else return false;
};
export const methods = {
  getRecomendaciones,
  getRecomendacionID,
  addRecomendacion,
  updateRecomendacion,
  getALL,
  deleteRecomendacion
};
