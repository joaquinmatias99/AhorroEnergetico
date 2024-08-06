import express from "express";
import morgan from "morgan";
import cors from 'cors';
// Routes

import criteriosRoutes from "./routes/criterios.routes";

const app = express();
app.use(cors());
// Settings
app.set("port", 4006);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes

app.use("/api/criterios", criteriosRoutes);

export default app;
