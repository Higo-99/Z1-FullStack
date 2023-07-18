const express = require('express');

const {
    homePagesite, intopostCRUD, postCRUD, displayCRUD,
    intoEditCRUD, editCRUD, intoDeleteCRUD
} = require('../controllers/theController');

const router = express.Router();

router.get('/', homePagesite);

router.get('/crud', intopostCRUD);
router.post('/post-crud', postCRUD);

router.get('/getinfo', displayCRUD);
router.get('/edit-crud', intoEditCRUD);
router.post('/put-crud', editCRUD);

router.get('/delete-crud', intoDeleteCRUD);

module.exports = router;