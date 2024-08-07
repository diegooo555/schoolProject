import { useForm } from "react-hook-form";
import { getAbsencesByDocumentRequest } from "../api/absence";
import { useState } from "react";

function getComponesFullDate(date){
    const year = Number(date.substring(0,4))
    const month = Number(date.substring(5,7))
    const day = Number(date.substring(8,10))
    const hourProvicional = Number(date.substring(11,13))
    const hour = hourProvicional > 12 ? hourProvicional - 12 : hourProvicional
    const minutes = Number(date.substring(14,17))
    const amPm = hourProvicional > 12 ? 'pm' : 'am'
    const components = {year, month, day, hour, minutes, amPm}

    return components
}

function AbsenceStudent() {
  const { register, handleSubmit } = useForm();

  const [ absences, setAbsences ] = useState([]);

  const onSubmitSearch = handleSubmit(async (values) => {
    try {
      const res = await getAbsencesByDocumentRequest(values.document);
      setAbsences(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
      setAbsences([])
    }
  });
  return (
    <>
      <form
        className="w-[50%] p-3
   max-md:flex-col max-md:w-full max-md:mb-2 flex justify-center 
  items-center flex-col"
        onSubmit={onSubmitSearch}
      >
        <fieldset className="flex w-full justify-center items-center p-2">
          <img src="/late.png" alt="" width={"80px"} />
          <h1 className="text-orange-500 text-3xl font-bold">
            Buscar Inasistencias Estudiante
          </h1>
        </fieldset>

        <fieldset className="w-full flex flex-col justify-center items-center gap-2">
          <img src="/student.png" alt="" width={"80px"} />
          <label
            htmlFor="document"
            className="text-orange-500 font-bold p-2 text-xl"
          >
            Documento del Estudiante:
          </label>

          <input
            type="number"
            id="document"
            {...register("document")}
            placeholder="Numero de Documento"
            className="border-solid border-2 border-blue-400
     rounded-md p-2 text-center w-max"
            required
          />

          <button className="flex bg-green-400 p-3 justify-center items-center gap-3 rounded-md">
            <img src="/search.png" alt="" width={"30px"} />
            <span className="text-lg font-bold text-white">
              Buscar Inasistencias
            </span>
          </button>
        </fieldset>
      </form>
      <div className="flex flex-col w-[50%] max-md:w-full rounded-md bg-orange-100 p-2">
        <div className="w-full text-center p-2">
            <h2 className="text-blue-500 font-bold text-2xl">Inasistencias Encontradas: </h2>
        </div>
        {absences.length > 0 && (
            absences.map((absence, index) => {
                const {day, month, year, hour, minutes, amPm} = getComponesFullDate(absence.date)
                return(
                <div key={index} className="w-full bg-purple-200 rounded-md p-2 mt-2 flex justify-around">
                    <span className="text-red-600 text lg font-bold">{index + 1}</span>
                    <span className="text-red-600 text lg font-bold">{absence.name}</span>
                    <span className="text-red-600 text lg font-bold">{`${day}/${month}/${year}  ${hour}:${minutes > 9 ? minutes : "0"+minutes} ${amPm}`}</span>
                </div>
                )
            })
        )}
      </div>
    </>
  );
}

export default AbsenceStudent;