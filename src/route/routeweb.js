const express = require('express');
const {
    homePagesite, getCreateUser, postCreating, displayAllUsers,
    intoEditUser, postEdit, intoDeleteUser, deleteUserById
} = require('../controllers/theController');
const router = express.Router();

router.get('/', homePagesite);

router.get('/createUser', getCreateUser);
router.post('/creating', postCreating);

router.get('/allUsers', displayAllUsers);

router.get('/editUser/:userId', intoEditUser);
router.post('/editting', postEdit);

router.get('/deleteUser/:userId', intoDeleteUser);
router.post('/deleteCurrentUser', deleteUserById);

module.exports = router;