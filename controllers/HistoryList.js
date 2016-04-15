Parse.initialize("myAppId", "jsKey", "myMasterKey");
Parse.serverURL = 'http://localhost:1337/parse';
var asset_info = Parse.Object.extend("History");
var query = new Parse.Query(asset_info);
query.descending("date");

query.find({
    success: function(results) {

	for (var i = 0; i < results.length; i++) {
            var object = results[i];
            
	    console.log("Asset ID  "+object.get('asset_id')+"  Modified By  "+object.get("modified_by")+ " Modified Date: "+object.get('date'));
        }
    },
    error: function(error) {
        alert("Error: " + error.code + " " + error.message);
    }
});

