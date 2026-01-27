import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const TodosViewForm = ({ sortField, setSortField, sortDirection, setSortDirection, queryString, setQueryString }) => {
  
  const preventRefresh = (event) => {
    event.preventDefault();
  };

  const [localQueryString, setlocalQueryString] = useState(queryString);

  useEffect(() => {
  
  const debounce = setTimeout(() => {
    setQueryString(localQueryString)
  }, 500);

  return(
   () => clearTimeout(debounce)
  )

  }, [localQueryString, setlocalQueryString]);


  return (
    <form onSubmit={preventRefresh}>
        <div>
        <label htmlFor="search">Search todos:</label>
        <input 
          id="search"
          type="text" 
          value={localQueryString} 
          onChange={(e) => setlocalQueryString(e.target.value)} 
        />
        <button type="button" onClick={() => setlocalQueryString("")}>
            Clear
        </button>
      </div>

      <div>
        <label htmlFor="sortField">Sort by</label>
            <select 
            id="sortField" 
            value={sortField} 
            onChange={(event) => setSortField(event.target.value)}
            >
            <option value="title">Title</option>
            <option value="createdTime">Time added</option>
            </select>

        <label htmlFor="sortDirection">Direction</label>
            <select 
            id="sortDirection" 
            value={sortDirection} 
            onChange={(event) => setSortDirection(event.target.value)}
            >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
            </select>
      </div>
    </form>
  );
};

export default TodosViewForm;