import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi"

import { Link, useNavigate } from "react-router-dom"

import styles from "./NavBarStyles.module.css"
import { useState } from "react"

const NavBar = () => {
  const [search, setSearh] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!search) return //Se não tiver nada no search, não redireciona
    navigate("/search?query=" + search)
    setSearh('')
  }

  return (
    <nav className={styles.container} id="navbar">
      <h2>
        <Link to="/"><BiCameraMovie /></Link>
      </h2>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="Search">Search</label>
        <input type="text" placeholder="a movie" name="Search" id="Search" onChange={(e) => setSearh(e.target.value)} value={search} />
        <button type="submit">
          <BiSearchAlt2 />
        </button>
      </form>
    </nav>
  )
}

export default NavBar