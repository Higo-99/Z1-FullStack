const bcrypt = require('bcryptjs');
const db = require('../models/index');

//==== GET ALL USERS ====//
const getting = async (req, res) => {
    const users = await db.User.findAll();
    if (!users) {
        return res.status(400).json({ message: 'No users found' });
    };
    res.json(users);
};

//====CREATE NEW USER ====//
const creating = async (req, res) => {
    const { email, password } = req.body;
    if (!email, !password) {
        return res.status(400).json({ message: 'Email, Password field are required' });
    };
    const duplicate = await db.User.findOne({ where: { email: email } });
    if (duplicate) {
        return res.status(409).json({ message: 'Email has been used' });
    };
    const hashPassword = bcrypt.hashSync(password, 10);
    const userObject = {
        email,
        password: hashPassword
    };

    const newUser = await db.User.create(userObject);
    if (newUser) {
        res.status(201).json({ message: `New user ${email} created` });
    }
    else {
        res.status(400).json({ message: 'Invalid user data received' });
    };
};

//==== UPDATE USER ====//
const editting = async (req, res) => {
    const {
        id, image, firstName, lastName, birthday, address, phoneNumber, gender, roleId
    } = req.body;
    const user = await db.User.findOne({ where: { id: id } });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    } else {
        await db.User.upsert({
            id: id,
            image: image,
            firstName: firstName,
            lastName: lastName,
            birthday: birthday,
            address: address,
            phoneNumber: phoneNumber,
            gender: gender,
            roleId: roleId
        });
    }
    res.json({ message: `${user.email}'s profile has been updated!` });
};

//==== DELETE USER ====//
const deleting = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: `User's ID required!` });
    };
    const user = await db.User.findOne({ where: { id: id } });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    } else {
        await db.User.destroy({ where: { id: id } });
    }
    const reply = `User ${user.email} has been deleted`;
    res.json(reply);
};

module.exports = {
    getting,
    creating,
    editting,
    deleting
};