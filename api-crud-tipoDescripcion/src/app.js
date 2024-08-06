import express from "express";
import morgan from "morgan";
import cors from "cors"
// Routes
import descripciones_rutas from "./routes/descripciones_rutas";

const app = express();
app.use(cors());
// Settings
app.set("port", 4001);

// Middlewares
app.use(morgan("dev"));
app.use(express.json()); //cumple la funcion de que nuestro servidor pueda interpretar archivos json

// Routes
app.use("/api/descripciones", descripciones_rutas);

export default app;
