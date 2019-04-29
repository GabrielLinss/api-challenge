const router = require('express').Router();
const ToolController = require('../app/controllers/ToolController');
const UserController = require('../app/controllers/UserController');
const Auth = require('../app/middlewares/Auth');
require('express-group-routes');

const authMiddleware = new Auth();
const tc = new ToolController();
const uc = new UserController();

router.group('/api', (router) => {
    router.use((req, res, next) => {
        authMiddleware.interceptRequest(req, res, next);
    });

    router.get('/tools?:tag', tc.all);
    router.post('/tools', tc.save);
    router.delete('/tools/:id', tc.delete);
});

router.group('/u', (router) => {
    router.get('/users', uc.all);
    router.post('/users', uc.save);
    router.delete('/users/:id', uc.delete);
    router.post('/users/authenticate', uc.authenticate);
});

module.exports = app => app.use('/', router);