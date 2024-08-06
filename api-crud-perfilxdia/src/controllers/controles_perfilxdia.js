import { getConnection } from "../database/database";

const obtener_perfilxdias = async (req, res) => {
  try {
    const institucion =
      req.query.institucion == null ? "" : req.query.institucion;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT * FROM perfilXDia where institucion= ? ",
      institucion
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const obtener_perfilxdia = async (req, res) => {
  try {
    const institucion = req.query.institucion === undefined ? "" : req.query.institucion;
    const dia = req.query.dia === undefined ? "" : parseInt(req.query.dia, 10);
    var planta = req.query.planta === undefined ? "" : req.query.planta;
    const fechaUltAccion = req.query.fechaUltAccion === undefined ? "" : req.query.fechaUltAccion;

    var where = ``;
    if (institucion != ""){
      where += `where institucion = "${institucion}" `;
    }
    if (dia != "") {
      if (where.length == 0)
        where += `where dia = ${dia} `;
      else
        where += `and dia = ${dia} `;
    }
    if (planta != "") { 
      if (where.length == 0)
        where += `where planta = ${planta} `;
      else
        where += `and planta = ${planta}  `;
    }
    if (fechaUltAccion != "") {
      if (where.length == 0)
        where += `where fechaUltAccion < "${fechaUltAccion}" `;
      else
        where += `and fechaUltAccion < "${fechaUltAccion}" `;
    }
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM perfilXDia " + where);

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const agregar_perfilxdia = async (req, res) => {
  try {
    const { dia, horaDesde, horaHasta, planta } = req.body;
    const institucion =
      req.query.institucion == null ? "" : req.query.institucion;
    if (
      dia === undefined ||
      horaDesde === undefined ||
      horaHasta === undefined ||
      planta === undefined ||
      institucion === undefined
    ) {
      res.status(400).json({ message: "Falta la agregar algún dato" });
    } else {
      const nueva_perfilxdia = {
        dia,
        horaDesde,
        horaHasta,
        planta,
        institucion,
      };
      const connection = await getConnection();
      await connection.query("INSERT INTO perfilXDia SET ? ", [
        nueva_perfilxdia,
      ]);
      return res.json({ message: "Proceso realizado con exito" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const actualizar_perfilxdia = async (req, res) => {
  try {
    const institucion =
      req.query.institucion == null ? "" : req.query.institucion;
    const dia = req.query.dia;
    const planta = req.query.planta;
    const { horaHasta, horaDesde, fechaUltAccion } = req.body;

    console.log(dia, planta, horaHasta, horaDesde,)
    if (
      dia === undefined ||
      planta === undefined ||
      horaHasta === undefined ||
      horaDesde === undefined ||
      fechaUltAccion === undefined ||
      institucion === undefined
    ) {
      return res.status(400).json({ message: "Falta agregar algún dato" });
    }
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE perfilXDia SET horaHasta = ?,horaDesde = ?, fechaUltAccion=? WHERE dia = ? and planta= ? and institucion= ? ",
      [horaHasta, horaDesde, fechaUltAccion, dia, planta, institucion]
    );

    if (result.affectedRows > 0)
      return res.json({ message: "Proceso realizado con exito" });
    else 
      return res.json({ message: "Perfil inexistente" });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Ocurrio un problema al actualizar la accion" });
  }
};

const eliminar_perfilxdia = async (req, res) => {
  try {
    const institucion =
      req.query.institucion == null ? "" : req.query.institucion;
    const dia = req.query.dia;
    const planta = req.query.planta;

    if (
      dia === undefined ||
      planta === undefined ||
      institucion === undefined
    ) {
      res.status(400).json({ message: "Falta agregar algún dato" });
    }
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM perfilXDia WHERE dia = ? and planta = ? and institucion = ? ",
      [dia, planta, institucion]
    );
    if (result.affectedRows > 0) res.json({ message: "Perfil eliminando" });
    else res.json({ message: "Perfil no existe" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error interno: " + error.message });
  }
};

export const methods = {
  obtener_perfilxdias,
  obtener_perfilxdia,
  actualizar_perfilxdia,
  agregar_perfilxdia,
  eliminar_perfilxdia,
};
