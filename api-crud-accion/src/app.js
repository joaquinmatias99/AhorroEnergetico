import express from "express";
import morgan from "morgan";
// Routes
import acciones_rutas from "./routes/acciones_rutas";
import cors from 'cors';

const app = express();
app.use(cors());

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json()); //cumple la funcion de que nuestro servidor pueda interpretar archivos json

// Routes
app.use("/api/accion", acciones_rutas);

export default app;
