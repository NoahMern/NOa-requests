
const AuthAPI = require('../mock/mock_api.js');

class AuthController {
    static async login(req, res) {
        const { username, password } = req.body;
        const login = AuthAPI.loginProctor(username, password);
        if (login) {
            req.session.user = username;
            res.redirect('/dorms');
        } else {
            res.render('login', { error: 'Invalid ID or password' });
        }
    }

    static async logout(req, res) {
        req.session.destroy();
        res.redirect('/login');
    }
}

module.exports = AuthController;