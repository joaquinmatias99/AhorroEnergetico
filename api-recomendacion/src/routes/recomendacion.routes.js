import { Router } from "express";
import { methods as recomendaciones } from "../controllers/recomendacion.controller";

const router = Router();

router.get("/", recomendaciones.getRecomendaciones);
router.post("/", recomendaciones.addRecomendacion);
router.put("/", recomendaciones.updateRecomendacion);
router.delete("/", recomendaciones.deleteRecomendacion);
router.get("/get", recomendaciones.getRecomendacionID);
router.get("/gets", recomendaciones.getALL);
export default router;
