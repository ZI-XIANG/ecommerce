import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Products from './products/Products';
import Detail from './detailProduct/DetailProducts';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import CreateProduct from './createProduct/CreateProduct'
import NotFound from './utils/not_found/NotFound';
import { GlobalState } from '../../GlobalState';

const MainPages = () => {
    const state = useContext(GlobalState);
    const [isLogged] = state.UserAPI.isLogged
    const [isAdmin] = state.UserAPI.isAdmin

    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id" exact component={Detail} />
            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/create_products" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />


            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default MainPages;
