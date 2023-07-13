const bcryt = require('bcryptjs');
const db = require('../models/index');

const salt = bcryt.genSaltSync(10);

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashingPassword = await bcryt.hashSync(password, salt);
            resolve(hashingPassword);
        }
        catch (e) {
            reject(e);
        }
    })
}

const postInfo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const passwordHashed = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: passwordHashed,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            resolve('Success!!!');
        }
        catch (e) {
            reject(e);
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const userInfo = db.User.findAll({ raw: true });
            resolve(userInfo);
        }
        catch (e) {
            reject(e);
        }
    })
}

//userId below is from theController.js
const getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({ where: { id: userId }, raw: true })
            if (user) {
                resolve(user);
            }
            else {
                resolve('Not found!');
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

const updateUserInfo = (newInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: newInfo.id }
            })
            if (user) {
                user.firstName = newInfo.firstName;
                user.lastName = newInfo.lastName;
                user.address = newInfo.address;
                await user.save();

                const allNewData = db.User.findAll();
                resolve(allNewData);
            }
            else {
                resolve();
            }
        }
        catch (e) {
            console.log(e);
        }
    })
}

const deleteUser = (delId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: delId }
            });
            if (user) {
                await user.destroy();
            }
            const allNewData = db.User.findAll();
            resolve(allNewData);
        }
        catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postInfo,
    getAllUser,
    getUserById,
    updateUserInfo,
    deleteUser
}
