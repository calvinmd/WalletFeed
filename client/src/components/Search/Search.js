import React from 'react'

import './Search.sass'

const Search = props => {
  return (
    <div className="Search">
      <input type="text" placeholder="Search..." />
      <Button><MdSearch size={"16px"}/></Button>
    </div>
  );
}

export default Search
