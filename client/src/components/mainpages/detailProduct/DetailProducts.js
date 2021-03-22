import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductItem from '../utils/productItem/ProductItem'
import { GlobalState } from '../../../GlobalState'; //引入GlobalState


const DetailProducts = () => {
    const params = useParams(); // useParams取得頁面ID

    const state = useContext(GlobalState);// useContext帶入GlobalState取得state

    const [products] = state.ProductsAPI.products; // 取得產品資訊,設置在[products]

    const addCart = state.UserAPI.addCart;

    const [detailProduct, setDetailProduct] = useState([]);

    const [isLogged] = state.UserAPI.isLogged;

    // 如果products的id = params的id 則顯示該產品資訊，設置在 detailProduct
    useEffect(() => {
        if (params.id) {
            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product);
            })
        }
    }, [params.id, products]);

    if (detailProduct.length === 0) return null;

    return (
        <>
            <div className="detail">

                <img src={detailProduct.images.url} alt="" />
                <div className="box_detail">
                    <div className="detail_title">
                        <p>{detailProduct.description}</p>
                        <p> {detailProduct.sold} 已售出</p>
                    </div>

                    <p className="detail_price">${detailProduct.price}</p>
                    <p className="detail_content">專利避震緩衝材質，做為健走鞋的中底材質，支持腳部弓足的部位，走路更加輕盈!秉持機能為設計理念，鞋面透氣度大增，輕量，獨家專利科技，提供更舒適的極限支柱群，支撐走的每一步!</p>


                    <Link onClick={() => addCart(detailProduct)} className="btn_buy" to={isLogged ? "/cart" : "/login"} >購買</Link>


                </div>


            </div>


            <div >

                <h3 className="other"> 看看其他 {detailProduct.title} 鞋款吧</h3>
                <div className="products">
                    {
                        // 如果 product(所有產品)的title = detailProduct(詳細產品資訊)的title
                        // 則顯示一樣title的產品
                        products.map((product) => (
                            (product.title === detailProduct.title) ?
                                <ProductItem key={product._id} product={product} /> : null

                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProducts;
