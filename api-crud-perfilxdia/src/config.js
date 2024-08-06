import { config } from "dotenv";

config();
console.log("env", process.env.HOST);
export default {
  host: process.env.HOST || "us-cdbr-east-06.cleardb.net",
  database: process.env.DATABASE || "heroku_015f6837eecf917",
  user: process.env.USER || "b264942e0c26ae",
  password: process.env.PASSWORD || "9683ac3e",
};
