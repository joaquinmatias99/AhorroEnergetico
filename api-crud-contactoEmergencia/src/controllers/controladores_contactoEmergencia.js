import { getConnection } from "../database/database";

const obtener_telefonos = async (req, res) => {
  try {
    const institucion =
      req.query.institucion === undefined ? "" : req.query.institucion;
    const id =
      req.query.id === undefined ? "" : req.query.id;
    var where= id==""?"": " and id = ?  "
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT * FROM telefonoEmergencia where institucion = ? "+where,
      [institucion,id]
    );
     return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const agregar_telefono = async (req, res) => {
  try {
    const institucion = req.query.institucion;
    const { telefono, nombre, tipoEmergencia } = req.body;
    console.log(telefono, nombre, tipoEmergencia, institucion);
    if (
      telefono === undefined ||
      institucion === undefined ||
      tipoEmergencia === undefined ||
      nombre === undefined
    ) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const connection = await getConnection();
    if (
      await buscarDuplicado(
        connection,
        telefono,
        nombre,
        tipoEmergencia,
        institucion
      )
    ) {
      await connection.query("INSERT INTO telefonoEmergencia SET ?", {
        telefono,
        tipoEmergencia,
        nombre,
        institucion,
      });

      res.json({ message: "contacto agregado" });
    } else {
      return res.status(400).json({ message: "contacto ya existe" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const actualizar_contacto = async (req, res) => {
  try {
    const institucion = req.query.institucion;
    const id = req.query.id;
    const { telefono, nombre, tipoEmergencia } = req.body;

    if (
      id === undefined ||
      telefono === undefined ||
      institucion === undefined ||
      tipoEmergencia === undefined ||
      nombre === undefined
    ) {
      res.status(400).json({
        message:
          "no hay ningún elemento con ese id o no esta definida la descripción",
      });
    }
    const connection = await getConnection();
    if (
      await buscarDuplicado(
        connection,
        telefono,
        nombre,
        tipoEmergencia,
        institucion
      )
    ) {
      const telefono_nuevo = { telefono, nombre, tipoEmergencia };

      const result = await connection.query(
        "UPDATE telefonoEmergencia SET ? WHERE id = ? and institucion = ?",
        [telefono_nuevo, id, institucion]
      );

      if (result.affectedRows == 0)
        res.json({
          message:
            "Descripción no existe o no existe ese ID de referencia. No se aplico cambios",
        });
      else res.json({ message: "Descripción actualizada" });
    } else {
      res.status(400).json({ message: "Descripcion ya existe" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const eliminar_contacto = async (req, res) => {
  try {
    const id = req.query.id;
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM telefonoEmergencia WHERE id = ?",
      id
    );

    if (result.affectedRows == 0)
      res.json({
        message:
          "Descripción no existe o no existe ese ID de referencia. No se aplico cambios",
      });
    else res.json({ message: "Contacto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error interno: " + error.message });
  }
};

const buscarDuplicado = async function (
  connection,
  telefono,
  nombre,
  tipoEmergencia,
  institucion
) {
  const result = await connection.query(
    "SELECT * FROM telefonoEmergencia WHERE telefono = ? AND institucion = ? and nombre= ? and tipoEmergencia= ? ",
    [telefono, institucion, nombre, tipoEmergencia]
  );

  if (result.length == 0) return true;
  else return false;
};

export const methods = {
  obtener_telefonos,
  agregar_telefono,
  actualizar_contacto,
  eliminar_contacto,
};
