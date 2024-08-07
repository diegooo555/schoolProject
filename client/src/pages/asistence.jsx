import { useState } from 'react'
import FormAbsence from '../components/FormAbsence.jsx'
import FormStudent from '../components/FormStudent.jsx';
import SearchAbsence from '../components/SearchAbsence.jsx';
import AbsenceStudent from '../components/AbsenceStudent.jsx';

function Asistence() {

  const [student, setStudent] = useState(null)

  return (
    <div className="w-full">
      <div className="p-4 flex justify-between max-md:flex-col overflow-hidden">
        
        <FormStudent setStudent={setStudent}/>

        <FormAbsence student={student} setStudent={setStudent}/>
      </div>

      <div className="p-4 flex justify-between max-md:flex-col overflow-hidden w-full bg-green-100 rounded-md">       
        <SearchAbsence/>
      </div>

      <div className="p-4 flex justify-between max-md:flex-col overflow-hidden w-full bg-green-100 rounded-md mt-6">       
        <AbsenceStudent/>
      </div>
    </div>
  );
}

export default Asistence;
