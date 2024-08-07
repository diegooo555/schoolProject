import Student from "../models/student.model.js";

export const createStudent = async (req, res) => {
  const { name, curse, document, cel } = req.body;

  try {
    const studentFoundByName = await Student.findOne({ name });

    const studentFoundByDocument = await Student.findOne({ document });

    const studentFoundByCel = await Student.findOne({ cel });

    if (studentFoundByName)
      return res
        .status(400)
        .json(["El nombre del estudiante ya esta registrado"]);

    if (studentFoundByDocument)
      return res.status(400).json(["El documento ya esta registrado"]);

    if (studentFoundByCel)
      return res
        .status(400)
        .json(["El celular ingresado se encuentra registrado"]);

    const newStudent = new Student({
      name,
      curse,
      document,
      cel,
    });

    const studentSaved = await newStudent.save();

    res.json({
      id: studentSaved._id,
      name: studentSaved.name,
      curse: studentSaved.curse,
      document: studentSaved.document,
      cel: studentSaved.cel,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    const studentFound = await Student.findOne({
      document: req.params.document,
    });

    if (!studentFound)
      return res.status(400).json(["Estudiante no encontrado"]);

    res.json({
      id: studentFound._id,
      name: studentFound.name,
      curse: studentFound.curse,
      document: studentFound.document,
      cel: studentFound.cel,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const allStudents = await Student.find({});
    if(!allStudents) return res.status(400).json(["No se encontraron Estudiantes"])

    return res.json(allStudents)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const deleteStudentByDocument = async (req, res) => {
  try {
    const studentFound = await Student.findOneAndDelete({ document: req.params.document });
    if (!studentFound)
      return res
        .status(400)
        .json([`El estudiante con el documento ${document} no existe`]);
  
    return res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,{
        new: true,
      }
      
    );
  
    if(!student) return res.status(404).json({message: "Estudiante no Encontrado"});
  
    res.json({student});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
};
