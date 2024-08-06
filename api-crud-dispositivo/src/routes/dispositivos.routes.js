import { Router } from "express";
import { methods as dispositivos } from "../controllers/dispositivos.controller";

const router = Router();

router.get("/", dispositivos.getDispositivos);
router.get("/get/:id", dispositivos.getDispositivo);
router.get("/descripcion", dispositivos.getDispositivosConDescripcion);
router.get("/getID", dispositivos.obtenerID);
router.post("/", dispositivos.addDispositivo);
router.put("/:id", dispositivos.updateDispositivo);
router.delete("/:id", dispositivos.deleteDispositivo);

export default router;
