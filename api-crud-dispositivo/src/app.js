import express from "express";
import morgan from "morgan";
import cors from 'cors';
// Routes
import dispositivosRoutes from "./routes/dispositivos.routes";

const app = express();
app.use(cors());
// Settings
app.set("port", 4009);


// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/dispositivos", dispositivosRoutes);

export default app;
