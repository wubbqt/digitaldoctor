const router = require('espress').Router();
const path = require('path');
const Auth = require('./api/Auth');
const apiRoutes = require('./api');


module.exports = function(passport, User) {

    router.use('./api', apiRoutes(passport));
    router.use('Auth', Auth(passport, User));

    router.use((req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
    return router
}