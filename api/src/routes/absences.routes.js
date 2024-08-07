import { Router } from "express";
import {
  createAbsence,
  getAbsencesByCurse,
  deleteAbsence,
  getAbsencesByDocument
} from "../controllers/absences.controller.js";

const router = Router();

router.post("/newabsence", createAbsence);

router.get("/absencescurse/:curse", getAbsencesByCurse);

router.get("/absencesdocument/:document", getAbsencesByDocument);

router.delete("/absence/:id", deleteAbsence);

export default router;
