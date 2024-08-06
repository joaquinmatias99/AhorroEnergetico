import express from "express";
import morgan from "morgan";
import cors from 'cors';
// Routes
import meta_rutas from "./routes/meta_rutas";

const app = express();
app.use(cors());

// Settings
app.set("port", 4022);

// Middlewares
app.use(morgan("dev"));
app.use(express.json()); //cumple la funcion de que nuestro servidor pueda interpretar archivos json

// Routes
app.use("/api/meta", meta_rutas);

export default app;
