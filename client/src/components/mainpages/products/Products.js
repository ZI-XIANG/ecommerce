import React, { useContext } from 'react';
import ProductItem from '../utils/productItem/ProductItem';
import Loading from '../utils/loading/Loading'
import { GlobalState } from '../../../GlobalState' //引入GlobalState
import ImageSlider from '../slider/ImageSlider';// 照片區
import About from '../about/About';// 照片區


//  產品頁面
const Products = () => {
    const state = useContext(GlobalState); // useContext帶入GlobalState取得state
    const [products] = state.ProductsAPI.products; // 取得產品資訊,設置在[products]
    const [callback, setCallback] = state.ProductsAPI.callback;
    const [isAdmin] = state.UserAPI.isAdmin; //取得登入狀態(管理員)
    const token = state.token;
    const addCart = state.UserAPI.addCart;






    return (
        <>
            <ImageSlider />

            <About />

            <div className="loading">
                {products.length === 0 && <Loading />}
            </div>
            
            <h2 style={{ display: products.length === 0 ? "none" : "" }} className="product_h2">精選鞋款</h2>
            <div style={{ display: products.length === 0 ? "none" : "" }} id="products" className="products">

                {
                    products.map((product) => (

                        // 寫在ProductItem組件
                        <ProductItem
                            key={product._id} addCart={addCart} product={product}
                            isAdmin={isAdmin} token={token} callback={callback} setCallback={setCallback} />

                    ))
                }



            </div>


        </>
    )
}

export default Products;
