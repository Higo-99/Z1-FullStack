const db = require('../models/index');
const { Op } = require("sequelize");

//==== GET ALL USERS ====//
const getting = async (req, res) => {
    const products = await db.Products.findAll();
    if (!products) {
        return res.status(400).json({ message: 'No users found' });
    };
    res.json(products);
};

const creating = async (req, res) => {
    const {
        images, label, code, stock, volume, price, prevPrice, type, fragrance, description
    } = req.body;
    if (!label, !code, !price) {
        return res.status(400).json({ message: 'Label, Code, Price field are required' });
    };

    const duplicate = await db.Products.findOne({
        where: {
            [Op.or]: [
                { label: label },
                { code: code }
            ]
        }
    });
    if (duplicate) {
        return res.status(409).json({ message: 'This product already has in store' });
    };

    const productObject = {
        images, label, code, stock, volume, price, prevPrice, type, fragrance, description
    };
    const newProduct = await db.Products.create(productObject);
    if (newProduct) {
        res.status(201).json({ message: `Add ${label} successfully` });
    }
    else {
        res.status(400).json({ message: 'Invalid product data received' });
    };
};

const editting = async (req, res) => {
    const {
        id, images, label, code, stock, volume, price, prevPrice, type, fragrance, description
    } = req.body;

    const duplicate = await db.Products.findOne({
        where: {
            [Op.and]: [
                { label: label },
                { code: code }
            ]
        }
    });
    if (duplicate) {
        return res.status(409).json({ message: 'This product already has in store' });
    };

    const theProduct = await db.Products.findOne({ where: { id: id } });
    if (!theProduct) {
        return res.status(400).json({ message: 'Product not found' });
    } else {
        await db.Products.upsert({
            id: id,
            images: images,
            label: label,
            code: code,
            stock: stock,
            volume: volume,
            price: price,
            prevPrice: prevPrice,
            type: type,
            fragrance: fragrance,
            description: description,
        });
    }
    res.json({ message: `Product ${theProduct.code}'s data has been updated!` });
};

const deleting = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: `Product's ID required!` });
    };
    const theProduct = await db.Products.findOne({ where: { id: id } });
    if (!theProduct) {
        return res.status(400).json({ message: 'Product not found' });
    }
    else {
        await db.Products.destroy({ where: { id: id } });
    }
    const reply = `Product ${theProduct.code} has been deleted`;
    res.json(reply);
};

module.exports = {
    getting,
    creating,
    editting,
    deleting
};