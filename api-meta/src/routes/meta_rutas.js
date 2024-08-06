import { Router } from "express";
import { methods as controles_meta } from "../controllers/controles_meta";

const router = Router();

router.get("/", controles_meta.obtener_metas);
router.get("/historica/", controles_meta.obtener_metash);
router.post("/", controles_meta.addMeta);
router.delete("/", controles_meta.deleteMeta);
router.put("/", controles_meta.updateMeta);
/*router.post("/", controles_acciones.agregar_perfilxdia);
router.put("/", controles_acciones.actualizar_perfilxdia);
router.delete("/", controles_acciones.eliminar_perfilxdia);*/

export default router;
