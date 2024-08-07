import { useState } from "react";
import { deleteStudentRequest } from "../api/student";
import SearchStudent from "./SearchStudent";
import Proptypes from "prop-types";

function FormDeleteStudent({ refreshStudents }) {
  const [student, setStudent] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState({
    show: false,
    state: false,
    deleted: true,
  });
  const [findStudent, setFindStudent] = useState(false);

  const deleteStudent = async (document) => {
    try {
      if (!deleteSuccess || (student == null) || !findStudent) return;
      const res = await deleteStudentRequest(document);
      if (res.status === 204) {
        console.log("Tarea eliminada con exito");
        setDeleteSuccess({
          show: true,
          state: true,
          deleted: true,
        });
        setStudent(null);
        refreshStudents();
        setFindStudent(false);
      } else {
        setDeleteSuccess({
          show: true,
          state: false,
          deleted: false,
        });
      }
      const timer = setTimeout(() => {
        setDeleteSuccess({
          show: false,
          state: false,
          deleted: res.status === 204 ? true : false,
        });
      }, 3000);
      return () => clearTimeout(timer);

    } catch (error) {

      console.log(error);
      const timer = setTimeout(() => {
        setDeleteSuccess({ show: false, state: false, deleted: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  };
  return (
    <>
      <div className="flex max-md:flex-col bg-red-200 p-2 m-3 rounded-md">
        <SearchStudent
          setStudent={setStudent}
          title="Eliminar Estudiante"
          urlImg="/delete.png"
          setFindStudent={setFindStudent}
        />
        <div
          className="w-full rounded-md p-3
     max-md:flex-col max-md:w-full max-md:mb-2"
        >
          <div className="w-full flex flex-col justify-center items-center gap-1">
            <div className="text-orange-400 font-bold p-1 text-3xl">
              Datos del Estudiante:
            </div>
            <p className="text-red-600 text-xl font-bold">
              <span className="text-orange-400 font-bold text-xl">
                Nombre:{" "}
              </span>
              {student === null ? "No encontrado" : student.name}{" "}
            </p>
            <p className="text-red-600 text-xl font-bold">
              <span className="text-orange-400 font-bold text-xl">Curso: </span>
              {student === null ? "No encontrado" : student.curse}{" "}
            </p>

            <p className="text-red-600 text-xl font-bold">
              <span className="text-orange-400 font-bold text-xl">
                Celular:{" "}
              </span>
              {student === null ? "No encontrado" : student.cel}{" "}
            </p>
            <div
              htmlFor="date"
              className="text-orange-400 font-bold p-2 text-xl"
            >
              ¿Seguro desesas eliminarlo?
            </div>
            <button
              className="flex bg-red-400 p-5 justify-center items-center gap-3 rounded-md"
              onClick={async () => {student ? await deleteStudent(student.document) : console.log("Estudiante no encontrado")}}
            >
              <img src="/delete.png" alt="" width={"30px"} />
              <span className="text-2xl font-bold text-white">Eliminar</span>
            </button>
          </div>
        </div>
      </div>
      {deleteSuccess.show && (
        <div className="bg-transparent w-screen h-screen fixed self-center top-0 left-0 transition-all duration-700 ease-in">
          <div className="flex w-full h-full justify-center items-end">
            <span
              className={`${
                deleteSuccess.state ? "bg-green-400" : "bg-red-400"
              } w-80 text-center p-5 rounded-md mb-9 text-white font-bold text-xl`}
            >
              {deleteSuccess.state
                ? "Eliminado Exitosamente"
                : "Error al Eliminar"}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default FormDeleteStudent;

FormDeleteStudent.propTypes = {
  refreshStudents: Proptypes.func.isRequired,
};
