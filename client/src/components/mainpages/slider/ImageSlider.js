import React, { useState, useContext } from 'react';
import { SliderData } from './SliderData';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

import { GlobalState } from '../../../GlobalState'; //引入GlobalState

const ImageSlider = () => {

    const state = useContext(GlobalState); // useContext帶入GlobalState取得state
    const [products] = state.ProductsAPI.products; // 取得產品資訊,設置在[products]

    const [current, setCurrent] = useState(0);
    const length = SliderData.length; //圖片數量

    //下一張圖片設置
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };
    
    //上一張圖片設置
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    //沒有圖片回傳null
    if (!Array.isArray(SliderData) || length <= 0) {
        return null;
    }

    return (
        <div style={{ display: products.length === 0 ? "none" : "" }} className="slider">
            <IoIosArrowDropleftCircle onClick={prevSlide} className="left_arrow" />
            <IoIosArrowDroprightCircle onClick={nextSlide} className="right_arrow" />

            {
                SliderData.map((silde, index) => (
                    <div key={index} className={index === current ? 'slide active' : 'slide'}>

                        {
                            index === current && (
                                <>
                                    <div className="slider_img">
                                        <img key={index} src={silde.image} alt="" className="image" />
                                    </div>
                                    <div className="slider_txt">
                                        <h2>{silde.h2}</h2>
                                        <h3>{silde.h3}</h3>
                                        <a href="#products">來去逛逛</a>
                                    </div>
                                </>
                            )
                        }
                    </div>

                ))
            }

        </div>
    )
}

export default ImageSlider;
