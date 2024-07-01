import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import CartProduct from "./CartProduct";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Ethnic Wear
        </Typography>
        <Button color="inherit"  href="/">Home</Button>
        <Button color="inherit"  href="/women">Women</Button>
        <Button color="inherit"  href="/men">Men</Button>
        <Button color="inherit"  href="/kids">Kids</Button>
        <Button color="inherit"  href="/accessories">Accessories</Button>
        <Button color="inherit"  href="/sale">Sale</Button>

        <IconButton color="inherit"  href='/CartProduct'>
          <ShoppingCart  />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
