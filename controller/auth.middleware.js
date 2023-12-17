
const mock = require('../mock/mock_api.js');

const authMiddleware = (req, res, next) => {
    return next();
    const { user } = req.session;
    if (req.session.user || mock.isLoggedIn(user)) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = authMiddleware;