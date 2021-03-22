import React, { useContext } from 'react';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { GlobalState } from '../../../../GlobalState';

// 按鈕組件
const BtnRender = ({ product, deleteProduct }) => {
    const state = useContext(GlobalState);
    const [isAdmin] = state.UserAPI.isAdmin;
    const [isLogged] = state.UserAPI.isLogged;
    const addCart = state.UserAPI.addCart;

    return (
        <div className="row_btn">

            {
                // 登入狀態為管理員顯示不同按鈕
                isAdmin ?
                    <>
                        <Link onClick={deleteProduct} className="btn_de" to="#!">
                            刪除
                        </Link>

                        <Link id="btn_view" to={`/edit_product/${product._id}`}>
                            <AiOutlineEdit className="edit" />
                        </Link>
                    </>
                    :
                    <>


                        <Link id="btn_buy" className="btn_buy" to={isLogged ? "/#!" : "/login"} onClick={() => addCart(product)} >
                            購買
                        </Link>


                        <Link id="btn_view" to={`/detail/${product._id}`}>
                            <IoIosArrowDroprightCircle className="pro_icon" />
                        </Link>
                    </>



            }


        </div>
    )
}

export default BtnRender;
