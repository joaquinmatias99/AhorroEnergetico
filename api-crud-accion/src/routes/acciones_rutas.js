import { Router } from "express";
import { methods as controles_acciones } from "../controllers/controles_acciones";

const router = Router();

router.get("/", controles_acciones.obtener_acciones);
router.get("/get", controles_acciones.obtener_accion);
router.get("/descripcion", controles_acciones.acciones_descripcion);
router.post("/", controles_acciones.agregar_accion);
router.put("/", controles_acciones.actualizar_accion);
router.delete("/", controles_acciones.eliminar_accion);

export default router;
