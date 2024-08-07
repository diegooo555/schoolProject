import Absence from "../models/absence.model.js";
import Student from "../models/student.model.js";

export const createAbsence = async (req, res) => {
  const { date, student, curse, name } = req.body;

  try {
    const newAbsence = new Absence({
      date,
      student,
      curse,
      name,
    });

    const absenceSaved = await newAbsence.save();

    res.json({
      id: absenceSaved._id,
      date: absenceSaved.date,
      student: absenceSaved.student,
      curse: absenceSaved.curse,
      name: absenceSaved.name,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAbsencesByCurse = async (req, res) => {
  try {
    const absences = await Absence.find({
      curse: req.params.curse,
    });

    if(!absences) return res.status(400).json(["No se encontraron Inasistencias"]);

    res.json(absences);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAbsencesByDocument = async (req, res) => {
  try {
    const studentFound = await Student.findOne({
      document: req.params.document,
    });

    if (!studentFound)
      return res.status(400).json(["Estudiante no encontrado"]);

    const absences = await Absence.find({
      student: studentFound.id,
    });

    res.json(absences);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteAbsence = async (req, res) => {
  const absenceDelete = await Absence.findByIdAndDelete(req.params.id);
  if (!absenceDelete)
    return res.status(404).json({ message: "Absence not found" });
  res.sendStatus(204);
};
