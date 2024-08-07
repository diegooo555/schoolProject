import Computer from "../models/computer.model.js";

export const createComputer = async (req, res) => {
  const { code, placeDetail, hall, description, lastModification, mandated } = req.body;

  try {
    const newComputer = new Computer({
      code,
      placeDetail,
      hall,
      description,
      lastModification,
      mandated
    });
    const computerSaved = await newComputer.save();

    res.json({
      code: computerSaved.code,
      placeDetail: computerSaved.placeDetail,
      hall: computerSaved.hall,
      description: computerSaved.description,
      lastModification: computerSaved.lastModification,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getComputersByHall = async (req, res) => {
  try {
    const computers = await Computer.find({
      hall: req.params.hall,
    });

    res.json(computers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getComputerByCode = async (req, res) => {
  try {
    const computer = await Computer.findOne({
      code: req.params.code,
    });

    if (!computer) return res.status(400).json(["Computador no encontrado"]);
    res.json(computer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getComputerById = async (req, res) => {
  try {
    const computer = await Computer.findById(req.params.id);

    if (!computer) return res.status(400).json(["Computador no encontrado"]);
    res.json(computer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getComputers = async (req, res) => {
  try {
    const allComputers = await Computer.find({});
    if(!allComputers) return res.status(400).json(["No se encontraron Computadores"]);
    return res.json(allComputers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: error.message});
  }
}

export const updateComputer = async (req, res) => {
  try {
    const computer = await Computer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if(!computer) return res.status(404).json({messasge: "Computador no Encontrado"});

    res.json({computer});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message});

  }
};

export const deleteComputer = async (req, res) => {
  try {
    const computerDelete = await Computer.findByIdAndDelete(req.params.id);
    if(!computerDelete) return res.status("404").json({message: "Computer not found"});
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
}