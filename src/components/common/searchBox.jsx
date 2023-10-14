import React from 'react'


const SearchBox = ({placeholder, value, onChange}) => {
    return <div className='col-6'>
        <input type="text" className="form-control" placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
}


export default SearchBox
