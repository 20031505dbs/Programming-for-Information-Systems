import React, {  useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import Testimonals from "./Testimonals";
import Offers from "./Offers";
import Newsletter from "./Newsletter";
import HeroSection from "./HeroSection";
import Categories from "./Categories";
import NewArrivals from "./NewArrivals";
import Footer from "./Footer";
import Header from "./Header";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [quantity, setQuantity] = useState(1); // State for quantity

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem("isAuthenticated")));
  }, []);

  useEffect(() => {
    const getAllProducts = async () => {
      const data = await fetchAllProducts();
      setProducts(data);
    };
    getAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/products");
      return response.data;
    } catch (error) {
      console.log(error);
      console.error("Failed to fetch featured products:", error);
      return [];
    }
  };

  const addToCart = async (product) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/cart", {
        product_id: product.id,
        quantity: parseInt(quantity), // Use the current value of quantity state
        user_id: JSON.parse(localStorage.getItem("user")).id,
      });
      if (response.status === 201) {
        alert("Item added to cart successfully!");
        const data = await fetchAllProducts();
        setProducts(data);
      } else {
        alert("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  return (
    <>
      <Header />
      <HeroSection />
      <Box sx={{ my: 1 }}>
        <Typography variant="h4" gutterBottom>
          Products
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={`/assets/${product.img}`}
                  alt={product.name}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h5">{product.name}</Typography>
                  <Typography variant="p">
                    <b>Stock</b>: {product.stock}
                  </Typography>
                  <Typography variant="p">
                    <b>Colors</b>: {product.colors}
                  </Typography>
                  <Typography variant="p">
                    <b>Size:</b> {product.sizes}
                  </Typography>
                  <Typography variant="p">
                    <b>Price</b>: {product.price}
                  </Typography>
                  <TextField
                    type="number"
                    label="Quantity"
                    InputProps={{ inputProps: { min: 1 } }}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    sx={{ my: 2 }}
                  />
                  <Button
                    variant="contained"
                    sx={{ my: 2 }}
                    color="secondary"
                    href="/cart"
                  >
                    Visit Cart
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ my: 1 }}
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
      <Categories />
      <Offers />
      <Newsletter />
      <NewArrivals />
      <Testimonals />
      <Footer />
    </>
  );
}

export default AllProducts;
