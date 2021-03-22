const Category = require('../models/categoryModel');



const categoryCtrl = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find();
            res.json(categories)
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    createCategory: async (req, res) => {
        try {
            //role = 1 ---->管理員
            //只有管理員能創建、新增、刪除商品
            const { name } = req.body;
            const category = await Category.findOne({ name });
            if (category) return res.status(400).json({ msg: "這個商品已經存在" });

            const newCategory = new Category({ name });

            await newCategory.save();
            res.json({ msg: '創建商品' })

        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.json({ msg: "刪除商品" });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body;
            await Category.findByIdAndUpdate({ _id: req.params.id }, { name });

            res.json({ msg: "修改商品" });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }
};



module.exports = categoryCtrl;