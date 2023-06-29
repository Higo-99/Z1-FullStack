import bcryt from 'bcryptjs';
import db from '../models/index'

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

const CRUDservice = (data) => {
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

export default CRUDservice