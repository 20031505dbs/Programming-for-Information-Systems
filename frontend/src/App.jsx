import { useState } from 'react';
// Components 
import Header from './Components/Header';
import Footer from './Components/Footer';
import Offers from './Components/Offers';
import Testimonals from './Components/Testimonals';
import Newsletters from './Components/Newsletter';
import HeroSection from './Components/HeroSection';
import FeaturedProducts from './Components/FeaturedProducts';
import NewArrivals from './Components/NewArrivals';
// Cart Product 

// MUI 
import { Container, CssBaseline } from '@mui/material';
import Categories from './Components/Categories';

function App() {
  return (
<>
        <CssBaseline />
        <Header />
        <Container>
          <HeroSection />
          <FeaturedProducts />
          <Offers />
          <NewArrivals />
          <Categories />
          <Testimonals />
          <Newsletters />
        </Container>
        <Footer />
     
</>   
  );
}

export default App;
