import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState' //引入GlobalState
import { AiFillFacebook, AiFillTwitterSquare, AiFillInstagram, AiFillYoutube } from 'react-icons/ai';


const Footer = () => {
    const state = useContext(GlobalState);
    const [products] = state.ProductsAPI.products;



    return (
        <footer style={{ display: products.length === 0 ? "none" : "" }}>
            <div className="icon">
                <AiFillFacebook className="ft_icon" />
                <AiFillTwitterSquare className="ft_icon" />
                <AiFillInstagram className="ft_icon" />
                <AiFillYoutube className="ft_icon" />
            </div>
            <div className="ft_txt">
                <p>© 2021. ecommerce product</p>
            </div>
        </footer>
    )
}

export default Footer;
