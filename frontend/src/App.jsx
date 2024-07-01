import { useState } from "react";
import {BrowserRouter,Routes,Route}  from 'react-router-dom'
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HeroSection from "./Components/HeroSection";
import FeaturedProducts from "./Components/FeaturedProducts";
import Testimoials from "./Components/Testimonals";
import Offers from "./Components/Offers";
import Newsletters from "./Components/Newsletter";
import NewArrivals from "./Components/NewArrivals";
import Categories from "./Components/Categories";
import product from "./Components/Allproduct";

import "./App.css";
import CartProduct from "./Components/CartProduct";

function App() {
  const [cart, setCart] = useState([]);

  console.log("🚀 ~ App ~ cart:", cart);

  const [count, setCount] = useState(0);
  const [product, settProduct] = useState([]);

  return (
    <>
      <Header />
      <HeroSection />
      <BrowserRouter>
      <Routes>
    <Route path='/products'

      element={<FeaturedProducts cart={cart} setCart={setCart} />}>
    </Route>
     <Route path='/cart' element={<CartProduct {...{ cart, setCart, product }} />}></Route>
      </Routes>
      </BrowserRouter>
      <Categories />
      <Offers />
      <Newsletters />
      <NewArrivals />
      <Testimoials />
      <Footer />

    </>
  );
}

export default App;
