import React, { useCallback, useEffect, useState } from "react"
import propTypes from 'prop-types'
import { debounce } from 'lodash';


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
    <div>
        <input type="text" onChange={handleChange} value={search} placeholder="Search..."  />
    </div>
  )
}

SearchBar.propTypes = {
    onSearch: propTypes.func.isRequired
}

export default React.memo(SearchBar) 
