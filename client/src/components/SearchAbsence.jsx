import { useForm } from "react-hook-form";
import { getAbsencesByCourseRequest } from "../api/absence.js";
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

function SearchAbsence() {
  const { register, handleSubmit } = useForm();

  const [ absences, setAbsences ] = useState([]);

  const onSubmitSearch = handleSubmit(async (values) => {
    try {
      const res = await getAbsencesByCourseRequest(values.curse);
      setAbsences(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
      setAbsences([])
    }
  });

  const convertToCSV = (students) => {
    const header = "Nombre,Curso,Fecha\n";
    const rows = students.map(student => 
      `${student.name},${student.curse},${student.date}`
    ).join("\n");

    return header + rows;
  };

  const downloadCSV = (students) => {
    const csv = convertToCSV(students);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'students_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            Buscar Inasistencia por Curso:
          </h1>
        </fieldset>

        <fieldset className="w-full flex flex-col justify-center items-center gap-2">
          <img src="/course.png" alt="" width={"80px"} />
          <label
            htmlFor="curse"
            className="text-orange-500 font-bold p-2 text-xl"
          >
            Curso:
          </label>

          <input
            type="text"
            id="curse"
            {...register("curse")}
            placeholder="Curso"
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

        {absences.length > 0 && (
          <button className="bg-green-400 mt-3 p-1 rounded-md text-white text-xl font-extrabold flex justify-center items-center"
          onClick={() => downloadCSV(absences)}>
            <img src="/download.png" alt="download" width={"50px"}/>
            Descargar
          </button>)}
      </div>
    </>
  );
}

export default SearchAbsence;
