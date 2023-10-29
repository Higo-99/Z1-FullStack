const db = require('../models/index');
const { Op } = require("sequelize");

const getting = async (req, res) => {
    const productImages = await db.ProductImages.findAll();
    if (!productImages) {
        res.status(400).json({ message: 'No productImage found' });
    };
    res.json(productImages);
};

const creating = async (req, res) => {
    const { code, name, stand, data } = req.body;
    if (!code, !name, !stand, !data) {
        res.status(400).json({ message: 'All information needs to be filled' })
    };

    const duplicate = await db.ProductImages.findOne({
        where: {
            [Op.and]: [
                { name: name },
                { code: code }
            ]
        }
    });
    if (duplicate) {
        return res.status(409).json({ message: 'There are image already has been saved' });
    };

    const imageObject = { code, name, stand, data };
    const newImage = await db.ProductImages.create(imageObject);
    if (newImage) {
        res.status(201).json({ message: `Image ${name} for product ${code} added succeed` })
    } else {
        res.status(400).json({ message: 'Invalid image data received' })
    };
};

const editting = async (req, res) => {
    const { id, name, stand, data } = req.body;
    const theImage = await db.productImages.findOne({ where: { id: id } });
    if (!theImage) {
        res.status(400).json({ message: 'Image not found' })
    } else {
        await db.ProductImages.upsert({
            id: id,
            name: name,
            stand: stand,
            data: data
        })
    };
    res.json({ message: `Producy ${theImage.code}'s image has been updated!` });
};

const deleting = async (req, res) => {
    const { id } = req.body;
    const theImage = await db.ProductImages.findOne({ where: { id: id } });
    if (!theImage) {
        res.status(400).json({ message: 'Image not found' })
    } else {
        await db.ProductImages.destroy({ where: { id: id } })
    };
    const reply = `Image ${theImage.name} has been deleted`;
    res.json(reply);
};

module.exports = {
    getting,
    creating,
    editting,
    deleting
};