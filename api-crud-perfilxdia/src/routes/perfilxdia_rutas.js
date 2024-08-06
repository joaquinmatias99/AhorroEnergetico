import { Router } from "express";
import { methods as controles_acciones } from "../controllers/controles_perfilxdia";

const router = Router();

router.get("/", controles_acciones.obtener_perfilxdias);
router.get("/get", controles_acciones.obtener_perfilxdia);
router.post("/", controles_acciones.agregar_perfilxdia);
router.put("/", controles_acciones.actualizar_perfilxdia);
router.delete("/", controles_acciones.eliminar_perfilxdia);

export default router;
