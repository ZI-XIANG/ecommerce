import axios from 'axios';
import { useState, useEffect } from 'react';


const UserAPI = (token) => {

    // 登入狀態設定(一般會員、管理員)
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    // 透過token取得用戶信息
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }
                    });
                    // 設定isLogged為true
                    setIsLogged(true);

                    // 如果用戶的role為1,isAdmin則為true,不是1則為false
                   
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
                    setCart(res.data.cart);

                } catch (err) {
                    alert(err.res.data.msg);
                }

            };
            getUser()

        };

    }, [token]);

  

    //購物車設定
    const addCart = async (product) => {

        if (!isLogged) return alert("請登入會員!"); //未登入提醒
        

        //確認item._id與product._id是否相同，不相同則加入購物車
        const check = cart.every(item => {

            return item._id !== product._id;

        })

        // 加入購物車後setCart()寫入product、quantity,以及patch到後端
        if (check) {
            setCart([...cart, { ...product, quantity: 1 }]);

            await axios.patch('/user/addcart', { cart: [...cart, { ...product, quantity: 1 }] }, {
                headers: { Authorization: token }
            })

            // 如果重複點選購買按鈕，則提示"此商品已加入購物車"
        } else {
            alert("此商品已加入購物車");
        }
    };

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart
    }
}

export default UserAPI;
