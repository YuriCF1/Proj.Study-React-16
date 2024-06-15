import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi"

import { Link } from "react-router-dom"

import styles from "./NavBarStyles.module.css"

const NavBar = () => {
  return (
    <nav className={styles.container} id="navbar">
      <h2>
        <Link to="/"><BiCameraMovie /></Link>
      </h2>
      <form action="">
        <input type="text" placeholder="Search a movie" name="" id="" />
        <button type="submit">
          <BiSearchAlt2 />
        </button>
      </form>
    </nav>
  )
}

export default NavBar