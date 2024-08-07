import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { getStudentRequest } from "../api/student.js";

function SearchStudent({ setStudent, setFindStudent, title, urlImg }) {
  const { register, handleSubmit } = useForm();

  const getStudent = async (document) => {
    console.log(document);
    try {
      const res = await getStudentRequest(document);
      console.log(res);
      if(res.status === 200){
        setFindStudent(true)
        setStudent(res.data)
      }else{
        setStudent({
          name: '',
          curse: '',
          document: '',
          cel: ''
        })
      }

    } catch (error) {
      console.log(error);
      setStudent({
        name: '',
        curse: '',
        document: '',
        cel: ''
      })
    }
  };

  const onSubmitSearch = handleSubmit(async (values) => {
    await getStudent(values);
  });

  return (
    <form
      className="w-full p-3
     max-md:flex-col max-md:w-full max-md:mb-2 flex justify-center 
    items-center flex-col"
      onSubmit={onSubmitSearch}
    >
      <fieldset className="flex w-full justify-center items-center p-2">
        <img src={urlImg} alt="" width={"80px"} />
        <h1 className="text-orange-500 text-3xl font-bold">
          {title}
        </h1>
      </fieldset>

      <fieldset className="w-full flex flex-col justify-center items-center gap-2">
        <img src="/id-card.png" alt="" width={"80px"} />
        <label
          htmlFor="document"
          className="text-orange-500 font-bold p-2 text-xl"
        >
          Número de Documento del Estudiante:
        </label>

        <input
          type="number"
          id="document"
          {...register("document")}
          placeholder="Número de Documento"
          className="border-solid border-2 border-blue-400
          rounded-md p-2 text-center w-max"
          required
        />

        <button className="flex bg-green-400 p-3 justify-center items-center gap-3 rounded-md" type="submit">
          <img src="/search.png" alt="" width={"30px"} />
          <span className="text-lg font-bold text-white">
            Buscar Estudiante
          </span>
        </button>
      </fieldset>
    </form>
  );
}

SearchStudent.propTypes = {
  setStudent: PropTypes.func.isRequired,
  setFindStudent: PropTypes.func,
  title: PropTypes.string.isRequired,
  urlImg: PropTypes.string.isRequired,
};

export default SearchStudent;

