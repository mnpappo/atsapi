var express = require('express');
var crypto = require('crypto');
var router = express.Router();

// get users listing
router.get('/', function(req, res, next) {
  var params = req.body;
  var query = new Parse.Query(Parse.User);

  query.equalTo("company", params.comObjectId);
  query.descending("createdAt");

  query.first({
    success: function(user) {
      // Successfully retrieved the object.
      res.json(user);
    },
    error: function(error) {
      res.json(error);
    }
  });
});

// new user form
router.get('/new', function(req, res) {
  res.render("user/add_user");
});

// add new user
router.post('/new', function(req, res) {
  console.log('got signup req!');
    var params = req.body;
    console.log(params);
    var user = new Parse.User();

    var sessionToken = Parse.User.current().getSessionToken();


    var epassword = crypto.createHash('md5').update(params.password).digest('hex');

    user.set("fullName", params.fullName);
    user.set("username", params.username);
    user.set("email", params.email);
    user.set("password", epassword);
    user.set("userType", params.userType);
    user.set("comObjectId", params.company);


    user.signUp(null, {
        success: function(user){
            console.log(user);
            Parse.User.become(sessionToken);
            res.json(user);
        },
        error: function(user, error){
            console.log(user);
            console.log(error);
            res.json(error);
        }
    });
});

// get a user
router.get('/:id', function(req, res){
  var object_id = req.params.id;

  var query = new Parse.Query(Parse.User);

  query.equalTo("objectId", object_id);

  query.first({
    success: function(user) {
      // Successfully retrieved the object.
      res.json(user);
    },
    error: function(error) {
      res.json(error);
    }
  });
});

// update a user
router.put('/:id', function(req, res){
  res.send("update a user");
});

// delete a user
router.delete('/:id', function(req, res){
  res.send("delete a user");
});


module.exports = router;
