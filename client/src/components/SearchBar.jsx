import React, { useCallback, useEffect, useState } from "react"
import propTypes from 'prop-types'
import { debounce } from 'lodash';
/* Icons */
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
    const [search, setSearch] = useState("")

    //debounce search function
    const debouncedSearch = useCallback(
      debounce((value) => onSearch(value), 300),
      [onSearch]
    )

    const handleChange = (e) => {
        const value = e.target.value
        setSearch(value)
        debouncedSearch(value)
    }

    // Cleanup debounce on unmount
    useEffect(() => {
      return () => {
        debouncedSearch.cancel()
      }
    }, [debouncedSearch])

  return (
    <div className="flex w-[25rem] items-center rounded-full p-2 bg-white shadow-md border-2 border-blue-400 focus:outline-sky-50">
      <FaSearch className="text-blue-500 mr-2" />
        <input type="text" onChange={handleChange} value={search} placeholder="Search..."  
          className="flex-grow outline-none text-blue-400"
        />
    </div>
  )
}

SearchBar.propTypes = {
    onSearch: propTypes.func.isRequired
}

export default React.memo(SearchBar) 
