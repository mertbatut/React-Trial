import React, { useState, useEffect } from 'react';
import './App.css';
import Search from './components/Search';

const App = () => {
  const products = [
    { id: 1, name: 'Graphic Design', price: 6.48 },
    { id: 2, name: 'Web Development', price: 10.99 },
    { id: 3, name: 'Data Science', price: 8.50 },
    // Add more products as needed
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  // Update search results whenever searchTerm changes
  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div className="App">
      <h1>Product Search</h1>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        results={filteredProducts}
      />
    </div>
  );
};

export default App;
