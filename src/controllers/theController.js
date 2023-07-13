const db = require('../models/index');
const { postInfo, getAllUser, getUserById,
    updateUserInfo, deleteUser } = require('../services/CRUDservice');
const DBconection = require('../config/DBconection');

const homePagesite = async (req, res) => {
    try {
        // DBconection.query(
        //     'SELECT * FROM Users',
        //     function (err, results, fields) {
        //         const data = results;
        //         return (res.render('homepage.ejs', {
        //             data: JSON.stringify(data)
        //         }));
        //     }
        // );

        return (res.render('homepage.ejs'));
    }
    catch (e) {
        console.log(e);
    }
};

const intoCreateUser = async (req, res) => {
    try {
        return (res.render('createNew.ejs'));
    }
    catch (e) {
        console.log(e);
    }
}

const postCreate = async (req, res) => {
    try {
        // await postInfo(req.body);
        const creatData = await req.body;
        console.log(creatData);
        return res.send('CRUD post succeeded');
    }
    catch (e) {
        console.log(e);
    }
}

const displayAllUsers = async (req, res) => {
    try {
        const dataUser = await getAllUser();
        return (res.render('displayAllUsers.ejs', {
            dataTable: dataUser
        }));
    }
    catch (e) {
        console.log(e);
    }
}

const intoEditCRUD = async (req, res) => {
    try {
        const userId = req.query.id;
        if (userId) {
            const userData = await getUserById(userId);
            return res.render('editCRUD.ejs', { user: userData })
        }
        else {
            return res.send('User not found!')
        }
    }
    catch (e) {
        console.log(e);
    }
}

const editCRUD = async (req, res) => {
    try {
        const newData = req.body;
        const newList = await updateUserInfo(newData);
        return (res.render('displayAllUsers.ejs', {
            dataTable: newList
        }));
    }
    catch (e) {
        console.log(e);
    }
}

const intoDeleteCRUD = async (req, res) => {
    const userId = req.query.id;
    if (userId) {
        const newList = await deleteUser(userId);
        return (res.render('displayAllUsers.ejs', {
            dataTable: newList
        }));
    }
    else {
        return res.send('User not found!!!');
    }
}

module.exports = {
    homePagesite,
    intoCreateUser,
    postCreate,
    displayAllUsers,
    intoEditCRUD,
    editCRUD,
    intoDeleteCRUD
}