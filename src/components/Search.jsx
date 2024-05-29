import React, { useState, useEffect } from 'react';
import '../App.css'; 
const Search = () => {
  const products = [
    { id: 1, name: 'Graphic Design', price: 6.48 },
    { id: 2, name: 'Web Development', price: 10.99 },
    { id: 3, name: 'Data Science', price: 8.50 },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); 
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleSearch = (term) => {
    if (!term) {
      setFilteredProducts([]);
      return;
    }

    const lowercasedTerm = term.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(lowercasedTerm) ||
      product.price.toString().includes(lowercasedTerm)
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div className="search-component">
      <h1>Product Search</h1>
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li key={product.id} className="dropdown-item">
                {product.name} - ${product.price}
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
