function Nav() {
  return (
    <nav className="w-full flex justify-around items-center p-4 bg-yellow-100 max-md:hidden">
        <a href="/" className="itim-regular font-bold">
            <img src="/school.png" alt="" width={"50px"} className="hover:scale-110"/>
        </a>
        <a  href="/" className="itim-regular font-bold text-orange-500 text-2xl hover:scale-110">Inicio</a>
        <a  href="/students" className="itim-regular font-bold text-orange-500 text-2xl hover:scale-110">Estudiantes</a>
        <a  href="/asistence" className="itim-regular font-bold text-orange-500 text-2xl hover:scale-110">Asistencia</a>
        <a  href="/computers" className="itim-regular font-bold text-orange-500 text-2xl hover:scale-110">Computadores</a>

    </nav>
  )
}

export default Nav