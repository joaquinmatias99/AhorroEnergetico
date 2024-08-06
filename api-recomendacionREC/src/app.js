import express from "express";
import morgan from "morgan";
import cors from 'cors';
// Routes
import recomendacionAlumnoRoutes from "./routes/recomendacionAlumnos.routes";

const app = express();
app.use(cors());

// Settings
app.set("port", 4016);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/recomendacionAlumnos", recomendacionAlumnoRoutes);

export default app;
