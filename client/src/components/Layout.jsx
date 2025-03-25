import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

const Layout = () => {
    const location = useLocation()

  return (
    <div style={{ display: "flex" }}>
        <Sidebar/>
        <div style={{ flex: 1, padding: '20px' }}>
            <Outlet/>
            <Navbar location={location}/>
        </div>
    </div>
  )
}

export default Layout