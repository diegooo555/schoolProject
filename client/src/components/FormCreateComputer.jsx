import { useForm } from "react-hook-form";
import { createComputerRequest } from "../api/computer.js";
import { useState } from "react";
import PropTypes from 'prop-types';

function FormCreateComputer({refresh}) {
  const { register, handleSubmit } = useForm();

  const [createSuccess, setCreateSuccess] = useState({
    show: false,
    state: false,
  });

  const onSubmitCreateStudent = handleSubmit(async (values) => {
    try {
      const res = await createComputerRequest(values);
      console.log(res);
      if (res.status === 200) {
        setCreateSuccess({
          show: true,
          state: true,
        });
        refresh();
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
          <h1 className="text-blue-500 text-3xl font-bold">CREAR COMPUTADOR</h1>
        </fieldset>

        <fieldset className="w-full flex flex-col justify-center items-center gap-2">
          <img src="/pc.png" alt="" width={"80px"} />
          <label htmlFor="code" className="text-blue-500 font-bold p-2 text-xl">
            Código del Computador:
          </label>

          <input
            type="text"
            id="code"
            {...register("code")}
            placeholder="Código"
            className="border-solid border-2 border-blue-400
         rounded-md p-2 text-center w-max"
            required
          />

          <label
            htmlFor="placeDetail"
            className="text-blue-500 font-bold p-2 text-xl"
          >
            Lugar y detalle:
          </label>

          <textarea
            name="placeDetail"
            id="placeDetail"
            className="outline-none border-[gray] border rounded-md p-2"
            {...register("placeDetail")}
            required
          />
          <label htmlFor="hall" className="text-blue-500 font-bold p-2 text-xl">
            Sala del Equipo:
          </label>

          <input
            type="text"
            id="hall"
            {...register("hall")}
            placeholder="Sala"
            className="border-solid border-2 border-blue-400
         rounded-md p-2 text-center w-max"
            required
          />

          <label
            htmlFor="description"
            className="text-blue-500 font-bold p-2 text-xl"
          >
            Descripción y especificaciones
          </label>

          <textarea
            name="description"
            id="description"
            className="outline-none border-[gray] border rounded-md p-2"
            {...register("description")}
            required
          />

          <label
            htmlFor="lastModification"
            className="text-blue-500 font-bold p-2 text-xl"
          >
            Fecha Modificación:
          </label>
          <input
            type="datetime-local"
            id="lastModification"
            className="outline-none border-solid border-2 border-blue-400
            rounded-md text-center h-10 p-3"
            {...register("lastModification")}
            required
          />

          <label htmlFor="mandated" className="text-blue-500 font-bold p-2 text-xl">
            Encargado:
          </label>

          <input
            type="text"
            id="mandated"
            {...register("mandated")}
            placeholder="Nombre Encargado"
            className="border-solid border-2 border-blue-400
         rounded-md p-2 text-center w-max"
            required
          />

          <button className="flex bg-green-400 p-3 justify-center items-center gap-3 rounded-md">
            <img src="/plus.png" alt="" width={"30px"} />
            <span className="text-lg font-bold text-white">
              Crear Computador
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

FormCreateComputer.propTypes = {
  refresh: PropTypes.func.isRequired,
}

export default FormCreateComputer;
