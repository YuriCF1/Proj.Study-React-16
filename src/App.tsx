import { Outlet } from 'react-router-dom'
import './App.css'

import NavBar from "./Components/NavBar.jsx"

function App() {
  return (
    <div>
      <NavBar />
      <h2>THIS IS CINEMA</h2>
      <Outlet></Outlet>
    </div>
  )
}

export default App
