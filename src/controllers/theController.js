import db from '../models/index'

export const homePagesite = async (req, res) => {
    try {
        const data = await db.User.findAll();
        return (res.render('homepage.ejs', {
            data: JSON.stringify(data)
        }));
    }
    catch (e) {
        console.log(e);
    }
};
