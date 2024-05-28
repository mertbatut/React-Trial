import React from 'react';

const Search = ({ searchTerm, setSearchTerm, onSearch, results }) => {
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // Perform search on every input change
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-component">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
        className="rounded-3xl w-36"
      />
      <button onClick={handleSearchClick}>Search</button>
      {searchTerm && (
        <ul className="dropdown">
          {results.length > 0 ? (
            results.map((result, index) => (
              <li key={index} className="dropdown-item">
                {result.name} - ${result.price}
              </li>
            ))
          ) : (
            <li className="dropdown-item">No search results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
