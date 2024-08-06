import { Router } from "express";
import { methods as emergenciaController } from "./../controllers/emergencia.controller";

const router = Router();

router.post("/", emergenciaController.apagadoEmergencia);

export default router;
