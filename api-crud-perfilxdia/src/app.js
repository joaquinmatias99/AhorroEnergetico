import express from "express";
import morgan from "morgan";
import cors from 'cors';
// Routes
import acciones_rutas from "./routes/perfilxdia_rutas";

const app = express();
app.use(cors());
// Settings
app.set("port", 4011);

// Middlewares
app.use(morgan("dev"));
app.use(express.json()); //cumple la funcion de que nuestro servidor pueda interpretar archivos json

// Routes
app.use("/api/perfilxdia", acciones_rutas);

export default app;
