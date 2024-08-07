import {useState} from 'react';
import PropTypes from 'prop-types';
import UpdateComputer from './UpdateComputer'
import DeleteComputer from './DeleteComputer';



function Computer({infoComputer, refresh}) {
    const[modal, setModal] = useState([false, false])
    console.log(infoComputer);
  return (
    <>
        <div className='flex flex-col w-full bg-blue-200 items-center p-3 rounded-md cursor-default'>
            <div className='text-2xl font-semibold'><span className='text-red-600 font-bold text-xl'>Código: </span> {infoComputer.code}</div>
            <div className='text-2xl font-semibold'><span className='text-red-600 font-bold text-xl'>Especificaciones: </span> {infoComputer.description}</div>
            <div className='text-2xl font-semibold'><span className='text-red-600 font-bold text-xl'>Descripción: </span> {infoComputer.placeDetail}</div>
            <div className='text-2xl font-semibold'><span className='text-red-600 font-bold text-xl'>Encargado: </span> {infoComputer.mandated}</div>
            <div className='text-2xl font-semibold'><span className='text-red-600 font-bold text-xl'>Fecha Modificación: </span> {infoComputer.lastModification}</div>
            <div className="flex w-[30%] justify-around mt-5">
                <button className='bg-green-500 p-4 text-white font-bold rounded-md' onClick={() => setModal([true, false])}>Modificar</button>
                <button className='bg-red-500 p-4 text-white font-bold rounded-md' onClick={() => setModal([false, true])}>Eliminar</button>
            </div>
        </div>

        {modal[0] === true && (
            <UpdateComputer refresh={refresh} setModal={setModal} code={infoComputer.code}/>
        )}

        {
            modal[1] === true && (
                <DeleteComputer code={infoComputer.code} id={infoComputer._id} refresh={refresh} setModal={setModal}/>
            )
        }

    </>
  )
}

Computer.propTypes = {
    infoComputer: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired,
}

export default Computer