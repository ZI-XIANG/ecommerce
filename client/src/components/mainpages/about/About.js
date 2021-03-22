import React, { useContext } from 'react';
import { FiTruck } from 'react-icons/fi';
import { FaCashRegister } from 'react-icons/fa';
import { GiPresent } from 'react-icons/gi';
import img1 from '../../../images/about1.jpg'
import img2 from '../../../images/about2.jpg'

import { GlobalState } from '../../../GlobalState'; //引入GlobalState


const About = () => {

    const state = useContext(GlobalState); // useContext帶入GlobalState取得state
    const [products] = state.ProductsAPI.products; // 取得產品資訊,設置在[products]

    return (
        <div style={{ display: products.length === 0 ? "none" : "" }} className="about">
            <div className="about_content">
                <div className="about_txt">
                    <FiTruck className="about_icon" />
                    <div className="about_msg">
                        <p>當日下單下午五點前寄出貨物,</p>
                        <p>兩天內將貨送到府</p>
                    </div>
                </div>
                <div className="about_txt">
                    <FaCashRegister className="about_icon" />
                    <div className="about_msg">
                        <p>信用卡、超商取貨、貨到付款</p>
                        <p>多種付款方式更加便利</p>
                    </div>
                </div>
                <div className="about_txt">
                    <GiPresent className="about_icon" />
                    <div className="about_msg">
                        <p>全館滿三千</p>
                        <p>再送您兩百元購物金</p>
                    </div>
                </div>
            </div>

            <div className="about_img">
                <div className="about_item column">
                    <img src={img1} alt="" />
                    <h3>新系列</h3>
                    <h4>85折起</h4>
                </div>
                <div className="about_item reverse">
                    <img src={img2} alt="" />
                    <h3>各尺寸齊全</h3>
                    <h4>實體店面</h4>
                </div>
            </div>
        </div>
    )
}

export default About;
