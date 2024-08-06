import { Router } from "express";
import { methods as controladores_contacto } from "../controllers/controladores_contactoEmergencia";

const router = Router();

router.get("/", controladores_contacto.obtener_telefonos);
router.post("/", controladores_contacto.agregar_telefono);
router.put("/", controladores_contacto.actualizar_contacto);
router.delete("/", controladores_contacto.eliminar_contacto);

export default router;
