import { Router } from "express";
import { methods as recomendaciAlumno } from "../controllers/recomendacionAlumnos.controller";

const router = Router();

router.get("/recomendacionDisp/", recomendaciAlumno.getRecomendacionDispositivo);
router.get("/recomendacionDispRoto/", recomendaciAlumno.getDispositivoRoto);
router.post("/recomendacionDisp/", recomendaciAlumno.addRecomendacionDisp);
router.post("/recomendacionDispRoto/", recomendaciAlumno.addDispositivoRoto);
router.delete("/recomendacionDisp/", recomendaciAlumno.deleteRecomendacionDisp);
router.delete("/recomendacionDispRoto/",recomendaciAlumno.deleteDispositivoRoto);
router.put("/recomendacionDisp/:id", recomendaciAlumno.aprobarRecomendacion);
router.put("/recomendacionDispRoto/:id", recomendaciAlumno.aprobarDispositivoRoto);

export default router;
