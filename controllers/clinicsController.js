const db = require('../models');

module.exports = {
  findAll: function (req, res) {
    db.Clinic
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the findall clinic is not working in clinicscontroller.js error: ' + err));
  },
  findById: function (req, res) {
    db.Clinic
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the findbyid clinic is not working in clinicscontroller.js error: ' + err));

  },
  create: function (req, res) {
    db.Clinic
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err =>
        console.log('the create clinic is not working in clinicscontroller.js error: ' + err));

  },
  update: function (req, res) {
    db.Clinic
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the update clinic is not working in clinicscontroller.js error: ' + err));

  },
  remove: function (req, res) {
    db.Clinic
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log('the remove clinic is not working in clinicscontroller.js error: ' + err));

  }
};
