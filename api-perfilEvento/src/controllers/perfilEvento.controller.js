import { getConnection } from "../database/database";

const getPerfilesEvento = async ( req, res) => {
    const {institucion} = req.query;
    const sqlQuery = institucion ? `SELECT * FROM perfilXEvento WHERE institucion='${institucion}'` : `SELECT * FROM perfilXEvento`
    try {
        const connection = await getConnection();
        const result = await connection.query(sqlQuery);
        
        res.json(result);

    } catch (error) {
        return res.status(500).json({ message: "Error interno: " + error.message});
    }
};

const getPerfilEventoFechaPlanta = async (req, res) => {
    try {    
        const dia = req.query.fecha === undefined ? "" : req.query.fecha;
        const planta = req.query.planta === undefined ? "" : req.query.planta;
        const activado = req.query.activado === undefined ? "" : req.query.activado;
        const institucion = req.query.institucion === undefined ? "" : req.query.institucion;
     
        var where = ``;

        if (dia != "") {
            where += `WHERE fecha = ${dia} `;
        }
        if (planta != "" && planta!=-1) {
            if (where.length == 0)
                where += `WHERE planta = ${planta} `;
            else
                where += `AND planta = ${planta} `;
        }
        if (activado != "") {
            if (where.length == 0)
                where += `WHERE activado = ${activado} `;
            else
                where += `AND activado = ${activado} `;
        }
        if (institucion != "") {
            if (where.length == 0)
                where += `WHERE institucion = "${institucion}" `;
            else
                where += `AND institucion = "${institucion}" `;
        }
        
        const connection = await getConnection();
        const result = await connection.query(`SELECT * FROM perfilXEvento ` + where);   
        res.json(result);

    } catch (error) {
        
        return res.status(500).json({ message: "Error interno: " + error.message});
    }
};



const addPerfilEvento = async (req, res) => {
    try {        
        const { fecha, activado, horaDesde, horaHasta, planta,institucion } = req.body;

        if (fecha === undefined || activado === undefined || planta === undefined || horaDesde === undefined || horaHasta === undefined || institucion === undefined) {
            return res.status(400).json({ message: "Faltan campos por rellenar" });
        } 

        const connection = await getConnection();
        if (await buscarDuplicado(connection, fecha, planta, institucion)) {
            const perfil= { fecha, activado, horaDesde, horaHasta, planta,institucion };
            
            await connection.query("INSERT INTO perfilXEvento SET ?", perfil);
            res.json({ message: "Perfil por evento agregado" });
        }else{
            return res.status(400).json({ message: "Existe un perfil con estos datos" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Error interno: " + error.message});
    }
};

const updatePerfilEvento = async (req, res) => {
    try {
        const plantaUpdate = req.query.planta;
        const fechaUpdate = req.query.dia;
        const institucion =req.query.institucion == null ? "" : req.query.institucion;
        const {fecha, activado, horaDesde, horaHasta, planta } = req.body;

        if (fecha === undefined || activado === undefined || horaDesde === undefined || horaHasta === undefined || planta === undefined ) {
            return res.status(400).json({ message: "Faltan campos por rellenar" });
        }
        const connection = await getConnection();
        const perfilUpdate= { fecha, activado, horaDesde, horaHasta, planta };        

        const result = await connection.query("UPDATE perfilXEvento SET ? WHERE fecha = ? AND planta = ? AND institucion= ? ", [perfilUpdate, fechaUpdate, plantaUpdate,institucion]);
        if(result.affectedRows > 0)
            res.json({ message: "Perfil de evento actualizado" });
        else   
        return res.json({ message: "Perfil de evento no existe. No se aplico cambios" });

    } catch (error) {
        return res.status(500).json({ message: "Error interno: " + error.message});
    }
};

const deletePerfilEvento = async (req, res) => {
    try {    
        const institucion =
        req.query.institucion == null ? "" : req.query.institucion;
        const fechaDelete = req.query.fecha;
        const plantaDelete = req.query.planta;

        const connection = await getConnection();
        const result = await connection.query("DELETE FROM perfilXEvento WHERE fecha = ? AND planta = ? AND institucion= ?", 
                    [fechaDelete, plantaDelete,institucion]);
        
        if(result.affectedRows > 0)
            res.json({ message: "Perfil x evento eliminando" });
        else   
        return res.json({ message: "Perfil x evento no existe. No se aplico cambios" });
    
    } catch (error) {
       return res.status(500).json({ message: "Error interno: " + error.message});
    }
};


const buscarDuplicado = async function (connection, fecha, planta, institucion){
    const result = await connection.query("SELECT * FROM perfilXEvento WHERE fecha = ? AND planta = ? AND institucion = ?", 
            [fecha, planta,institucion]);

    if(result.length == 0)
        return true;
    else
        return false;
}

export const methods = {
    getPerfilesEvento,
    getPerfilEventoFechaPlanta,
    addPerfilEvento,
    updatePerfilEvento,
    deletePerfilEvento,
};
