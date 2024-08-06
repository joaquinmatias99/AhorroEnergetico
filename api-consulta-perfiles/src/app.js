import express from "express";
import morgan from "morgan";
import cors from 'cors';
// Routes
import dispositivosRoutes from "./routes/perfiles.routes";

const app = express();
app.use(cors());
// Settings
app.set("port", 4010);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/consultarPerfiles", dispositivosRoutes);

export default app;
