import { useState, useEffect } from 'react';
import axios from 'axios';


//商品資訊設置
const ProductsAPI = () => {
    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false);


    //axios串接商品資訊
    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get('/api/products');
            setProducts(res.data.products);
        };
        
        getProducts()
        
    }, [callback]);


    return (
        {
            products: [products, setProducts],
            callback: [callback, setCallback]
        }
    )
}

export default ProductsAPI;
