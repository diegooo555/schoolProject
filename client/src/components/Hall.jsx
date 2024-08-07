import PropTypes from 'prop-types';
import Computer from './Computer';

function Hall({hall, computers, refresh}) {
  console.log(computers)
  return (
    <div className='flex flex-col gap-3 p-3 bg-yellow-100 m-3 rounded-md'>
      <h2 className='text-center text-orange-400 text-xl font-bold'>{`Sala ${hall}`}</h2>
      {computers.map((computer, index) => (
        <Computer key={index} infoComputer={computer} refresh={refresh}/>
      ))}
    </div>
  )
}

Hall.propTypes = {
    hall: PropTypes.string.isRequired,
    computers: PropTypes.array.isRequired,
    refresh: PropTypes.func.isRequired,
}

export default Hall