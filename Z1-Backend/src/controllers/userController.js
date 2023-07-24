const { handleUserLogin } = require('../services/UserService');

const handleLogin = async (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    if (!userEmail || !userPassword) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter'
        })
    }

    const userData = await handleUserLogin(userEmail, userPassword);


    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

module.exports = { handleLogin }