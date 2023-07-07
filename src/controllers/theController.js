import db from '../models/index'
import { postInfo, getAllUser } from '../services/CRUDservice';

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

const intoCRUD = async (req, res) => {
    try {
        return (res.render('crud.ejs'));
    }
    catch (e) {
        console.log(e);
    }
}

const postCRUD = async (req, res) => {
    try {
        const result = await postInfo(req.body);
        console.log(result);
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

module.exports = {
    homePagesite,
    intoCRUD,
    postCRUD,
    displayCRUD
}