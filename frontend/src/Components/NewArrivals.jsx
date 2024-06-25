import React from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import img1 from '../assets/images/img1.jpg'
import img2 from '../assets/images/img2.jpg'
import img3 from '../assets/images/img3.jpg'
import img4 from '../assets/images/bundle.jpg'


const newArrivals = [
  { id: 1, name: 'New Arrival 1', price: '$79.99', image: img1 },
  { id: 3, name: 'New Arrival 3', price: '$59.99', image: img3 },
  { id: 2, name: 'New Arrival 2', price: '$69.99', image: img2 },
  { id: 4, name: 'New Arrival 4', price: '$49.99', image: img4 }
];

function NewArrivals() {
  return (
    <Box sx={{ my: 5 }}>
      <Typography variant="h4" gutterBottom>
        New Arrivals
      </Typography>
      <Grid container spacing={4}>
        {newArrivals.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Card>
              <CardMedia component="img" height="200" image={product.image} alt={product.name} />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">{product.price}</Typography>
                <Button variant="contained" color="primary" fullWidth>Add to Cart</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default NewArrivals;
