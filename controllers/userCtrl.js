const Users = require('../models/userModel');
const bcrypt = require('bcrypt'); // 使用者密碼加密
const jwt = require('jsonwebtoken');// 使用者驗證

const userCtrl = {
    // 註冊設定
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const user = await Users.findOne({ email });

            if (user) return res.status(400).json({ msg: "此帳號已重複" });

            if (password.length < 6) return res.status(400).json({ msg: "密碼長度不得小於6" });

            //密碼加密
            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = new Users({
                name, email, password: passwordHash
            });

            //資料存到mongodb
            await newUser.save();

            //創建jsonwebtoken進行身份驗證
            const accesstoken = createAccessToken({ id: newUser._id });
            const refreshtoken = createRefreshToken({ id: newUser._id });

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })

            res.json({ accesstoken });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // 登入設定
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email });
            if (!user) return res.status(400).json({ msg: "帳號不存在" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "密碼錯誤" });

            //如果登錄成功，則創建token並刷新token

            const accesstoken = createAccessToken({ id: user._id });
            const refreshtoken = createRefreshToken({ id: user._id });

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })

            res.json({ accesstoken });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // 登出設定
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' });

            return res.json({ msg: "登出" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // 刷新 Token
    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ msg: "請註冊或登入" });

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "請註冊或登入" });

                const accesstoken = createAccessToken({ id: user.id });

                res.json({ accesstoken });
            });


        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //取得User
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password');
            if (!user) return res.status(400).json({ msg: "用戶不存在" });

            res.json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // 購物車設定
    addcart: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id);
            if (!user) return res.status(400).json({ msg: "用戶不存在" });

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                cart: req.body.cart
            });

            return res.json({ msg: "加入購物車" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '11m' })
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}


module.exports = userCtrl;