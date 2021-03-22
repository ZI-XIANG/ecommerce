import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Login = () => {

    const [user, setUser] = useState({
        email: '', password: ''
    });

    const userInp = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    };

    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/user/login', { ...user })

            //設定localStorage
            localStorage.setItem('firstLogin', true); 

            //登入後導回首頁
            window.location.href = "/";

        } catch (err) {
            alert(err.response.data.msg)
        }
    };

    return (
        <div className="login">
            <div className="form_title">
                <h2>登入</h2>
            </div>
            <form onSubmit={loginSubmit}>
                <input type="email" name="email"
                    required placeholder="信箱" value={user.email} onChange={userInp}
                />
                <input type="password" name="password"
                    required placeholder="密碼" value={user.password} onChange={userInp}
                />
                <div className="row">
                    <button className="member_btn" type="submit">登入</button>

                    <div className="register_txt">
                        <p>還不是會員嗎?</p>
                        <Link to="/register">註冊</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;
