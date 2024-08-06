import express from "express";
import morgan from "morgan";
// Routes
import consumoRoutes from "./routes/consumo.routes";
import cors from 'cors'
const app = express();
app.use(cors());
// Settings
app.set("port", 4012);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/consumo", consumoRoutes);

export default app;
