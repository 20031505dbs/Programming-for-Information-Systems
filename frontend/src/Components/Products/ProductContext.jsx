import React, { createContext, useState, useContext } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// Create the context
export const ProductContext = createContext();

// Define the provider component
const ProductProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: 'All',
    fabric: 'All',
    color: 'All',
    size: 'All',
  });

  const [products, setProducts] = useState([
    // Example product data
    {
      id: 1,
      name: 'Red Silk Saree',
      category: 'Tops',
      fabric: 'Silk',
      color: 'Red',
      size: 'M',
      stock: 5,
      price: 100,
    },
    // Add more products as needed
  ]);

  const filteredProducts = products.filter(product => {
    return (
      (filters.category === 'All' || product.category === filters.category) &&
      (filters.fabric === 'All' || product.fabric === filters.fabric) &&
      (filters.color === 'All' || product.color === filters.color) &&
      (filters.size === 'All' || product.size === filters.size)
    );
  });

  return (
    <ProductContext.Provider value={{ filters, setFilters, products: filteredProducts, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Define the ProductFilters component
function ProductFilters() {
  const { filters, setFilters } = useContext(ProductContext);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select name="category" value={filters.category} onChange={handleFilterChange}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Tops">Tops</MenuItem>
          <MenuItem value="Bottoms">Bottoms</MenuItem>
          <MenuItem value="Dupattas">Dupattas</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Fabric</InputLabel>
        <Select name="fabric" value={filters.fabric} onChange={handleFilterChange}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Cotton">Cotton</MenuItem>
          <MenuItem value="Silk">Silk</MenuItem>
          <MenuItem value="Chiffon">Chiffon</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Color</InputLabel>
        <Select name="color" value={filters.color} onChange={handleFilterChange}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Red">Red</MenuItem>
          <MenuItem value="Blue">Blue</MenuItem>
          <MenuItem value="Green">Green</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Size</InputLabel>
        <Select name="size" value={filters.size} onChange={handleFilterChange}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="S">S</MenuItem>
          <MenuItem value="M">M</MenuItem>
          <MenuItem value="L">L</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

// Export the provider as default
export default ProductProvider;

// Export the filters component
export { ProductFilters };
