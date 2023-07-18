const bcryt = require('bcryptjs');
const DBconection = require('../config/DBconection');
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

const createUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const { email, password, firstName, lastName, address, phoneNumber, gender, roleId } = data;
            // const passwordHashed = await hashUserPassword(password);
            // const [results, fields] = await DBconection.query(
            //     `INSERT INTO Users (email, password, firstName, lastName, address, phoneNumber, gender, roleId)
            // VALUES ( ?, ?, ?, ?, ?, ?, ?, ? )`,
            //     [email, passwordHashed, firstName, lastName, address, phoneNumber, gender, roleId]
            // );
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
            // const [results, fields] = await DBconection.query('SELECT * FROM Users');
            // resolve(results);
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
            // const [results, fields] = await DBconection.query(`SELECT * FROM Users WHERE id = ?`, [userId]);
            // if (results && results.length > 0) {
            //     resolve(results[0]);
            // }
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
            const [results, fields] = await DBconection.query(`UPDATE Users 
            SET firstName = ?, lastName = ?, address = ?, phoneNumber = ?
            WHERE id = ?`,
                [newInfo.firstName, newInfo.lastName, newInfo.address, newInfo.phoneNumber, newInfo.id])
            resolve(results);
        }
        catch (e) {
            console.log(e);
        }
    })
}

const deleteUser = (delId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const [results, fields] = await DBconection.query(`DELETE FROM Users WHERE id = ?`, [delId]);
            resolve(results);
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
