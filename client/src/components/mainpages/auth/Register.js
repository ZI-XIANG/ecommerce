import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {

    const [user, setUser] = useState({
        name: '', email: '', password: ''
    });

    const userInp = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    };

    const registerSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/user/register', { ...user })

            //設定localStorage
            localStorage.setItem('firstLogin', true);

            //註冊後導回首頁
            window.location.href = "/";

        } catch (err) {
            alert(err.response.data.msg)
        }
    };

    return (
        <div className="login">
            <div className="form_title">
                <h2>註冊</h2>
            </div>
            <form onSubmit={registerSubmit}>
                <input type="text" name="name"
                    required placeholder="姓名" value={user.name} onChange={userInp}
                />
                <input type="email" name="email"
                    required placeholder="信箱" value={user.email} onChange={userInp}
                />
                <input type="password" name="password"
                    required placeholder="密碼" value={user.password} onChange={userInp}
                />
                <div className="row">
                    <button className="member_btn" type="submit">註冊</button>
                </div>
            </form>
        </div>
    )
}

export default Register;
