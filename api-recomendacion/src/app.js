import express from "express";
import morgan from "morgan";
import cors from 'cors';
// Routes
import recomendacionRoutes from "./routes/recomendacion.routes";

const app = express();
app.use(cors());

// Settings
app.set("port", 4013);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/recomendacion", recomendacionRoutes);

export default app;
