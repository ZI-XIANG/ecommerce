import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import Loading from '../utils/loading/Loading';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsUpload } from 'react-icons/bs';


// setProduct初始值
const init = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    content: 'test',
    category: 'tess',
    _id: ''
};

const CreateProduct = () => {

    const state = useContext(GlobalState);
    const [token] = state.token;
    const [product, setProduct] = useState(init);
    const [images, setImages] = useState(false);
    const [loading, setLoading] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [callback, setCallback] = state.ProductsAPI.callback;
    const history = useHistory();
    const params = useParams();

    const [products] = state.ProductsAPI.products;

    //修改商品資訊---> useParams取得商品id,如果符合product._id則顯示該產品資訊
    useEffect(() => {
        if (params.id) {
            setOnEdit(true);
            products.forEach(product => {
                if (product._id === params.id) {
                    setProduct(product);
                    setImages(product.images)
                }
            });
        } else {
            // 跳轉到創建商品頁面時資訊清空
            setOnEdit(false);
            setImages(false);
            setProduct(init);
        }
    }, [params.id, products]);

    // 圖片上傳
    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const file = e.target.files[0];

            if (!file) return alert("圖片不存在");

            //1mb
            if (file.size > 1024 * 1024) return alert("圖片尺寸過大");

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return alert("圖片格式不正確");

            let formData = new FormData();
            formData.append('file', file);

            setLoading(true);

            const res = await axios.post('/api/upload', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })

            setLoading(false);
            setImages(res.data);

        } catch (err) {
            alert(err.response.data)
        }
    };

    // 圖片刪除
    const imgDelete = async () => {
        try {
            setLoading(true)
            await axios.post('/api/destroy', { public_id: images.public_id }, {
                headers: { Authorization: token }
            })
            setLoading(false)
            setImages(false);
        } catch (err) {
            alert(err.response.data.msg)
        }
    };

    //商品描述input設置
    const handleInput = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    // Form onSubmit設置
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!images) return alert("請選擇圖片");

            // 如果是onEdit為true(修改狀態),則改變後端資料
            if (onEdit) {
                await axios.put(`/api/products/${product._id}`, { ...product, images }, {
                    headers: { Authorization: token }
                });

            } else {
                await axios.post('/api/products', { ...product, images }, {
                    headers: { Authorization: token }
                });
            }


            setImages(false);
            setProduct(init);
            setCallback(!callback);
            history.push("/");

        } catch (err) {
            alert(err.response.data.msg)
        }
    };

    return (
        <div className="create_product">
            <div className="upload">
                <input onChange={handleUpload} type="file" name="file" id="file_up" />
                <div className="upload_icon">
                    <BsUpload style={{ display: loading ? "none" : "block" }} className="up_icon" />
                </div>
                {
                    loading ? <div className="create_loading"> <Loading /></div>
                        : <div style={{ display: images ? "block" : "none" }} className="file_img">
                            <img src={images ? images.url : ''} alt="" />
                            <AiOutlineCloseCircle onClick={imgDelete} className="delete_icon" />
                        </div>

                }

            </div>


            <div className="product_describe">
                <form className="product_item" onSubmit={handleSubmit}>
                    <div className="create_content">
                        <div className="row">
                            <label htmlFor="product_id">商品編號</label>
                            <input disabled={onEdit} autoComplete="off" onChange={handleInput} type="text" name="product_id" required value={product.product_id} />
                        </div>
                        <div className="row">
                            <label htmlFor="title">商品描述</label>
                            <input autoComplete="off" onChange={handleInput} type="text" name="title" required value={product.title} />
                        </div>
                        <div className="row">
                            <label htmlFor="price">商品價格</label>
                            <input autoComplete="off" onChange={handleInput} type="number" name="price" required value={product.price} />
                        </div>
                        <div className="row">
                            <label htmlFor="description">商品款式</label>
                            <input autoComplete="off" onChange={handleInput} type="text" name="description" required value={product.description} />
                        </div>
                        <div className="row">
                            <label htmlFor="category">商品類別</label>
                            <input autoComplete="off" onChange={handleInput} type="text" name="category" required value={product.category} />
                        </div>
                        <div className="row">
                            <label htmlFor="content">詳細內容</label>
                            <input autoComplete="off" onChange={handleInput} type="text" name="content" required value={product.content} />
                        </div>
                    </div>
                    <button className="create_btn" type="submit">{onEdit ? "內容更新" : "創建商品"}</button>
                </form>
            </div>


        </div >
    )
}

export default CreateProduct;
