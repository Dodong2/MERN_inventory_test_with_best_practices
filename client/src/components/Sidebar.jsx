import { Link, useLocation } from 'react-router-dom'
/* react icons */
import { BsFileBarGraph } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";

const Sidebar = () => {
    const location = useLocation


    const navItems = [
        { path: '/overview', icon: <BsFileBarGraph className='text-white'/> ,label: 'Overview' },
        { path: '/purchase', icon: <BsCartPlus className='text-white'/> , label: 'Purchase' },
        { path: '/list', icon: <IoAddCircleOutline className='text-white'/> , label: 'Products & Stocks' },
        { path: '/history', icon: <MdHistory className='text-white'/> , label: 'Sales History' },
        // { icon: <MdHistory className='text-white'/> , label: 'Logout' },
    ]

  return (
    <div className='fixed z-10 bg-[#595959] w-1xl h-screen p-7'>
      <nav>
        <ul className='list-none p-0 mt-25'>
          {navItems.map((item) => (
            <li key={item.path} className='mb-5'>
              <Link
                to={item.path}
                className={`ml-0 text-white block p-2 rounded-md transition-all duration-200 ${
                  location.pathname === item.path ? 'bg-[#616983]' : 'hover:bg-[#616983]'
              } hover:scale-115 hover:w-full`}
              >
                <div className='flex items-center'>
                {item.icon} <span className='ml-3'>{item.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar