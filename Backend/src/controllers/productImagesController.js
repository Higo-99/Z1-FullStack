const db = require('../models/index');

const getting = async (req, res) => {
    const productImages = await db.ProductImages.findAll();
    if (!productImages) {
        res.status(400).json({ message: 'No productImage found' });
    };
    res.json(productImages);
};
const creating = async (req, res) => {
    const { code, name, position, data } = req.body;
    if (!code, !name, !position, !data) {
        res.status(400).json({ message: 'All information needs to be filled' })
    };
    const imageObject = { code, name, position, data };
    const newImage = await db.ProductImages.create(imageObject);
    if (newImage) {
        res.status(201).json({ message: `Image ${name} added` })
    } else {
        res.status(400).json({ message: 'Invalid image data received' })
    };
};
const editting = async (req, res) => {
    const { id, name, position, data } = req.body;
    const theImage = await db.productImages.findOne({ where: { id: id } });
    if (!theImage) {
        res.status(400).json({ message: 'Image not found' })
    } else {
        await db.ProductImages.upsert({
            id: id,
            name: name,
            position: position,
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