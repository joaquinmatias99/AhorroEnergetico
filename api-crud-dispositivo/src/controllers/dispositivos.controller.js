import { getConnection } from "../database/database";

const getDispositivos = async (req, res) => {
    try {
        const institucion =  req.query.institucion === undefined ? "" : req.query.institucion;
        const planta =  req.query.planta === undefined ? "" : req.query.planta;
        const config = req.query.config === undefined ? "" : req.query.config;
        var where = ``;

        if(planta != "") {
            where += `WHERE planta = ${planta} `;
        }
        if(institucion != "") {
            if(where.length == 0)
                where += `WHERE institucion = "${institucion}" `;
            else
                where += `AND institucion = "${institucion}" `;
        }
        if (config != "") {
            if(where.length == 0)
                where += `WHERE reparacion = 0 AND tipoConexion != 4 `;
            else
                where += `AND reparacion = 0 AND tipoConexion != 4 `;
        }

        const connection = await getConnection();
        const result = await connection.query(`SELECT * FROM dispositivo ` + where);
        
        return res.json(result);

    } catch (error) {
        return res.status(500).json({ message: "Error interno: " + error.message});
    }
};

const getDispositivo = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM dispositivo WHERE dispositivoID = ?", id);
        
        return res.json(result);

    } catch (error) {
        return res.status(500).json({ message: "Error interno: " + error.message});
    }
};

const getDispositivosConDescripcion = async (req, res) => {
    try {
        const tipoConexion = req.query.conexion === undefined ? "" : parseInt(req.query.conexion, 10);
        const descID = req.query.descripcion === undefined ? "" : parseInt(req.query.descripcion, 10);
        const planta = req.query.planta === undefined ? "" : req.query.planta;
        const zona = req.query.zona === undefined ? "" : req.query.zona;
        const institucion = req.query.institucion === undefined ? "" : req.query.institucion;

        var query =
        `SELECT * FROM dispositivo INNER JOIN descripcionDisp on descID = descripcionDisp.id `;
        var where = ``;

        if (tipoConexion != 0 && tipoConexion != "") {
            where += `WHERE tipoConexion = ${tipoConexion} `;
        } 
        if (descID != 0 && descID != "") {
            if(where.length == 0)
                where += `WHERE descID = ${descID} `;
            else 
                where += `AND descID = ${descID} `;
        } 
        if (planta != "" && planta != "-1") {
            if(where.length == 0)
                where += `WHERE planta = ${planta} `;
            else
                where += `AND planta = ${planta} `;
        }
        if (zona != "") {
            if(where.length == 0)
                where += `WHERE aula = "${zona}" `;
            else
                where += `AND aula = "${zona}" `;
        } 
        if (institucion != "") {
            if(where.length == 0)
                where += `WHERE dispositivo.institucion = "${institucion}" `;
            else
                where += `AND dispositivo.institucion = "${institucion}" `;
        } 
      
        const connection = await getConnection();
        const result = await connection.query(query + where);
        return res.json(result);

    } catch (error) {
        return res.status(500).json({ message: "Error interno: " + error.message});
    }
};

const addDispositivo = async (req, res) => {
    try {
        const { tipoConexion, descID, planta, aula, nombre, direccionIP, numeroDispArduino, consumo, institucion, jurisdiccion } = req.body;

        if (tipoConexion === undefined || descID === undefined || planta === undefined || aula === undefined || nombre === undefined || direccionIP === undefined || numeroDispArduino === undefined || consumo === undefined || institucion === undefined || jurisdiccion === undefined) {
            return res.status(400).json({ message: "Faltan campos por rellenar" });
        } 

        const connection = await getConnection();

        if (await buscarDuplicado(connection, nombre, -1)) {
            const dispositivo = { tipoConexion, descID, reparacion:0, planta, aula, estado:0, nombre, direccionIP, numeroDispArduino, consumo, institucion, jurisdiccion};
            
            await connection.query("INSERT INTO dispositivo SET ?", dispositivo);
            return res.json({ message: "Dispositivo agregado" });
        } else{
            return res.status(400).json({ message: "Existe un dispositivo con datos similares que podria causar conflicto" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Error interno: " + error.message});
    }
};

const updateDispositivo = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipoConexion, descID, reparacion, planta, aula, estado, nombre, direccionIP, numeroDispArduino, consumo, institucion, jurisdiccion} = req.body;

        if (tipoConexion === undefined || descID === undefined || reparacion === undefined || planta === undefined || aula === undefined || estado === undefined || nombre === undefined || direccionIP === undefined || numeroDispArduino === undefined || consumo === undefined || institucion === undefined || jurisdiccion === undefined) {
            return res.status(400).json({ message: "Faltan campos por rellenar" });
        }
        const dispositivo = { tipoConexion, descID, reparacion, planta, aula, estado, nombre, direccionIP, numeroDispArduino, consumo, institucion, jurisdiccion};
        const connection = await getConnection();

        if (await buscarDuplicado(connection, nombre, id)) {
            const result = await connection.query("UPDATE dispositivo SET ? WHERE dispositivoID = ?", [dispositivo, id]);
            
            if(result.affectedRows > 0)
                return res.json({ message: "Dispositivo actualizado" });
            else   
                return res.json({ message: "Dispositivo no existe. No se aplico cambios" });

        } else{
            return res.status(400).json({ message: "Existe un dispositivo con datos similares que podria causar conflictos" });
        }
        
    } catch (error) {
        return res.status(500).json({ message: "Error interno: " + error.message});
    }
};

const deleteDispositivo = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query("DELETE FROM dispositivo WHERE dispositivoID = ?", id);
        
        if(result.affectedRows > 0)
            return res.json({ message: "Dispositivo eliminando" });
        else   
            return res.json({ message: "Dispositivo no existe. No se aplico cambios" });
    
    } catch (error) {
        return res.status(500).json({ message: "Error interno: " + error.message});
    }
};

const buscarDuplicado = async function (connection, nombre, id){
    var result;
    var nom = await connection.query("SELECT nombre FROM dispositivo WHERE dispositivoID = ?", id);

    if (nom.length == 0){
        result = await connection.query("SELECT * FROM dispositivo WHERE nombre = ?", nombre);
        if(result.length == 0)
            return true;
        else
            return false;
    }
    
    if (nom[0].nombre != nombre){
        result = await connection.query("SELECT * FROM dispositivo WHERE nombre = ?", nombre); 
        if(result.length == 0)
            return true;
        else
            return false;
    }
    return true
}

const obtenerID = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT MAX(dispositivoID) AS dispositivoID FROM dispositivo");
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error interno: " + error.message});
    }
}
export const methods = {
    getDispositivos,
    getDispositivo,
    addDispositivo,
    updateDispositivo,
    deleteDispositivo,
    getDispositivosConDescripcion,
    obtenerID 
};
