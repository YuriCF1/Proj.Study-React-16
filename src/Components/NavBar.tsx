import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi"

import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <nav id="navbar">
      <h2>
        <Link to="/"><BiCameraMovie /></Link>
      </h2>
      <form action="">
        <input type="text" aria-placeholder="Busque um filme" name="" id="" />
        <button type="submit" value="buscar">
          <BiSearchAlt2 />
        </button>
      </form>
    </nav>
  )
}

export default NavBar