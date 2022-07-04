var express = require("express"),
  http = require("http"),
  app = express(),
  fs = require('fs');

var create = require('express-handlebars').create;
var hbs = create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

http.createServer(app).listen(3000); 

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req,res,next){
	res.render('home',{});
});

app.get("/faq",function(req,res,next){
	res.render('faq',{});
});

app.get("/sign",function(req,res,next){
        res.render('sign',{});
});

app.get("/support",function(req,res,next){
	res.render('support',{});
});

app.post("/todos", function (req, res) {
  var newToDo = req.body;
  var rawdata = fs.readFileSync(__dirname + '/client/todos.json');
  var todos = JSON.parse(rawdata);
  todos.push(newToDo);
  var data = JSON.stringify(todos);
  fs.writeFileSync(__dirname + '/client/todos.json', data); 
  res.json({
    "message": "Вы размещаетесь на сервере!"
  });
});
