import express from 'express'
import { homePagesite } from '../controllers/theController';

const router = express.Router();

const routeweb = (app) => {
    router.get('/', homePagesite);

    return (
        app.use("/", router)
    )
}

export default routeweb