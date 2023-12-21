
const path = require('path');

const getting = async (req, res) => { };

const creating = async (req, res) => {

    const files = req.files;
    console.log(files);
};

const editting = async (req, res) => { };

const deleting = async (req, res) => { };

module.exports = {
    getting,
    creating,
    editting,
    deleting
};