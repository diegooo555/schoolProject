import {Router} from 'express';
import { getComputerByCode, getComputersByHall, getComputerById, getComputers,createComputer, updateComputer, deleteComputer } from "../controllers/computers.controller.js";

const router = new Router();

router.post("/newcomputer", createComputer);

router.get("/computercode/:code", getComputerByCode);

router.get("/computershall/:hall", getComputersByHall);

router.get("/computers/:id", getComputerById);

router.get("/computers", getComputers);

router.put("/computer/:id", updateComputer);

router.delete("/computer/:id", deleteComputer);

export default router;