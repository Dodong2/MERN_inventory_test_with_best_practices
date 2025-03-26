/* react lib */
import { memo } from 'react';
/* react icons */
import { FaMoon, FaSun } from 'react-icons/fa'
/* hooks */
import { useDarkMode } from '../hooks/darkmode hooks/useDarkmode';
/* image */
import Logo from "../assets/image/logo.svg";

const Navbar = () => {
    const { toggleDarkMode, darkMode } = useDarkMode()

    const navItems = [
        { path: '/overview', label: 'Overview' },
        { path: '/purchase', label: 'Purchase' },
        { path: '/list', label: 'Products & Stocks' },
        { path: '/history', label: 'Sales History' },
    ]
    {/* pang display ng name sa loob ng navbar */}
    const activePage = navItems.find((item) => item.path === location.pathname)


  return (
    <nav className={`fixed top-0 left-0 w-full z-50 p-5 transition-colors duration-300 ${darkMode ? 'bg-[#1A1A1A] text-white' : 'bg-white text-black'}`}>
              <img src={Logo} className="fixed w-28 z-60 top-3 left-13" />
            <div className='text-center font-bold text-2xl space-x-2'>
                {activePage ? <h2>{activePage.label}</h2> : <h2>Dashboard</h2>}
            </div>

            <div className="fixed top-6 right-10">
                <button onClick={toggleDarkMode} className="text-2xl">
                    {darkMode ? <FaSun /> : <FaMoon />}
                </button>
            </div>
        </nav>
  )
}

export default memo(Navbar)