import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { GlobalState } from '../../GlobalState'; //引入GlobalState
import Logo from '../../images/logo.png'
import { GoThreeBars } from 'react-icons/go';// React Icon
import { AiOutlineClose } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';


const Header = () => {
    const state = useContext(GlobalState); // 使用useContext取得state
    const [isLogged] = state.UserAPI.isLogged; //登入狀態(一般會員)
    const [isAdmin] = state.UserAPI.isAdmin; //登入狀態(管理員)
    const [products] = state.ProductsAPI.products; // 取得產品資訊,設置在[products]
    const [cart] = state.UserAPI.cart;

    const [menuHandle, setMenuHandle] = useState(true); //手機板導覽列操控


    //管理員狀態導覽列顯示
    const adminRouter = () => {
        return (
            <>

                <li><Link to="/create_products">創建商品</Link></li>
                <li><Link to="/" onClick={userLogout}>登出</Link></li>
            </>
        )
    }

    //  登出設定

    const userLogout = async () => {
        await axios.get('/user/logout');

        localStorage.removeItem('firstLogin');
        window.location.href = '/';
    };


    const cartIcon = () => {
        if (!isLogged) return alert("請登入會員!"); //未登入提醒
    };


    //一般會員狀態導覽列顯示
    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/cart">購物車</Link></li>
                <li><Link to="/" onClick={userLogout}>登出</Link></li>
            </>
        )
    }


    const menuBar = () => {
        setMenuHandle(!menuHandle)
    };

    return (
        <header style={{ display: products.length === 0 ? "none" : "" }}>


            <div className="logo">

                <Link className="logo_txt" to="/">{isAdmin ? '後台設定' : <img className="logo_img" src={Logo} alt="" />}</Link>

            </div>

            <ul className={menuHandle ? null : "bar_Active"} >

                <li><Link to="/">首頁</Link></li>

                {
                    isAdmin ? adminRouter()
                        : isLogged ? loggedRouter()
                            : <Link to="/login">註冊/ 登入</Link>

                }


            </ul >



            <div style={{ display: isAdmin ? "none" : "block" }} className="cart_icon">
                <Link onClick={cartIcon} to={isLogged ? "/cart" : "/login"}>
                    <span style={{ display: isLogged ? "block" : "none" }}>{cart.length}</span>

                    <FiShoppingCart className="icon" />
                </Link>
            </div>

            <div onClick={menuBar} className="menu">
                {
                    menuHandle ? <GoThreeBars className="icon_menu" /> : <AiOutlineClose className="icon_menu close_bar" />
                }

            </div>

        </header >
    )
}

export default Header;
