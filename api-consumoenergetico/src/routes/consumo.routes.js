import { Router } from "express";
import { methods as consumoController } from "./../controllers/consumo.controller";

const router = Router();

router.get(
  "/institucion-dispositivo",
  consumoController.getConsumoDiarioInstitucionDispositivo
);
router.get("/getMetasIncumplidas", consumoController.getMetasIncumplidas);
router.get("/getMetasCumplidasxMes", consumoController.getMetasCumplidas);
router.get("/institucion", consumoController.getConsumoDiarioInstitucion);
router.get("/dispositivo", consumoController.getConsumoDiarioPorDispositivo);
router.get(
  "/dispositivos",
  consumoController.getAllConsumoDiarioPorDispositivo
);
router.post("/consumo-diario", consumoController.calcularConsumoDiario);

export default router;
