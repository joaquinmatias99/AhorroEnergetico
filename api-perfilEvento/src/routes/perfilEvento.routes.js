import { Router } from "express";
import { methods as perfiles } from "../controllers/perfilEvento.controller";

const router = Router();

router.get("/", perfiles.getPerfilesEvento);
router.get("/get", perfiles.getPerfilEventoFechaPlanta);
router.post("/", perfiles.addPerfilEvento);
router.put("/", perfiles.updatePerfilEvento);
router.delete("/", perfiles.deletePerfilEvento);

export default router;