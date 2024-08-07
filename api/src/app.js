import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { FRONTEND_URL } from "./config.js";
import studentsRoutes from "./routes/students.routes.js";
import absencesRoutes from "./routes/absences.routes.js";
import authRoutes from "./routes/auth.routes.js";
import computersRoutes from "./routes/computers.routes.js"

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use(express.json());

app.use(cookieParser());

app.use(studentsRoutes);

app.use(absencesRoutes);

app.use(authRoutes);

app.use(computersRoutes);

export default app;
