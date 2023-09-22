const bcrypt = require('bcryptjs');
const db = require('../models/index');

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashingPassword = await bcrypt.hashSync(password, salt);
            resolve(hashingPassword);
        }
        catch (e) {
            reject(e);
        }
    })
}


const createUserData = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
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
            })
            resolve('Success!!!');
        }
        catch (e) {
            reject(e);
        }
    })
}


const getAllUsers = async () => {

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
                await db.User.destroy({
                    where: { id: delId }
                });
            }
            resolve();
        }
        catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createUserData,
    getAllUsers,
    getUserById,
    updateUserInfo,
    deleteUser
}