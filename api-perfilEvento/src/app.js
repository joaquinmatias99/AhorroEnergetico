import express from "express";
import morgan from "morgan";
import cors from 'cors';
// Routes
import perfilesEventoRoutes from "./routes/perfilEvento.routes";

const app = express();
app.use(cors());

// Settings
app.set("port", 4015);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/eventos", perfilesEventoRoutes);

export default app;
