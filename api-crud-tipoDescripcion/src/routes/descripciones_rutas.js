import { Router } from "express";
import { methods as controladores_descripciones } from "../controllers/controladores_descripciones";

const router = Router();

router.get("/", controladores_descripciones.obtener_descripciones);
router.get("/:id", controladores_descripciones.obtener_descripcion);
router.post("/", controladores_descripciones.agregar_descripcion);
router.put("/:id", controladores_descripciones.actualizar_descripcion);
router.delete("/:id", controladores_descripciones.eliminar_descripcion);
router.get("/descripcion", controladores_descripciones.obtener_id); //este se agrego

export default router;
