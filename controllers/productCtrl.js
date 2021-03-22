const Products = require('../models/productModel');

//篩選、種類、分頁設置
class APIfeatures {
    constructor(query, querySring) {
        this.query = query;
        this.querySring = querySring;
    }
    filtering() {
        const queryObj = { ...this.querySring } //querySring = req.query

        const excludeFields = ['page', 'sort', 'limit'];
        excludeFields.forEach(el => delete (queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);
        // gte = 大於或等於
        // gt = 更大的
        // lt = 小於
        // lte = 小於或等於


        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting() {
        if (this.querySring.sort) {
            const sortBy = this.querySring.sort.split(',').join('');
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    paginating() {
        const page = this.querySring.page * 1 || 1;
        const limit = this.querySring.limit * 1 || 12;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}


const productCtrl = {
    //查詢產品
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Products.find(), req.query)
                .filtering().sorting().paginating();
                
            const products = await features.query;

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })

        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },

    //創建產品
    createProduct: async (req, res) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body;
            if (!images) return res.status(400).json({ msg: "請上傳圖片" });

            const product = await Products.findOne({ product_id });
            if (product) return res.status(400).json({ msg: "此商品已上傳" });

            const newProduct = new Products({
                product_id, title: title.toLowerCase(), price, description, content, images, category
            });


            await newProduct.save();
            res.json({ msg: "成功新增商品!" })

        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },

    //刪除產品
    deleteProduct: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id);
            res.json({ msg: "刪除商品!" });

        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },

    //更新產品
    updateProduct: async (req, res) => {
        try {
            const { title, price, description, content, images, category } = req.body;
            if (!images) return res.status(400).json({ msg: "請上傳圖片" });

            await Products.findOneAndUpdate({ _id: req.params.id }, {
                title, price, description, content, images, category
            });

            res.json({ msg: "已更新產品資訊!" });

        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }
};


module.exports = productCtrl;