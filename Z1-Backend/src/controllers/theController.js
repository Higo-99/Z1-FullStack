const { createUserData, getAllUsers, getUserById,
    updateUserInfo, deleteUser } = require('../services/CRUDservice');

const homePagesite = async (req, res) => {
    try {
        return (res.render('homepage.ejs'));
    }
    catch (e) {
        console.log(e);
    }
};


const getCreateUser = async (req, res) => {
    try {
        return (res.render('createNewUser.ejs'));

    }
    catch (e) {
        console.log(e);
    }
}


const postCreating = async (req, res) => {
    try {
        const newdata = await req.body;
        await createUserData(newdata);
        return res.redirect('/allUsers');

    }
    catch (e) {
        console.log(e);
    }
}


const displayAllUsers = async (req, res) => {
    try {
        const dataUsers = await getAllUsers();
        return res.render('displayUserList.ejs', {
            allData: dataUsers
        });

    }
    catch (e) {
        console.log(e);
    }
}

const intoEditUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (userId) {
            const userData = await getUserById(userId);
            console.log(userData);
            return res.render('editUser.ejs', { user: userData })

        }
        else {
            return res.send('User not found!')
        }
    }
    catch (e) {
        console.log(e);
    }
}


const postEdit = async (req, res) => {
    try {
        const newData = req.body;
        await updateUserInfo(newData);
        return res.redirect('/allUsers');

    }
    catch (e) {
        console.log(e);
    }
}


const intoDeleteUser = async (req, res) => {
    try {
        const user = req.params.userId;
        const userData = await getUserById(user);
        return res.render('deleteUser.ejs', { delUser: userData });
    }
    catch (e) {
        console.log(e);
    }
}

const deleteUserById = async (req, res) => {
    const user = req.body.id;
    if (user) {
        await deleteUser(user);
        return res.redirect('/allUsers');

    }
    else {
        return res.send('User not found!!!');
    }
}

module.exports = {
    homePagesite,
    getCreateUser,
    postCreating,
    displayAllUsers,
    intoEditUser,
    postEdit,
    intoDeleteUser,
    deleteUserById
}