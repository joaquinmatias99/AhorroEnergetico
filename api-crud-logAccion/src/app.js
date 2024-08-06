import express from "express";
import morgan from "morgan";
import cors from 'cors';
// Routes
import logAccionRoutes from "./routes/logAccion.routes";

const app = express();
app.use(cors());
const path = require("path")

//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec ={
    definition:{
        openapi:"3.0.0",
        info:{
            title: "Ahorro Energetico logAccion-api",
            version:"1.0.0"
        },
        servers:[
            {
                url:"http://localhost:4008"
            }
        ]
    },
    apis:[`${path.join(__dirname, './routes/*.js')}`]

}

// Settings
app.set("port", 4008);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

// Routes
app.use("/api/logAcciones", logAccionRoutes);

export default app;
