import { useState } from "react";
import { useForm } from "react-hook-form";
import { getComputerByCodeRequest } from "../api/computer.js";


function ComputerByCode() {
    const { register, handleSubmit } = useForm();
    const [computer, setComputer] = useState(null);

    const onSubmitSearch = handleSubmit( async (values) => {
        try {
            const res = await getComputerByCodeRequest(values.code);
            setComputer(res.data);
        } catch (error) {
           console.log(error) 
        }
    })
  return (
    <div className="w-[49%] flex flex-col bg-purple-200 rounded-md max-md:flex-col max-md:w-full border-solid border border-purple-500">
      <form
        className="w-full p-3
        max-md:flex-col max-md:w-full max-md:mb-2 flex justify-center 
        items-center flex-col"
        onSubmit={onSubmitSearch}
      >
        <fieldset className="flex w-full justify-center items-center p-2">
          <img src="/search.png" alt="" width={"80px"} />
          <h1 className="text-orange-500 text-3xl font-bold">
            Buscar Computador por Codigo:
          </h1>
        </fieldset>

        <fieldset className="w-full flex flex-col justify-center items-center gap-2">
        <img src="/gaming.png" alt="" width={"80px"} />
          <label
            htmlFor="code"
            className="text-orange-500 font-bold p-2 text-xl"
          >
            Código:
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

          <button className="flex bg-green-400 p-3 justify-center items-center gap-3 rounded-md">
            <img src="/search.png" alt="" width={"30px"} />
            <span className="text-lg font-bold text-white">
              Buscar Computador
            </span>
          </button>
        </fieldset>
      </form>

      
        <div className="w-full flex flex-col items-center justify-center max-md:w-full">
            <h1 className="w-full text-2xl text-blue-600 font-bold text-center py-5">Información del Equipo de Computo: </h1>
        {computer != null && (
            <>  
                <div className="text-purple-600 font-bold text-xl">Lugar y detalles:</div>
                <div className="font-bold">{computer.placeDetail}</div>
                <div className="text-purple-600 font-bold text-xl">Sala:</div>
                <div className="font-bold">{computer.hall}</div>
                <div className="text-purple-600 font-bold text-xl">Especificaciones:</div>
                <div className="font-bold">{computer.description}</div>
                <div className="text-purple-600 font-bold text-xl">Fecha última modificación:</div>
                <div className="font-bold">{computer.lastModification}</div>
                <div className="text-purple-600 font-bold text-xl">Encargado:</div>
                <div className="font-bold">{computer.mandated}</div>
            </>
        )}
        </div>
      
    </div>
  )
}

export default ComputerByCode