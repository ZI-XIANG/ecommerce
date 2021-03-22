import React, { createContext, useState, useEffect } from 'react';
import ProductsAPI from './api/ProductsAPI';
import UserAPI from './api/UserAPI';
import axios from 'axios';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {

    const [token, setToken] = useState(false);




    // 取得Token
    useEffect(() => {

        // 取得localStorage的'firstLogin'
        const firstLogin = localStorage.getItem('firstLogin');

        // 登入後取得'firstLogin',執行以下
        if (firstLogin) {
            const refreshToken = async () => {
                const res = await axios.get('/user/refresh_token');

                setToken(res.data.accesstoken);

                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000);
            }
            refreshToken();
        }

    }, []);


    const state = {
        token: [token, setToken],
        ProductsAPI: ProductsAPI(),//  Products API寫進state{ }
        UserAPI: UserAPI(token),// UserAPI傳入token
    };

    return (
        // 帶入state
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
};
