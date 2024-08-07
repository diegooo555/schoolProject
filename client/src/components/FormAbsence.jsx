import { useForm } from "react-hook-form";
import { createAbsenceRequest } from "../api/absence.js";
import { useState } from "react";
import PropTypes from "prop-types";

function FormAbsence({ student, setStudent }) {
  const { register, handleSubmit } = useForm();

  const [createSuccess, setCreateSuccess] = useState({
    show: false,
    state: false,
  });

  const [dateInput, setDateInput] = useState("")

  const onSubmitCreateInasistence = handleSubmit(async (values) => {
    const formatValues = values
    formatValues.student = student.id;
    formatValues.curse = student.curse;
    formatValues.name = student.name;
    try {
      console.log(formatValues)
      const res = await createAbsenceRequest(values);
      console.log(res);
      if (res.status === 200) {
        setCreateSuccess({
          show: true,
          state: true,
        });
      } else {
        setCreateSuccess({
          show: true,
          state: false,
        });
      }

      setDateInput("")

      const timer = setTimeout(() => {
        setCreateSuccess({ show: false, state: false });
        setStudent(null)
      }, 3000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.log(error);
      setCreateSuccess({
        show: true,
        state: false,
      });
      
      setDateInput("")

      const timer = setTimeout(() => {
        setCreateSuccess({ show: false, state: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  });
  return (
    <>
      <form
        onSubmit={onSubmitCreateInasistence}
        className="border-blue-500 border-solid border w-[49%] rounded-md p-3
    bg-purple-100 max-md:flex-col max-md:w-full max-md:mb-2"
      >
        <fieldset className="flex w-full justify-center items-center p-2">
          <img src="/timer.png" alt="" width={"80px"} />
          <h1 className="text-blue-500 text-3xl font-bold">
            CREAR INASISTENCIA
          </h1>
        </fieldset>

        <fieldset className="w-full flex flex-col justify-center items-center gap-1">
          <img src="/being-late.png" alt="" width={"100px"} />
          <div className="text-blue-500 font-bold p-1 text-xl">
            Datos del Estudiante:{" "}
          </div>
          <p className="text-red-600">
            <span className="text-blue-600 font-bold">Nombre: </span>
            {student === null ? "--------------" : student.name}{" "}
          </p>
          <p className="text-red-600">
            <span className="text-blue-600 font-bold">Curso: </span>
            {student === null ? "--------------" : student.curse}{" "}
          </p>
          <label htmlFor="date" className="text-blue-500 font-bold p-2 text-xl">
            Fecha y Hora:
          </label>
          <input
            type="datetime-local"
            id="date"
            className="outline-none border-solid border-2 border-blue-400
       rounded-md text-center h-10 p-3"
            {...register("date")}
            required
            value={dateInput}
            onChange={(e) =>
              setDateInput(e.target.value)
            }
          />

          <button className="flex bg-green-400 p-3 justify-center items-center gap-3 rounded-md">
            <img src="/save.png" alt="" width={"30px"} />
            <span className="text-lg font-bold text-white">Guardar</span>
          </button>
        </fieldset>
      </form>

      <div
        className={`bg-transparent w-screen h-screen fixed self-center top-0 left-0 transition-all duration-700 ease-in ${
          createSuccess.show ? "inline" : "hidden"
        }`}
      >
        <div className="flex w-full h-full justify-center items-end">
          <span
            className={`${
              createSuccess.state ? "bg-green-400" : "bg-red-400"
            } w-80 text-center p-5 rounded-md mb-9 text-white font-bold text-xl`}
          >
            {createSuccess.state ? "Creado Exitosamente" : "Error al crear"}
          </span>
        </div>
      </div>
    </>
  );
}

export default FormAbsence;

FormAbsence.propTypes = {
  student: PropTypes.any,
  setStudent: PropTypes.func,
};
