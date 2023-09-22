const homePageSite = async (req, res) => {
    return (res.render('homepage.ejs'));
};

const displayAllUsers = async (req, res) => {
    const dataUsers = await getAllUsers();
    return res.render('displayUserList.ejs', {
        allData: dataUsers
    });
}

const getCreateUser = async (req, res) => {
    return (res.render('createNewUser.ejs'));
}

const intoEditUser = async (req, res) => {
    const userId = req.params.userId;
    if (userId) {
        const userData = await getUserById(userId);
        return res.render('editUser.ejs', { user: userData });
    }
    else {
        return res.send('User not found!')
    }
}

const intoDeleteUser = async (req, res) => {
    const user = req.params.userId;
    const userData = await getUserById(user);
    return res.render('deleteUser.ejs', { delUser: userData });
}

module.exports = {
    homePageSite,
    getCreateUser,
    displayAllUsers,
    intoEditUser,
    intoDeleteUser
}