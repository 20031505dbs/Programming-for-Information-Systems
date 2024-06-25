import React, {  useState } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import Allproduct from './Allproduct'
 
function FeaturedProducts() {
  const [product,setProduct]=useState(Allproduct)
  return (
    <Box sx={{ my: 1 }}>
      <Typography variant="h4" gutterBottom>
        Featured Products
      </Typography>
      <Grid container spacing={4}>
        {product.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Card>
              <CardMedia component="img" height="200" image={product.image} alt={product.name} />
              <CardContent>
                <Typography variant="h6">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">{product.price}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default FeaturedProducts;
