var express = require('express');
var router = express.Router();

// get assets listing
router.get('/', function(req, res, next) {
  var Asset = Parse.Object.extend("Asset");
  var query = new Parse.Query(Asset);

  query.descending("createdAt");

  query.find({
    success: function(asset) {
      // Successfully retrieved the object.
      res.json(asset);
    },
    error: function(error) {
      res.json(error);
    }
  });
});

// add new asset
router.get('/new', function(req, res) {
  res.render("asset/add_asset");
});

// add new asset
router.post('/new', function(req, res) {
  var params = req.body;
  console.log(params);
  var Asset = Parse.Object.extend("Asset");
  var asset = new Asset();

  asset.addUnique("tag", params.tag);
  asset.set("type", params.type);
  asset.set("assigned_to", params.assigned_to);
  asset.set("location", params.location);
  user.set("comObjectId", params.comObjectId);


  asset.save(null, {
    success: function(asset){
      console.log(asset);
      res.json(asset);
    },
    error: function(asset, error){
      console.log(asset);
      console.log(error);
      res.json(error);
    }
  });
});


// get a asset
router.get('/:id', function(req, res){
  var object_id = req.params.id;

  var Asset = Parse.Object.extend("Asset");
  var query = new Parse.Query(Asset);

  query.equalTo("objectId", object_id);

  query.first({
    success: function(asset) {
      // Successfully retrieved the object.
      res.json(asset);
    },
    error: function(error) {
      res.json(error);
    }
  });
});

// update a asset
router.put('/:id', function(req, res){
  res.send('update a asset');
});

// delete a asset
router.delete('/:id', function(req, res){
  res.send('delete a asset');
});


module.exports = router;
