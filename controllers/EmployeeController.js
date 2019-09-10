var mongoose = require("mongoose");
var Employee = require("../models/Employee");
const Joi = require('Joi');

var employeeController = {};

// Show list of employees
employeeController.list = function (req, res) {
  Employee.find({}).exec(function (err, employees) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      // res.render("../views/employees/index", {employees: employees});
      res.send(employees);
    }
  });

};

// Show employee by id
employeeController.show = function (req, res) {
  Employee.findOne({ _id: req.params.id }).exec(function (err, employee) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/employees/show", { employee: employee });
    }
  });
};

// Create new employee
employeeController.create = function (req, res) {
  res.render("../views/employees/create");
};

// Save new employee
employeeController.save = function (req, res) {

  var employee = new Employee(req.body);
  const schema = Joi.object().keys({
    userID: Joi.string(),
    name: Joi.string(),
    phone: Joi.number(),
    password: Joi.string()
  });
  Joi.validate(req.body, schema, (err, response) => {
    if (err) {
      console.log('error occured');
      console.log(err)
    } else {
      employee.save(function (err) {
        if (err) {
          console.log(err);
          response.render("../views/employees/create");
        } else {
          console.log("Successfully created an employee.");
          res.send(employee);
        }
      })

    }

  })


};

// Edit an employee
employeeController.edit = function (req, res) {
  Employee.findOne({ _id: req.params.id }).exec(function (err, employee) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/employees/edit", { employee: employee });
    }
  });
};

// Update an employee
employeeController.update = function (req, res) {
  Employee.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary } }, { new: true }, function (err, employee) {
    if (err) {
      console.log(err);
      res.render("../views/employees/edit", { employee: req.body });
    }
    res.redirect("/employees/show/" + employee._id);
  });
};

// Delete an employee
employeeController.delete = function (req, res) {
  Employee.remove({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Employee deleted!");
      res.redirect("/employees");
    }
  });
};

module.exports = employeeController;
