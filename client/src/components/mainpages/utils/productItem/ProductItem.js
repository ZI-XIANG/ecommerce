import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BtnRender from '../productItem/BtnRender';
import Loading from '../loading/Loading';
import axios from 'axios';

//產品資訊
const ProductItem = ({ product, isAdmin, addCart, token, setCallback, callback }) => {

    const [loading, setLoading] = useState(false);

    //刪除產品
    const deleteProduct = async () => {
        try {
            setLoading(true);
            const destoroyImg = axios.post('/api/destroy', { public_id: product.images.public_id }, {
                headers: { Authorization: token }
            })

            const deleteProduct = axios.delete(`/api/products/${product._id}`, {
                headers: { Authorization: token }
            })

            await destoroyImg;
            await deleteProduct;

            setLoading(false);
            setCallback(!callback)

        } catch (err) {
            alert(err.response.data.msg)
        }
    };

    if (loading) return (

        <div className="product_loading">
            <Loading />
        </div>
    )


    return (
        <div className="product_cart">
            <div className="img_hover">
                <Link id="btn_view" to={`/detail/${product._id}`}>
                    <img src={product.images.url} alt="" />
                </Link>
            </div>

            <div className="product_box">
                <span>${product.price}</span>
                <p>{product.description}</p>
            </div>
        

            <BtnRender deleteProduct={deleteProduct} addCart={addCart} product={product} isAdmin={isAdmin} />

        </div>  // 按鈕寫在BtnRender組件
    )
}

export default ProductItem;
