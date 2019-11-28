const router = require("express").Router();
const attachmentsController = require("../../controllers/attachmentsController");
const isAuthenticated = require('../isAuthenticated')

module.exports = function(passport){
  router.route("/")
    .get(isAuthenticated, attachmentsController.findAll)
    .post(attachmentsController.create);

  router.route("/:id")
    .get(isAuthenticated, attachmentsController.findById)
    .put(attachmentsController.update)
    .delete(attachmentsController.remove);

  return router;
}