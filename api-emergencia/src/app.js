import express from "express";
import morgan from "morgan";
import cors from 'cors';
// Routes
import emergenciaRoutes from "./routes/emergencia.routes";

const app = express();
app.use(cors());

// Settings
app.set("port", 4007);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/emergencia", analizarRoutes);

export default app;
