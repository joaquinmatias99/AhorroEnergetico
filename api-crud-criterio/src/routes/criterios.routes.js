import { Router } from "express";
import { methods as criterios } from "../controllers/criterios.controller";

const router = Router();

router.get("/", criterios.getCriterios);
router.get("/:id", criterios.getCriterio);
router.post("/", criterios.addCriterio);
router.put("/:id", criterios.updateCriterio);
router.delete("/:id", criterios.deleteCriterio);

export default router;
