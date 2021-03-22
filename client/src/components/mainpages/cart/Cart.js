import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { AiFillMinusCircle } from 'react-icons/ai';
import { AiFillPlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Cart = () => {
    const state = useContext(GlobalState);
    const [cart, setCart] = state.UserAPI.cart;
    const [total, setTotal] = useState(0);
    const [token] = state.token;


    // 總金額設定
    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0);

            setTotal(total);
        }
        getTotal()
    }, [cart]);

    // 商品數量傳至後端
    const addToCart = async () => {
        await axios.patch('/user/addcart', { cart }, {
            headers: { Authorization: token }
        })
    };


    // 增加商品數量
    const increment = (id) => {
        cart.forEach(item => {

            if (item._id === id) {

                item.quantity += 1;

                console.log(item);
            }

        });
        setCart([...cart])
        addToCart();
    };

    // 減少商品數量
    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })
        setCart([...cart]);
        addToCart();
    };


    // 刪除商品
    const removeProduct = (id) => {
        if (window.confirm("確定要刪除該商品嗎?")) {

            cart.forEach((item, index) => {

                if (item._id === id) {

                    cart.splice(index, 1)
                }
            })
            setCart([...cart]);
            addToCart();
        }
    };

    //購物車無商品顯示
    if (cart.length === 0) return <h1 className="cart_null">尚無商品</h1>;

    return (
        <div className="cart_content">
            {
                cart.map((product) => (
                    <div key={product._id} className="cart_container">
                        <div className="cart">
                            <div className="cart_img">
                                <img src={product.images.url} alt="" />
                            </div>
                            <div className="cart_item">
                                <p>{product.content}</p>


                                <div className="amount">
                                    <p className="price">${product.price * product.quantity}</p>
                                    <div className="amount_select">
                                        <AiFillMinusCircle onClick={() => decrement(product._id)} className="cart_i" />
                                        <span>{product.quantity}</span>
                                        <AiFillPlusCircle onClick={() => increment(product._id)} className="cart_i" />
                                    </div>
                                    <div className="amount_delete">
                                        <RiDeleteBin5Line onClick={() => removeProduct(product._id)} className="delete" />
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                ))
            }

            <div className="total">
                <h3>總金額: ${total}</h3>
                <Link to="/">結帳</Link>
            </div>
        </div>
    )
}

export default Cart;
