const express = require('express');

const dormController = require('./controller/dorm.control.js');
const authController = require('./controller/auth.control.js');
const authMiddleware = require('./controller/auth.middleware.js');

const router = express.Router();
router.get('/dorm/new', authMiddleware, (req, res) => {
    res.render('new_dorm');
});

router.get('/dorm/edit/:dormNumber', authMiddleware, (req, res) => {
    dormController.editDormPage(req, res);
});

router.post('/dorm/edit', authMiddleware, (req, res) => {
    dormController.editDorm(req, res);
});

router.post('/dorm/create',authMiddleware, (req, res) => {
    dormController.insertDorm(req, res);
});

router.get('/dorms', authMiddleware,(req, res) => {
    dormController.getDorms(req, res);
});

router.get('/dorm/:dormNumber', authMiddleware, (req, res) => {
    dormController.getDormByDormNumber(req, res);
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    authController.login(req, res);
});

router.get('/logout', (req, res) => {
    authController.logout(req, res);
});

module.exports = router; 