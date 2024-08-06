import { Router } from "express";
import { methods as analizarController } from "./../controllers/analizar.controller";

const router = Router();

router.post("/", analizarController.analizar);

export default router;
