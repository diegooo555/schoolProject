import { deleteComputerRequest } from "../api/computer.js"
import PropTypes from 'prop-types'

function DeleteComputer({setModal, refresh, id, code}) {

    const deleteComputer = async (id) => {
        try {
            const res = await deleteComputerRequest(id);
            if(res.status === 204){
                refresh();
            }
            setModal([false, false]);
        } catch (error) {
            console.log(error);
            setModal([false, false]);
        }
    }
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-30 flex justify-center items-center">
        
        <div className="flex flex-col p-3 w-[50%] min-h-[60%] bg-white rounded-md justify-center items-center">
            <span className="text-2xl font-bold text-orange-400">{`¿Seguro desea eliminar el equipo con código ${code}`}</span>
            <div className="flex w-[60%] justify-around items-center">
                <button className="p-3 rounded-md bg-green-500" onClick={() => deleteComputer(id)}>Aceptar</button>
                <button className="p-3 rounded-md bg-red-500" onClick={() => setModal([false, false])}>Cancelar</button>
            </div>
        </div>
    </div>
  )
}

DeleteComputer.propTypes = {
    setModal: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
}

export default DeleteComputer