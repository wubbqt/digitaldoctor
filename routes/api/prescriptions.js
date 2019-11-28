//these are required
const router = require("express").Router();
const prescriptionsController = require("../../controllers/prescriptionsController");
const isAuthenticated = require('../isAuthenticated')

module.exports = function(passport){
    router.route("/")
        .get(isAuthenticated, prescriptionsController.findAll)
        .post(prescriptionsController.create);

    router.route("/:id")
        .delete(prescriptionsController.remove)
        .get(isAuthenticated, prescriptionsController.findById)
        .put(prescriptionsController.update);

    return router;
}

