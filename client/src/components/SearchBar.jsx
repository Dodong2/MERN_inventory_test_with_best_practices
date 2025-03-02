import { useState } from "react"
import propTypes from 'prop-types'


const SearchBar = ({ onSearch }) => {
    const [search, setSearch] = useState("")

    const handleChange = (e) => {
        const value = e.target.value
        setSearch(value)
        onSearch(value)
    }
  return (
    <div>
        <input type="text" onChange={handleChange} value={search} placeholder="Search..."  />
    </div>
  )
}

SearchBar.propTypes = {
    onSearch: propTypes.func.isRequired
}

export default SearchBar
