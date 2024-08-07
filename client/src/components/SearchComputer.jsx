import { getComputerByCodeRequest } from "../api/computer.js";
import { useForm } from "react-hook-form";
import Proptypes from 'prop-types'

function SearchComputer({setComputer, setFindComputer}) {
    const { register, handleSubmit } = useForm();
    
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
    
    const onSubmitSearch = handleSubmit(async (values) => {
        await getComputer(values.code);
    })

  return (
    <form
    className="w-full  p-3
    max-md:flex-col max-md:w-full max-md:mb-2 flex justify-center 
    items-center flex-col"
    onSubmit={onSubmitSearch}
  >
    <fieldset className="flex w-full justify-center items-center p-2">
      <img src="/sync.png" alt="" width={"60px"} className="p-3" />
      <h1 className="text-purple-500 text-3xl font-bold text-center">
        ACTUALIZAR COMPUTADOR
      </h1>
    </fieldset>

    <fieldset className="w-full flex flex-col justify-center items-center gap-2">
      <img src="/cloud-server.png" alt="" width={"80px"} />
      <label htmlFor="code" className="text-purple-500 font-bold p-2 text-xl">
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
      <button className="flex bg-green-400 p-3 justify-center items-center gap-3 rounded-md">
        <img src="/search.png" alt="" width={"30px"} />
        <span className="text-lg font-bold text-white">Buscar Equipo</span>
      </button>
    </fieldset>
  </form>
  )
}

SearchComputer.propTypes = {
    setComputer: Proptypes.func.isRequired,
    setFindComputer: Proptypes.func.isRequired,
} 

export default SearchComputer