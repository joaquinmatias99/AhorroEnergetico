import { Router } from "express";
import { methods as perfiles } from "../controllers/perfiles.controller";

const router = Router();

router.post("/", perfiles.getPerfiles);

export default router;
