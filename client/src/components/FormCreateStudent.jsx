import { useForm } from "react-hook-form";
import { createStudentRequest } from "../api/student.js";
import { useState } from "react";
import Proptypes from 'prop-types'

function FormCreateStudent({refreshStudents}) {
  const { register, handleSubmit } = useForm();

  const [createSuccess, setCreateSuccess] = useState({
    show: false,
    state: false,
  });

  const onSubmitCreateStudent = handleSubmit(async (values) => {
    try {
      const res = await createStudentRequest(values);
      console.log(res);
      if (res.status === 200) {
        setCreateSuccess({
          show: true,
          state: true,
        });
        refreshStudents();
      } else {
        setCreateSuccess({
          show: true,
          state: false,
        });
      }

      const timer = setTimeout(() => {
        setCreateSuccess({ show: false, state: false });
      }, 3000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.log(error);
      setCreateSuccess({
        show: true,
        state: false,
      });
      const timer = setTimeout(() => {
        setCreateSuccess({ show: false, state: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  });

  return (
    <>
      <form
        className="border-blue-500 border-solid border w-[49%] rounded-md p-3
    bg-blue-100 max-md:flex-col max-md:w-full max-md:mb-2 flex justify-center 
    items-center flex-col"
        onSubmit={onSubmitCreateStudent}
      >
        <fieldset className="flex w-full justify-center items-center p-2">
          <img src="/plus.png" alt="" width={"60px"} className="p-3" />
          <h1 className="text-blue-500 text-3xl font-bold">CREAR ESTUDIANTE</h1>
        </fieldset>

        <fieldset className="w-full flex flex-col justify-center items-center gap-2">
          <img src="/student.png" alt="" width={"80px"} />
          <label htmlFor="name" className="text-blue-500 font-bold p-2 text-xl">
            Nombre del Estudiante:
          </label>

          <input
            type="text"
            id="name"
            {...register("name")}
            placeholder="Nombre del Estudiante"
            className="border-solid border-2 border-blue-400
       rounded-md p-2 text-center w-max"
            required
          />

          <label htmlFor="name" className="text-blue-500 font-bold p-2 text-xl">
            Curso del Estudiante:
          </label>

          <input
            type="text"
            id="curse"
            {...register("curse")}
            placeholder="Curso del Estudiante"
            className="border-solid border-2 border-blue-400
       rounded-md p-2 text-center w-max"
            required
          />
          <label
            htmlFor="document"
            className="text-blue-500 font-bold p-2 text-xl"
          >
            Número de Documento del Estudiante:
          </label>

          <input
            type="number"
            id="document"
            {...register("document")}
            placeholder="Número de Documento"
            className="border-solid border-2 border-blue-400
       rounded-md p-2 text-center w-max"
            required
          />

          <label htmlFor="cel" className="text-blue-500 font-bold p-2 text-xl">
            Celular del Estudiante:
          </label>

          <input
            type="number"
            id="cel"
            {...register("cel")}
            placeholder="Celular del Estudiante"
            className="border-solid border-2 border-blue-400
       rounded-md p-2 text-center w-max"
            required
          />

          <button className="flex bg-green-400 p-3 justify-center items-center gap-3 rounded-md">
            <img src="/plus.png" alt="" width={"30px"} />
            <span className="text-lg font-bold text-white">
              Crear Estudiante
            </span>
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

FormCreateStudent.propTypes = {
  refreshStudents: Proptypes.func.isRequired,
};

export default FormCreateStudent;

