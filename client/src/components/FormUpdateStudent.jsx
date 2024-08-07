import { useForm } from "react-hook-form";
import { updateStudentRequest } from "../api/student.js";
import SearchStudent from "./SearchStudent.jsx";
import { useState } from "react";
import Proptypes from "prop-types";

function FormUpdateStudent({ refreshStudents }) {
  const [student, setStudent] = useState({
    name: '',
    curse: '',
    document: '',
    cel: ''
  });
  const [findStudent, setFindStudent] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState({
    show: false,
    state: false,
  });

  const { register, handleSubmit } = useForm();

  const showMessage = (showBoolean, stateBoolean) => {
    setUpdateSuccess({
      show: showBoolean,
      state: stateBoolean,
    });

    const timer = setTimeout(() => {
      setUpdateSuccess({ show: false, state: false });
    }, 3000);
    return () => clearTimeout(timer);
  }

  const clearForm = () => {
    setStudent({
      name: '',
      curse: '',
      document: '',
      cel: ''
    });
  }

  const updateStudent = async (id, studentNew) => {
    try {
      if (!findStudent) {
        showMessage(true, false);
        return;
      }
      
      const res = await updateStudentRequest(id, studentNew);
      if (res.status === 200) {
        showMessage(true, true);
        refreshStudents();
      } else {
        showMessage(true, false);
      }

      setFindStudent(false);
      console.log(res);

    } catch (error) {
      console.log(error);
      showMessage(true, false);
    }
  };

  const onSubmitUpdate = handleSubmit(async (data) => {
        const formatData = data;
        formatData.name = student.name;
        formatData.curse = student.curse;
        formatData.document = student.document;
        formatData.cel = student.cel;
        await updateStudent(student.id, formatData);
        clearForm();
      })

  return (
    <div
      className="flex flex-col w-[49%] max-md:w-full bg-green-100
     border-blue-500  border-solid border rounded-md"
    >
      <SearchStudent
        setStudent={setStudent}
        title={"Actualizar Estudiante"}
        urlImg={"/sync.png"}
        setFindStudent={setFindStudent}
      />
      <form
        className="w-full p-3 max-md:flex-col max-md:w-full max-md:mb-2       
        flex justify-centeritems-center flex-col"
        onSubmit={onSubmitUpdate}
      >
        <fieldset className="w-full flex flex-col justify-center items-center gap-1">
          <div className="text-orange-500 font-bold p-1 text-2xl">
            Datos del Estudiante:
          </div>

          <label
            htmlFor="name"
            className="text-green-500 font-bold p-2 text-xl"
          >
            Nombre del Estudiante:
          </label>

          <input
            type="text"
            id="name"
            value={student.name}
            {...register("name")}
            placeholder="Nombre del Estudiante"
            className={`border-solid border-2 border-blue-400
       rounded-md p-2 text-center w-max ${
         findStudent ? "cursor-pointer" : "cursor-not-allowed"
       }`}
            required
            onChange={(e) =>
              setStudent((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <label
            htmlFor="name"
            className="text-green-500 font-bold p-2 text-xl"
          >
            Curso del Estudiante:
          </label>

          <input
            type="text"
            id="curse"
            value={student.curse}
            {...register("curse")}
            placeholder="Curso del Estudiante"
            className={`border-solid border-2 border-blue-400
        rounded-md p-2 text-center w-max ${
          findStudent ? "cursor-pointer" : "cursor-not-allowed"
        }`}
            required
            onChange={(e) =>
              setStudent((prev) => ({ ...prev, curse: e.target.value }))
            }
          />

          <label htmlFor="cel" className="text-green-500 font-bold p-2 text-xl">
            Documento del Estudiante:
          </label>

          <input
            type="number"
            id="document"
            value={student.document}
            {...register("document")}
            placeholder="Documento del Estudiante"
            className={`border-solid border-2 border-blue-400
       rounded-md p-2 text-center w-max ${
         findStudent ? "cursor-pointer" : "cursor-not-allowed"
       }`}
            required
            onChange={(e) =>
              setStudent((prev) => ({ ...prev, document: e.target.value }))
            }
          />

          <label htmlFor="cel" className="text-green-500 font-bold p-2 text-xl">
            Celular del Estudiante:
          </label>

          <input
            type="number"
            id="cel"
            value={student.cel}
            {...register("cel")}
            placeholder="Celular del Estudiante"
            className={`border-solid border-2 border-blue-400
       rounded-md p-2 text-center w-max ${
         findStudent ? "cursor-pointer" : "cursor-not-allowed"
       }`}
            required
            onChange={(e) =>
              setStudent((prev) => ({ ...prev, cel: e.target.value }))
            }
          />

          <button
            className="flex bg-green-400 p-3 justify-center items-center gap-3 rounded-md"
            type="submit"
          >
            <img src="/sync.png" alt="" width={"30px"} />
            <span className="text-lg font-bold text-white">Actualizar</span>
          </button>
        </fieldset>
      </form>

      {updateSuccess.show && (
        <div className="bg-transparent w-screen h-screen fixed self-center top-0 left-0 transition-all duration-700 ease-in">
          <div className="flex w-full h-full justify-center items-end">
            <span
              className={`${
                updateSuccess.state ? "bg-green-400" : "bg-red-400"
              } w-80 text-center p-5 rounded-md mb-9 text-white font-bold text-xl`}
            >
              {updateSuccess.state
                ? "Actualizado Exitosamente"
                : "Error al Actualizar"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}


FormUpdateStudent.propTypes = {
  refreshStudents: Proptypes.func.isRequired,
};
export default FormUpdateStudent;
