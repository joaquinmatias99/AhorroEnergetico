import { getConnection } from "../database/database";

const obtener_metas = async (req, res) => {
  try {
    const descID = req.query.descripcion === undefined ? "" : parseInt(req.query.descripcion, 10);
    const institucion = req.query.institucion === undefined ? "" : req.query.institucion;

    const query = `SELECT meta.id,descID,fechaDesde,fechaHasta,consumoEsperado,meta.institucion,descripcion FROM meta INNER JOIN descripcionDisp on descID = descripcionDisp.id `
    var where = ``;

    if (descID != "" || descID != 0){
      where += `WHERE descID = ${descID} `;
    }
    if (institucion != ""){
      if (where.length == 0)
        where += `WHERE meta.institucion = "${institucion}" `;
      else
        where += `AND meta.institucion = "${institucion}" `;
    }

    const connection = await getConnection();
    const result = await connection.query(query + where);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const obtener_metash = async (req, res) => {
  try {
    const descID = req.query.descripcion === undefined ? "" : parseInt(req.query.descripcion, 10);
    const institucion = req.query.institucion === undefined ? "" : req.query.institucion;

    const query = `SELECT metaH.id,descID,fechaDesde,fechaHasta,consumoEsperado,metaH.institucion,enviado,descripcion FROM metaH INNER JOIN descripcionDisp on descID = descripcionDisp.id `
    var where = ``;

    if (descID != "" || descID != 0){
      where += `WHERE descID = ${descID} `;
    }
    if (institucion != ""){
      if (where.length == 0)
        where += `WHERE metaH.institucion = "${institucion}" `;
      else
        where += `AND metaH.institucion = "${institucion}" `;
    }
  
    const connection = await getConnection();
    const result = await connection.query(query + where);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const addMeta = async (req, res) => {
  try {

      const {descID, fechaDesde, fechaHasta, consumoEsperado, institucion, jurisdiccion} = req.body;

      if (descID === undefined || fechaDesde === undefined || fechaHasta === undefined || consumoEsperado === undefined || institucion === undefined || jurisdiccion === undefined) {
          res.status(400).json({ message: "Faltan campos por rellenar" });
      };

      const connection = await getConnection();
      if (await buscarDuplicado(connection, descID,  institucion)) {
          const meta = {descID, fechaDesde, fechaHasta, consumoEsperado, institucion};
          
          await connection.query(
            "INSERT INTO meta SET ?", meta
          );

          res.json({ message: "Meta agregada" });
      }
      else{
          res.status(400).json({ message: "Existe ya una meta con exactamente los mismos datos" });
      }

  } catch (error) {
    console.log(error);
      res.status(500).json({ message: "Error interno: " + error.message});
  }
};

const buscarDuplicado = async function (connection, descID, institucion){
const result = await connection.query("SELECT * FROM meta WHERE descID = ? AND institucion = ?", 
          [descID, institucion]);

  if(result.length == 0)
      return true;
  else
      return false;
}


const updateMeta = async (req, res) => {
  try {
      const id = req.query.id;
      const {  fechaHasta, consumoEsperado, institucion } = req.body;

      if (id === undefined  || fechaHasta === undefined || consumoEsperado === undefined || institucion === undefined) {
        return res.status(400).json({ message: "Faltan campos por rellenar" });
      }
      const NuevaMeta = {  fechaHasta, consumoEsperado, institucion };
      const connection = await getConnection();
      const result = await connection.query("UPDATE meta SET ? WHERE id = ?", [NuevaMeta, id]);
          
      if(result.affectedRows > 0)
        return res.json({ message: "meta actualizada" });
      else   
        return res.json({ message: "meta no existente. No se aplico cambios" });

  } catch (error) {
      return res.status(500).json({ message: "Error interno: " + error.message});
  }
};

const deleteMeta = async (req, res) => {
  try {
    const id = req.query.id;
    const connection = await getConnection();
    const result = await connection.query( "DELETE FROM meta WHERE id = ?",  id);
    
    if(result.affectedRows > 0)
        res.json({ message: "meta Eliminada"});
    else   
        res.json({ message: "La meta no existe o no se puede elminar. No se aplico cambios" });

} catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message});
}
};

export const methods = {
  obtener_metas,
  obtener_metash,
  /*actualizar_perfilxdia,
  agregar_perfilxdia,
  eliminar_perfilxdia,*/
  addMeta,
  updateMeta,
  deleteMeta    
};
