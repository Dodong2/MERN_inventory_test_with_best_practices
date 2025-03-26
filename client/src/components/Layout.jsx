import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

const Layout = () => {
    const location = useLocation()

  return (
    <div className="flex">
        <Sidebar/>
        <div className="flex-1 p-5">
            <Outlet/>
            <Navbar location={location}/>
        </div>
    </div>
  )
}

export default Layout