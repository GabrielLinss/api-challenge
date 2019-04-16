const express = require('express');
const router = express.Router();
const ToolController = require('../app/controllers/ToolController');
const UserController = require('../app/controllers/UserController');
const authMiddleware = require('../app/middlewares/auth');
require('express-group-routes');

router.group('/api', (router) => {
    router.use(authMiddleware);

    router.get('/tools?:tag', ToolController.all);
    router.post('/tools', ToolController.save);
    router.delete('/tools/:id', ToolController.delete);
});

router.group('/u', (router) => {
    router.get('/users', UserController.all);
    router.post('/users', UserController.save);
    router.delete('/users/:id', UserController.delete);
    router.post('/users/authenticate', UserController.authenticate);
});

module.exports = app => app.use('/', router);