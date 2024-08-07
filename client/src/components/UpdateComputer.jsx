import { useForm } from "react-hook-form";
import { updateComputerRequest } from "../api/computer.js";
import PropTypes from 'prop-types';
import { getComputerByCodeRequest } from "../api/computer.js";
import { useState, useEffect } from "react";

function UpdateComputer({refresh, code, setModal}) {
  const { register, handleSubmit } = useForm();

  const [computer, setComputer] = useState({
    code: "",
    placeDetail: "",
    hall: "",
    description: "",
    lastModification: "",
    mandated: "",
  });

  const [updateSuccess, setUpdateSuccess] = useState({
    show: false,
    state: false,
  });

  const showMessage = (showBoolean, stateBoolean) => {
    setUpdateSuccess({
      show: showBoolean,
      state: stateBoolean,
    });

    const timer = setTimeout(() => {
      setUpdateSuccess({ show: false, state: false });
    }, 3000);
    return () => clearTimeout(timer);
  };

  const clearForm = () => {
    setComputer({
      code: "",
      placeDetail: "",
      hall: "",
      description: "",
      lastModification: "",
      mandated: ""
    });
  };

  const getComputer = async (code) => {
    try {
      const res = await getComputerByCodeRequest(code);
        
      console.log(res);
      if(res.status === 200){
        setFindComputer(true);
        setComputer(res.data);
      }else{
        setComputer({
            code: "",
            placeDetail: "",
            hall: "",
            description: "",
            lastModification: "",
            mandated: ""
        })
      }
    } catch (error) {
      console.log(error);
      setComputer({
        code: "",
        placeDetail: "",
        hall: "",
        description: "",
        lastModification: "",
        mandated: "",
      });
    }
  };



  const [findComputer, setFindComputer] = useState(false);

  const updateComputer = async (id, computerNew) => {
    try {
      const res = await updateComputerRequest(id, computerNew);
      if (res.status === 200) {
        showMessage(true, true);
        refresh();
      } else {
        showMessage(true, false);
      }

      setFindComputer(false);
      console.log(res);
    } catch (error) {
      console.log(error);
      showMessage(true, false);
    }
  };

  const onSubmitUpdate = handleSubmit(async (data) => {
    const formatData = data;
    formatData.code = computer.code;
    formatData.placeDetail = computer.placeDetail;
    formatData.hall = computer.hall;
    formatData.description = computer.description;
    formatData.lastModification = computer.lastModification;
    formatData.mandated = computer.mandated;
    await updateComputer(computer._id, formatData);
    clearForm();
  });

  useEffect(() => {
    getComputer(code);
  }, [])

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-30 flex justify-center items-center">

      <form
        className="w-[50%] p-3 max-md:flex-col max-md:w-full max-md:mb-2  h-[95%] overflow-y-scroll    
        flex justify-centeritems-center flex-col border-blue-500 border-solid border rounded-md bg-teal-100"
        onSubmit={onSubmitUpdate}
      >

        <button className="self-end" onClick={() => setModal([false, false])}>
            <img src="/close.png" alt="close" width={"40px"}/>
        </button>

        <fieldset className="w-full flex flex-col justify-center items-center gap-1">
          <div className="text-orange-500 font-bold p-1 text-2xl">
            Datos del Equipo:
          </div>

          <label
            htmlFor="code"
            className="text-green-500 font-bold p-2 text-xl"
          >
            Código:
          </label>

          <input
            type="text"
            id="code"
            value={computer.code}
            {...register("code")}
            placeholder="Código"
            className={`border-solid border-2 border-blue-400
            rounded-md p-2 text-center w-max ${
            findComputer ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            required
            onChange={(e) =>
              setComputer((prev) => ({ ...prev, code: e.target.value }))
            }
          />

          <label
            htmlFor="placeDetail"
            className="text-green-500 font-bold p-2 text-xl"
          >
            Lugar y Detalle:
          </label>

          <textarea
            name="placeDetail"
            id="placeDetail"
            value={computer.placeDetail}
            {...register("placeDetail")}
            placeholder="Lugar y Detalle"
            className={`border-solid border-2 border-blue-400
        rounded-md p-2 text-center w-max min-w-[250px] ${
          findComputer ? "cursor-pointer" : "cursor-not-allowed"
        }`}
            required
            onChange={(e) =>
              setComputer((prev) => ({ ...prev, placeDetail: e.target.value }))
            }
          />

          <label
            htmlFor="hall"
            className="text-green-500 font-bold p-2 text-xl"
          >
            Sala del Equipo:
          </label>

          <input
            type="text"
            id="hall"
            value={computer.hall}
            {...register("hall")}
            placeholder="Sala"
            className={`border-solid border-2 border-blue-400
       rounded-md p-2 text-center w-max ${
         findComputer ? "cursor-pointer" : "cursor-not-allowed"
       }`}
            required
            onChange={(e) =>
              setComputer((prev) => ({ ...prev, hall: e.target.value }))
            }
          />

          <label
            htmlFor="description"
            className="text-green-500 font-bold p-2 text-xl"
          >
            Descripción y especificaciones:
          </label>

          <textarea
            id="description"
            value={computer.description}
            {...register("description")}
            placeholder="Descripción:"
            className={`border-solid border-2 border-blue-400
       rounded-md p-2 text-center w-max ${
         findComputer ? "cursor-pointer" : "cursor-not-allowed"
       }`}
            required
            onChange={(e) =>
              setComputer((prev) => ({ ...prev, description: e.target.value }))
            }
          />

          <label
            htmlFor="lastModification"
            className="text-green-500 font-bold p-2 text-xl"
          >
            Fecha Modificación:
          </label>

          <input
            type="datetime-local"
            id="lastModification"
            value={computer.lastModification}
            {...register("lastModification")}
            placeholder="Fecha Modificación: "
            className={`border-solid border-2 border-blue-400
            rounded-md p-2 text-center w-max ${
              findComputer ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            required
            onChange={(e) =>
              setComputer((prev) => ({
                ...prev,
                lastModification: e.target.value,
              }))
            }
          />

          <label
            htmlFor="mandated"
            className="text-green-500 font-bold p-2 text-xl"
          >
            Encargado:
          </label>

          <input
            type="text"
            id="mandated"
            value={computer.mandated}
            {...register("mandated")}
            placeholder="Encargado: "
            className={`border-solid border-2 border-blue-400
            rounded-md p-2 text-center w-max ${
              findComputer ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            required
            onChange={(e) =>
              setComputer((prev) => ({
                ...prev,
                mandated: e.target.value,
              }))
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

UpdateComputer.propTypes = {
  refresh: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  setModal: PropTypes.func.isRequired,
}

export default UpdateComputer;
