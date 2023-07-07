import express from 'express'
import { homePagesite, intoCRUD, postCRUD, displayCRUD } from '../controllers/theController';

const router = express.Router();

const routeweb = (app) => {
    router.get('/', homePagesite);
    router.get('/crud', intoCRUD);

    router.post('/post-crud', postCRUD);
    router.get('/getinfo', displayCRUD);

    return (
        app.use("/", router)
    )
}

export default routeweb