import db from '../models/index'
import { postInfo, getAllUser, getUserById, updateUserInfo } from '../services/CRUDservice';

const homePagesite = async (req, res) => {
    try {
        const data = await db.User.findAll();
        return (res.render('homepage.ejs', {
            data: JSON.stringify(data)
        }));
    }
    catch (e) {
        console.log(e);
    }
};

const intopostCRUD = async (req, res) => {
    try {
        return (res.render('crud.ejs'));
    }
    catch (e) {
        console.log(e);
    }
}

const postCRUD = async (req, res) => {
    try {
        await postInfo(req.body);
        return res.send('CRUD post succeeded');
    }
    catch (e) {
        console.log(e);
    }
}

const displayCRUD = async (req, res) => {
    try {
        const dataUser = await getAllUser();
        // console.log(dataUser);
        return (res.render('displayCRUD.ejs', {
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
        return (res.render('displayCRUD.ejs', {
            dataTable: newList
        }));
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    homePagesite,
    intopostCRUD,
    postCRUD,
    displayCRUD,
    intoEditCRUD,
    editCRUD
}