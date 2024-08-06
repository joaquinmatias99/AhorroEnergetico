import express from "express";
import morgan from "morgan";
// Routes
import analizarRoutes from "./routes/analizar.routes";
import cors from 'cors'

const app = express();
app.use(cors());

// Settings
app.set("port", 4007);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/analizar", analizarRoutes);

export default app;
