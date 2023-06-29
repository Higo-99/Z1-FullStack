import express from 'express'
import { homePagesite, getCRUD, postCRUD } from '../controllers/theController';

const router = express.Router();

const routeweb = (app) => {
    router.get('/', homePagesite);
    router.get('/crud', getCRUD);

    router.post('/post-crud', postCRUD);

    return (
        app.use("/", router)
    )
}

export default routeweb