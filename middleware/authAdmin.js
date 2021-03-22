const Users = require('../models/userModel');

const authAdmin = async (req, res, next) => {
    try {
        //透過ID獲取用戶信息
        const user = await Users.findOne({
            _id: req.user.id
        });

        if (user.role === 0) return res.status(400).json({ msg: "無管理員登入權限!" });

        next();

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};



module.exports = authAdmin;