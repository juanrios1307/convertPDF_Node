const  {Router} =require('express')
const route=Router()
const  controlMain=require('../controllers/controllerMain.js')


route.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin","http://localhost:3000/")
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    next()
});

route.post('/',controlMain.PDF)

module.exports =route
