import FormCreateComputer from "../components/FormCreateComputer"
import ComputerByCode from "../components/ComputerByCode"
import Hall from "../components/Hall.jsx"
import { getAllComputersRequest } from "../api/computer.js"
import { useState, useEffect } from "react"
import FormUpdateComputer from "../components/FormUpdateComputer.jsx"


function ComputersPage() {

  const [allComputers, setAllComputers] = useState({})
  const classifyByHall =  (allComputers) => {
    return allComputers.reduce((classify, object) => {
      const { hall } = object;
  
      // Si la sala aún no existe en el objeto clasificado, crea un nuevo array para ella
      if (!classify[hall]) {
        classify[hall] = [];
      }
  
      classify[hall].push(object);
  
      return classify;
    }, {});
  }
  
  

  const sortComputers = (computersClassify) => {
    const keys = Object.keys(computersClassify);
    for (let hall = 0; hall < keys.length; hall++) {
      const objectHall = computersClassify[keys[hall]];
      const sortedHall = objectHall.sort((a, b) => {
        if(a.code < b.code){
          return -1;
        }else{
          if(a.code > b.code){
            return 1;
          }else{
            return 0;
          }
        }
      })

      computersClassify[keys[hall]] = sortedHall;
      
    }
  }

  const sortByKeysComputers = (computersClassify) => {
    const entries = Object.entries(computersClassify);

    // Ordenar las entradas por sus claves (númericas en este caso)
    entries.sort((a, b) => a[0] - b[0]);
  
    // Convertir el array ordenado de nuevo a un objeto
    const sortedObject = Object.fromEntries(entries);

    return sortedObject;
  }

  const getAllComputersAndSorted = async () => {
    try {
      const computersRequest = await getAllComputersRequest();
      const computersClassify = classifyByHall(computersRequest.data);
      sortComputers(computersClassify);

      const sortByHallComputers = sortByKeysComputers(computersClassify);
      setAllComputers(sortByHallComputers);
      console.log(sortByHallComputers)


    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllComputersAndSorted();
  }, [])

  return (

    <div className="w-full">
      <div className="p-4 flex justify-between max-md:flex-col overflow-hidden">
        <FormCreateComputer refresh={getAllComputersAndSorted}/>
        <ComputerByCode/>
        
      </div>

      {Object.keys(allComputers).length > 0 && 
      (
        <div>
          {Object.keys(allComputers).map((keyHall, index) => (
            <Hall computers={allComputers[keyHall]} hall={`${keyHall}`} key={index} refresh={getAllComputersAndSorted}/>
          ))}
        </div>
      )}

      <FormUpdateComputer refresh={getAllComputersAndSorted} />
      
    </div>
  )
}

export default ComputersPage