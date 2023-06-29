import db from '../models/index'
import CRUDservice from '../services/CRUDservice';

export const homePagesite = async (req, res) => {
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

export const getCRUD = async (req, res) => {
    try {
        return (res.render('crud.ejs'));
    }
    catch (e) {
        console.log(e);
    }
}

export const postCRUD = async (req, res) => {
    try {
        const result = await CRUDservice(req.body);
        console.log(result);
        return res.send('post CRUD');
    }
    catch (e) {
        console.log(e);
    }
}