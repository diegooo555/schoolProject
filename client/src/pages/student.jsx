import FormCreateStudent from "../components/FormCreateStudent";
import FormUpdateStudent from "../components/FormUpdateStudent";
import FormDeleteStudent from "../components/FormDeleteStudent";
import { getStudents } from "../api/student.js";
import { useState, useEffect } from "react";

function Student() {
  const [students, setStudents] = useState([]);

  const getAllStudents = async () => {
    try {
      const studentsRequest = await getStudents();
      setStudents(studentsRequest.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);
  return (
    <div className="w-full">
      <div className="p-4 flex justify-between max-md:flex-col overflow-hidden">
        <FormCreateStudent refreshStudents={getAllStudents} />
        <FormUpdateStudent refreshStudents={getAllStudents} />
      </div>
      <FormDeleteStudent refreshStudents={getAllStudents} />

      {students.length > 0 && (
        <table className="table w-full mt-10">

          <caption className="text-2xl font-bold text-blue-600 p-4">Tabla Completa Estudiantes</caption>

          <thead>
            <tr>
              <th className=" py-2 bg-green-400 boder-solid border border-blue-500 text-white font-bold">Nombre</th>
              <th className=" py-2 bg-green-400 boder-solid border border-blue-500 text-white font-bold">Curso</th>
              <th className=" py-2 bg-green-400 boder-solid border border-blue-500 text-white font-bold">Documento</th>
              <th className=" py-2 bg-green-400 boder-solid border border-blue-500 text-white font-bold max-sm:hidden">Celular</th>
            </tr>
          </thead>

          <tbody className="w-full">

            {students.map((student, index) => (
              <tr key={index} className="bg-yellow-200">
                <td className="w-[30%] py-2 border-collapse border-blue-500 border text-center text-orange-400 font-bold">{student.name}</td>
                <td className="w-[10%] py-2 border-collapse border-blue-500 border text-center text-orange-400 font-bold">{student.curse}</td>
                <td className="w-[30%] py-2 border-collapse border-blue-500 border text-center text-orange-400 font-bold">{student.document}</td>
                <td className="w-[30%] py-2 border-collapse border-blue-500 border text-center text-orange-400 font-bold max-sm:hidden">{student.cel}</td>
              </tr>
            ))}

          </tbody>
        </table>
      )}
    </div>
  );
}

export default Student;
