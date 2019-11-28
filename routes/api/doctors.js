const router = require("express").Router();
const doctorsController = require("../../controllers/doctorsController");
const isAuthenticated = require('../isAuthenticated')

module.exports = function(passport){
  router.route("/")
    .get(isAuthenticated, doctorsController.findAll)
    .post(doctorsController.create);

  router.route("/:id")
    .get(doctorsController.findById)
    .put(doctorsController.update)
    .delete(doctorsController.remove);

  return router;
}

  