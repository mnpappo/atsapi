var express = require('express');
var router = express.Router();



// get companies listing
router.get('/', function(req, res, next) {

  var Company = Parse.Object.extend("Company");
  var query = new Parse.Query(Company);

  query.descending("createdAt");

  query.first({
    success: function(company) {
      // Successfully retrieved the object.
      res.json(company);
    },
    error: function(error) {
      res.json(error);
    }
  });

});

// add new company
router.get('/new', function(req, res, next) {

});

// add new company
router.post('/new', function(req, res, next) {
    var params = req.body;
    console.log(params);
    var Company = Parse.Object.extend("Company");
    var company = new Company();

    company.set("companyName", params.companyName);
    company.set("comEmail", params.comEmail);
    company.set("companyAddress", params.companyAddress);
    company.set("companyPhone", params.companyPhone);
    company.set("parent", params.user);

    company.save(null, {
        success: function(company){
            console.log(company);
            res.json(company);
        },
        error: function(company, error){
            console.log(company);
            console.log(error);
            res.json(error);
        }
    });
});

// get a company
router.get('/:id', function(req, res){
  res.render('company/single_company');
});

// update a company
router.put('/:id', function(req, res){
  res.render('company/edit_company');
});

// delete a company
router.delete('/:id', function(req, res){
  res.send('delete a company');
});


module.exports = router;
