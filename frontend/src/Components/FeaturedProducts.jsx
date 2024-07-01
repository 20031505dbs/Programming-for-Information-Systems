import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import Allproduct from "./Allproduct";

function FeaturedProducts({ cart, setCart }) {
  console.log("🚀 ~ FeaturedProducts ~ cart:", cart);

  const [product, setProduct] = useState(Allproduct);

  const addtoCart = (product) => {
    const exist = cart?.find((prod) => prod.id === product.id);
    if (exist) {
      alert("This product is already added to cart");
    } else {
      setCart((old) => [...old, product]);
      alert("Product is added to cart successfully");
    }
  };
  return (
    <Box sx={{ my: 1 }}>
      <Typography variant="h4" gutterBottom>
        Featured Products
      </Typography>
      <Grid container spacing={4}>
        {product.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.price}
                </Typography>
                <Button variant="contained" sx={{my:2}} color="secondary" href="/CartProduct" >Go to Cart</Button>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => addtoCart(product)}
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
