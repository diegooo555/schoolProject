import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { getStudentRequest } from "../api/student.js";
import { useState } from "react";

function FormStudent({ setStudent }) {
  const { register, handleSubmit } = useForm();

  const [createSuccess, setCreateSuccess] = useState({
    show: false,
    state: false,
  });

  const getStudent = async (document) => {
    try {
      const res = await getStudentRequest(document);
      console.log(res);
      console.log(res);
    
      if (res.status === 200) {
        setCreateSuccess({
          show: true,
          state: true,
        });
        setStudent(res.data);
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
  };

  const onSubmitSearch = handleSubmit(async (values) => {
    await getStudent(values);
  });

  return (
    <>
    <form
      className="border-blue-500 border-solid border w-[49%] rounded-md p-3
    bg-orange-100 max-md:flex-col max-md:w-full max-md:mb-2 flex justify-center 
    items-center flex-col"
      onSubmit={onSubmitSearch}
    >
      <fieldset className="flex w-full justify-center items-center p-2">
        <img src="/student.png" alt="" width={"80px"} />
        <h1 className="text-red-500 text-3xl font-bold">BUSCAR ESTUDIANTE</h1>
      </fieldset>

      <fieldset className="w-full flex flex-col justify-center items-center gap-2">
        <img src="/id-card.png" alt="" width={"80px"} />
        <label
          htmlFor="document"
          className="text-red-500 font-bold p-2 text-xl"
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

        <button className="flex bg-green-400 p-3 justify-center items-center gap-3 rounded-md">
          <img src="/search.png" alt="" width={"30px"} />
          <span className="text-lg font-bold text-white">
            Buscar Estudiante
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
            {createSuccess.state ? "Estudiante Encontrado" : "Estudiante Inexistente"}
          </span>
        </div>
      </div>
    </>
  );
}

export default FormStudent;

FormStudent.propTypes = {
  setStudent: PropTypes.func.isRequired,
};
