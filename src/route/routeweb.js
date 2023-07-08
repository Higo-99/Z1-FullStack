import express from 'express'
import {
    homePagesite,
    intopostCRUD,
    postCRUD,
    displayCRUD,
    intoEditCRUD,
    editCRUD,
    intoDeleteCRUD
} from '../controllers/theController';

const router = express.Router();

const routeweb = (app) => {
    router.get('/', homePagesite);

    router.get('/crud', intopostCRUD);
    router.post('/post-crud', postCRUD);

    router.get('/getinfo', displayCRUD);
    router.get('/edit-crud', intoEditCRUD);
    router.post('/put-crud', editCRUD);

    router.get('/delete-crud', intoDeleteCRUD);

    return (
        app.use("/", router)
    )
}

export default routeweb