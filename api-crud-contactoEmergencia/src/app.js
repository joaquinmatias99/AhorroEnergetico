import express from "express";
import morgan from "morgan";
import cors from "cors";
// Routes
import contactoEmergencia from "./routes/contactoEmergencia_rutas";

const app = express();
app.use(cors());
// Settings
app.set("port", 4017);

// Middlewares
app.use(morgan("dev"));
app.use(express.json()); //cumple la funcion de que nuestro servidor pueda interpretar archivos json

// Routes
app.use("/api/contactoEmergencia", contactoEmergencia);

export default app;
