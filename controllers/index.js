/* Dashboard controller */
var request = require('request');
var express = require('express');
var Parse = require('parse/node');
var crypto = require('crypto');
var router = express.Router();

/* GET landing page. */
router.get('/', function(req, res) {
  var cur_user = Parse.User.current();

    if (cur_user) {
        Parse.User.current().fetch().then(function (user) {
            if(user != null) {
                res.json(user);
            }
        });
    }
    else {
        res.json(cur_user);
    }
});

// add user
router.post('/', function(req, res) {
    console.log('got signup req!');
    var params = req.body;
    console.log(params);
    var user = new Parse.User();

    // var epassword = crypto.createHash('md5').update(params.password).digest('hex');

    user.set("fullName", params.fullName);
    user.set("username", params.username);
    user.set("email", params.email);
    user.set("password", params.password);
    user.set("userType", "Admin");

    user.signUp(null, {
        success: function(user){
            console.log(user);
            res.json(user);
        },
        error: function(user, error){
            console.log(user);
            console.log(error);
            res.json(error);
        }
    });

});

// company count
router.post('/companyCount', function(req, res) {
    var params = req.body;
    console.log(params);
    var Company = Parse.Object.extend("Company");
    var query = new Parse.Query(Company);

    query.equalTo("parent", params.parent);
    // query.include("parent");
    query.count({
      success: function(companyCount) {
        res.json(companyCount);
      },
      error: function(error) {
        res.json(error);
      }
    });

});


// company info by userobject
router.post('/companyByuser', function(req, res) {
  var params = req.body;
  var Company = Parse.Object.extend("Company");
  var query = new Parse.Query(Company);

  query.equalTo("parent", params.parent);

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



/* GET dashboard page. */
router.get('/dashboard', function(req, res, next) {
    var cur_user = Parse.User.current();

    if (cur_user) {
        Parse.User.current().fetch().then(function (user) {
            if(user != null) {
                res.json(user);
            }
        });
    }
    else {
        res.json(cur_user);
    }


});



// login
router.post('/login', function(req, res, next) {

    console.log('got login req!');
    var params = req.body;
    console.log(params);

    // var epassword = crypto.createHash('md5').update(params.password).digest('hex');

    Parse.User.logIn(params.username, params.password, {
        success: function(user) {
            res.json(user);
        },
        error: function(user, error) {
            res.json(error);
        }
    });
});

// logout
router.get('/logout', function(req, res) {
    var currentUser = Parse.User.current();
    if (currentUser) {
        Parse.User.logOut();
        currentUser = null;

        var userId = JSON.parse(currentUser);

        res.json(userId);
    } else {
        var userId = JSON.parse(currentUser);

        res.json(userId);
    }
});


// get profile page
router.get('/profile', function(req, res, next) {

    Parse.User.current().fetch().then(function (user) {
        res.json(user);
    });

});

module.exports = router;
