import { Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/HomePage"
import { MapPage } from "../pages/MapPage"

export const GlobalRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/puntosdereciclaje" element={<MapPage/>}/>
    </Routes>
  )
}
