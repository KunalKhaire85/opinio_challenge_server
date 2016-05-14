var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
var app = express();
var fs = require("fs");
var fs = require("fs");
var dirname = "C:\opinio_data";
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/addcoupon',function (req, res) {
  var post_data = req.body;
  console.log(post_data);
 
	//read the json file
	var configFile = fs.readFileSync('./coupons.json');
    var config = JSON.parse(configFile);
	var merchant = config[post_data.id] || {merchantName: post_data.name, coupons: []}
	var coupon = {
		couponName: post_data.coupon,
		discount: post_data.discount,
		type: post_data.type,
		validity: post_data.validity,
		description: post_data.description
	}
	merchant.coupons.push(coupon)
	config[post_data.id] = merchant;
	var configJSON = JSON.stringify(config);
    fs.writeFileSync('./coupons.json', configJSON);
	
	 res.send({"response":"received the info"});
})


app.use('/addlocation',function (req, res) {
  var post_data = req.body;
  var params =  req.params;
  console.log(post_data);
 console.log("PARAMS "+params.id);
	//read the json file
	var configFile = fs.readFileSync('./users.json');
    var config = JSON.parse(configFile);
	var user = config[post_data.id] || {id: post_data.id, locations: []}
	var location = {
		timestamp: post_data.timestamp,
		batterylevel: post_data.batterylevel,
		latitude:post_data.latitude,
		longitude:post_data.longitude,
		altitude:post_data.altitude
	}
	user.locations.push(location)
	config[post_data.id] = user;
	var configJSON = JSON.stringify(config);
    fs.writeFileSync('./users.json', configJSON);
	
	 res.send({"response":"received the info"});
})


app.get('/',function (req,res){
	
	res.send("i m root");
	
})
app.get('/listUsers', function (req, res) {
   fs.readFile("./users.json", 'utf8', function (err, data) {
       //console.log( data );
       res.send( data);
   });
})

app.post('/addcoupon',function(req,res){
	res.send("received the info");
	//read the json file
	var configFile = fs.readFileSync('./coupons.json');
    var config = JSON.parse(configFile);
	console.log("READ values "+config);
	
	console.log("Request received "+req.body.discount);
	//read the request
	reqData = req.body;
	
	
	//append the request to the file 
	config.push(reqData);
	
	var configJSON = JSON.stringify(config);
	
	
    fs.writeFileSync('./coupons.json', configJSON);
   });

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);

})