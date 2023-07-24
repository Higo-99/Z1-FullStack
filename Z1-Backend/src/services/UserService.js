const db = require('../models/index');
const bcrypt = require('bcryptjs');

const checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

const handleUserLogin = (userEmail, userPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userData = {};
            const isExist = await checkUserEmail(userEmail);
            if (isExist) {
                const user = await db.User.findOne({
                    where: { email: userEmail },
                    attributes: ['email', 'firstName', 'lastName', 'roleId', 'password'],
                    raw: true
                })
                if (user) {
                    const checkPassword = await bcrypt.compareSync(userPassword, user.password);
                    if (checkPassword) {
                        userData.errCode = 0;
                        userData.errMessage = 'pass check';
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = `Password incorrect`;
                    }
                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found!!!`;
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = `Your Email doesn't exist. Try again!`;
            }
            resolve(userData);
        }
        catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin
}