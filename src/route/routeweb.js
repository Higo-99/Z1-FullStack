const express = require('express');

const {
    homePagesite, intoCreateUser, postCreate, displayAllUsers,
    intoEditCRUD, editCRUD, intoDeleteCRUD
} = require('../controllers/theController');

const router = express.Router();

router.get('/', homePagesite);

router.get('/createUser', intoCreateUser);
router.post('/create', postCreate);

router.get('/allUsers', displayAllUsers);
router.get('/edit-crud', intoEditCRUD);
router.post('/put-crud', editCRUD);

router.get('/delete-crud', intoDeleteCRUD);

module.exports = router;