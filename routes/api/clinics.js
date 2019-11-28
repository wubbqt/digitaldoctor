const router = require("express").Router();
const clinicsController = require("../../controllers/clinicsController");
const isAuthenticated = require('../isAuthenticated')

module.exports = function(passport){
  router.route("/")
    .get(isAuthenticated, clinicsController.findAll)
    .post(clinicsController.create);

  router.route("/:id")
    .get(isAuthenticated, clinicsController.findById)
    .put(clinicsController.update)
    .delete(clinicsController.remove);

  return router;
}
