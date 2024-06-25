import React, { useContext, useState } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { ProductContext } from '../ProductContext';
function FeaturedProducts() {
  const { products } = useContext(ProductContext);
  const [customOptions, setCustomOptions] = useState({
    quantity: 1,
    customDesign: ''
  });

  const handleCustomChange = (event) => {
    const { name, value } = event.target;
    setCustomOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {products.map(product => (
        <Card key={product.id} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image="product1.jpg" // Replace with actual image source
            alt={product.name}
          />
          <CardContent>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {product.category}, {product.fabric}, {product.color}, Size: {product.size}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${product.price} - Stock: {product.stock}
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Quantity</InputLabel>
              <Select
                name="quantity"
                value={customOptions.quantity}
                onChange={handleCustomChange}
              >
                {[...Array(product.stock).keys()].map(i => (
                  <MenuItem key={i+1} value={i+1}>{i+1}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Custom Design"
              name="customDesign"
              value={customOptions.customDesign}
              onChange={handleCustomChange}
              sx={{ mt: 2 }}
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default FeaturedProducts;
