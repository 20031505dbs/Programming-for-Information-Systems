
import React from "react";
import { AppBar,Toolbar,Typography,Button,IconButton,  } from "@mui/material";
import {Link} from 'react-router-dom'
import ShoppingCartIcon  from '@mui/icons-material/ShoppingCart'
import CartProduct from './CartProduct'
import ShoppingCart from "@mui/icons-material/ShoppingCart";
function Header() {


    return(
        <>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{flexGrow:1}}>
                    Ethinic Wear
                </Typography>
                <Button color="inherit">Home</Button>
                <Button color="inherit">Women</Button>

                <Button color="inherit">Men</Button>

                <Button color="inherit">Kids</Button>
                <Button color="inherit">Accessories</Button>
                <Button color="inherit">Sale</Button>
                <IconButton color="inherit">
                    <Link to='/CartProduct'>
                    <ShoppingCart/>
                    </Link>
                </IconButton>

            </Toolbar>
        </AppBar>
        
        </>
    )
    
}

export default Header;