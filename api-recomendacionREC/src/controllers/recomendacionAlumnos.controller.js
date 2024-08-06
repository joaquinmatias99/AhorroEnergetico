import { getConnection } from "../database/database";

const getRecomendacionDispositivo = async (req, res) => {
  try {
    const id = req.query.id;
    const institucion =
      req.query.institucion == "" ? "" : req.query.institucion;

    var where = " where recomendacionRec.institucion = '" + institucion + "'";
    where +=
      id == "" || id === undefined ? "" : " And recomendacionRec.id = " + id;

    const connection = await getConnection();
    const result = await connection.query(
      "SELECT recomendacionRec.*,descripcion FROM recomendacionRec INNER JOIN descripciondisp ON recomendacionRec.descID = descripciondisp.id " +
      where
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const getDispositivoRoto = async (req, res) => {
  try {
    const id = req.query.id;
    const institucion =
      req.query.institucion == "" ? "" : req.query.institucion;

    var where = " where dispositivoRec.institucion = '" + institucion + "'";
    where +=
      id == "" || id === undefined ? "" : " And recomendacionRec.id = " + id;

    const connection = await getConnection();
    const result = await connection.query(
      "SELECT dispositivoRec.*,descripcion FROM dispositivoRec INNER JOIN descripciondisp ON dispositivoRec.descID = descripciondisp.id " +
        where
    );

   // console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const getALLDispositivoRoto = async (req, res) => {
  try {
    const institucion =
      req.query.institucion == "" ? "" : req.query.institucion;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT * FROM recomendacionRec where institucion = ? ",
      institucion
    );
   // console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message });
  }
};




const getALLrecomendaciones = async (req, res) => {
  try {
    const institucion =
      req.query.institucion == "" ? "" : req.query.institucion;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT * FROM dispositivoRec  where institucion = ? ",
      institucion
    );
   // console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const addDispositivoRoto = async (req, res) => {
  try {
    const institucion = req.query.institucion;
    const { descID, planta, aula, nombre, nombreAlumno } = req.body;
    // console.log(planta);

    if (
      descID === undefined ||
      planta === undefined ||
      institucion === undefined ||
      aula === undefined ||
      nombre === undefined ||
      nombreAlumno === undefined
    ) {
      res.status(400).json({ message: "Faltan campos por rellenar" });
    }

    const connection = await getConnection();
    if (
      await buscarDuplicado(
        connection,
        descID,
        planta,
        aula,
        nombre,
        nombreAlumno,
        institucion
      )
    ) {
      const reporteDispositivoRotoAdd = {
        descID,
        planta,
        aula,
        nombre,
        nombreAlumno,
        institucion,
      };

      await connection.query(
        "INSERT INTO dispositivoRec SET ?",
        reporteDispositivoRotoAdd
      );
      res.json({ message: "Reporte de dispositivo roto agregado" });
    } else {
      res.status(400).json({ message: "Existe ese reporte con estos datos" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message });
  }
};


const buscarDuplicado = async function (connection, descID, planta, aula, nombre, nombreAlumno, institucion) {
  const result = await connection.query(
    "SELECT * FROM dispositivoRec WHERE descID = ? AND planta = ? AND aula= ? AND nombre=? AND nombreAlumno=? AND institucion= ? ",
    [descID, planta, aula, nombre, nombreAlumno, institucion]
  );
  if (result.length == 0) return true;
  else return false;
};



//Agregar recomendacion alumno
const addRecomendacionDisp = async (req, res) => {
  try {
    const { descID, recomendacion , nombreAlumno, institucion } = req.body;
    console.log(req.body);
    if (
      descID === undefined ||
      recomendacion === undefined ||
      institucion === undefined || 
      nombreAlumno === undefined
    ) {
      res.status(400).json({ message: "Faltan campos por rellenar" });
    }

    const connection = await getConnection();
    if (
      await buscarDuplica2(connection, descID, recomendacion, nombreAlumno, institucion)
    ) {
      const recomendacionAdd = {
        descID,
        recomendacion,
        nombreAlumno,
        institucion,
      };

      await connection.query(
        "INSERT INTO recomendacionRec SET ?",
        recomendacionAdd
      );
      res.json({ message: "Recomendacion agregada" });
    } else {
      res.status(400).json({ message: "Existe recomendacion con estos datos" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const deleteDispositivoRoto = async (req, res) => {
  try {
    const institucion = req.query.institucion;
    const id = req.query.id;
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM dispositivoRec WHERE id = ? and institucion= ? ",
      [id, institucion]
    );

    if (result.affectedRows > 0)
      res.json({ message: "recomendación Eliminada" });
    else
      res.json({
        message:
          "La recomendación no existe o no se puede elminar. No se aplico cambios",
      });
  } catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message });
  }
};



const deleteRecomendacionDisp = async (req, res) => {
  try {
    const institucion = req.query.institucion;
    const id = req.query.id;
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM recomendacionRec WHERE id = ? and institucion= ? ",
      [id, institucion]
    );

    if (result.affectedRows > 0)
      res.json({ message: "recomendación Eliminada" });
    else
      res.json({
        message:
          "La recomendación no existe o no se puede elminar. No se aplico cambios",
      });
  } catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message });
  }
};


const buscarDuplica2 = async function (connection, descID, recomendacion, nombreAlumno, institucion) {
  const result = await connection.query(
    "SELECT * FROM recomendacionRec WHERE descID = ? AND recomendacion = ? AND nombreAlumno=? AND institucion= ? ",
    [descID, recomendacion, nombreAlumno, institucion]
  );

  if (result.length == 0) return true;
  else return false;
};

const aprobarRecomendacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { descID, recomendacion, institucion, jurisdiccion } = req.body;

    console.log(id, descID, recomendacion, institucion, jurisdiccion);
    if (id === undefined || descID === undefined || recomendacion === undefined || institucion === undefined || jurisdiccion === undefined) {
      res.status(400).json({ message: "Faltan campos por rellenar" });
    }
    const connection = await getConnection();
    const recomendacionAprobada = {descID, recomendacion, institucion, jurisdiccion};
    console.log("primer condicional pasado")
    const result = await connection.query("DELETE FROM recomendacionRec WHERE id = ?", id);
    if (result.affectedRows == 0){
      res.json({message:"La recomendación no existe o no se puede elminar. No se aplico cambios"});
    } else {
      console.log("primer condicional pasado")
      await connection.query("INSERT INTO recomendacion SET ?", recomendacionAprobada);
      
      res.json({ message: "recomendación aprobada" });
    }
  
  } catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const aprobarDispositivoRoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, institucion } = req.body;

    if (id === undefined || nombre === undefined || institucion === undefined) {
      res.status(400).json({ message: "Faltan campos por rellenar" });
    }

    const connection = await getConnection();

    const result = await connection.query("DELETE FROM dispositivoRec WHERE id = ?", id);
    if (result.affectedRows == 0){
      res.json({message:"La recomendación no existe o no se puede elminar. No se aplico cambios"});
    } else {
      await connection.query("UPDATE dispositivo SET reparacion = 1 WHERE dispositivo.nombre = ? AND institucion = ?", [nombre, institucion]);
      
      res.json({ message: "dispositivo dado de baja" });
    }
  
  } catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message });
  }
};

export const methods = {
  getRecomendacionDispositivo,
  getDispositivoRoto,
  getALLDispositivoRoto,
  getALLrecomendaciones,
  addDispositivoRoto,
  addRecomendacionDisp,
  deleteDispositivoRoto,
  deleteRecomendacionDisp,
  aprobarRecomendacion,
  aprobarDispositivoRoto
};
