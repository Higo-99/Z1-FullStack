const bcrypt = require('bcryptjs');
const db = require('../models/index');

const getAllUsers = async () => {
    const userInfo = db.User.findAll({ raw: true });
    return (userInfo);
}

const getUserById = async (userId) => {
    const user = await db.User.findOne({ where: { id: userId }, raw: true })
    if (user) {
        return (user);
    }
    else {
        return ('Not found!');
    }
}

const hashUserPassword = (password) => {
    const hashingPassword = bcrypt.hashSync(password, 10);
    return hashingPassword;
}

const createUserData = async (data) => {
    const passwordHashed = await hashUserPassword(data.password);
    await db.User.create({
        email: data.email,
        password: passwordHashed,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender === '1' ? true : false,
        roleId: data.roleId,
        phoneNumber: data.phoneNumber,
    });
    return ('Success!!!');
}

const updateUserInfo = async (newInfo) => {
    const user = await db.User.findOne({
        where: { id: newInfo.id }
    })
    if (user) {
        db.User.upsert({
            id: newInfo.id,
            firstName: newInfo.firstName,
            lastName: newInfo.lastName,
            address: newInfo.address,
            phoneNumber: newInfo.phoneNumber
        });
    }
}

const deleteUser = async (delId) => {
    const user = await getUserById(delId);
    if (user) {
        await db.User.destroy({
            where: { id: delId }
        })
    }
}

module.exports = {
    createUserData,
    getAllUsers,
    getUserById,
    updateUserInfo,
    deleteUser
}
