var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mustacheExpress = require('mustache-express');
var session = require('express-session');
let connectionString = 'postgres://geomancer.clw53lchrbyq.us-east-1.rds.amazonaws.com';
var app=express();
var mappublisher = require('./routes/mappublisher')
var db = require('./models/index');
var User = db.users
var Player = db.players
const jwt = require('jsonwebtoken')
app.use(express.static('public'))
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
app.use('/mappublisher',mappublisher)
app.engine('mustache', mustacheExpress());
app.set('views','./views');
app.set('view engine', 'mustache');
app.set('port',3100);
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept,Authorization ");
    next();
});
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret:'imlost',
    resave: false,
    saveUninitialized: false,
    cookie:{expires: 86400000}}));

function authenticate(req,res,next){
    const authorizationHeader = req.headers['authorization']
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token,'amazonwarrior',function(error,decoded){
        if(error){res.status(400).json({error : "Authorization failed..."})}
        const userId = decoded.userId
        if(!userId) {res.status(400).json({error : "User not found"})}
        else{next()}})}

app.get('/',function(req,res) {res.render('login')})
app.get('/control',function(req,res){res.render('controlPanel',{username : req.session.user})})
app.get('/login',function(req,res) {res.render('login')})
app.get('/signup',function(req,res) {res.render('signup')})
app.get('/creation',function(req,res) {res.render('creation',{username : req.session.user})})
app.get('/world-viewer', function (req, res, next) {
    
    db.map_publishers.findAll({
        attributes: ['id', 'mapname','createdAt']
    })
        .then(function(maps){
            res.render('world-viewer',{username : req.session.user,maps:maps})
        })
        .catch((error) => { 
            console.log(error)
            //return 
            res.json({
            error: true,
            data: [],
            error: error})})
            })
    
    
app.get('/darkside',function(req,res) {res.render('darkside',{username : req.session.user})})
app.get('/postmap',function(req,res) {res.redirect('/creation')})

app.route('/login')
    .post((req,res) => {
        var username = req.body.username;
        var password = req.body.password;
        User.findOne({where: {username : username }})
        .then(function (user){
            if (!user) {
                console.log('wrong')
                res.redirect('/signup');
            }
 //           else if (!user.validPassword(password)){
 //               console.log('try again')
 //               res.redirect('/signup');
 //           }
            else {
                req.session.user = user.dataValues;
                res.redirect('/control');
            }
        });
    });


app.get('/logout', (req, res) => {
        req.session.destroy();
        res.clearCookie('user_sid');
        res.redirect('/');
    });

app.get('/map/:id',authenticate, function (req, res) {
    var mapid = req.params.id
    db.map_publishers.findOne({where: {id : mapid}})
            .then(function(mapdata){               
                res.json(mapdata)
            })
            .catch((error) => { 
                console.log(error)
                //return 
                res.json({
                error: true,
                data: [],
                error: error})})
                })

app.get('/maps',authenticate, function (req, res) {
    console.log('###################')
    db.map_publishers.findAll({attributes: ['id', 'mapname','createdAt','mh', 'mw']})
            .then(function(maps){res.json(maps)})
            .catch((error) => { 
                console.log(error)
                res.json({
                error: true,
                data: [],
                error: error})})
    })

    app.post('/playerlogin',function(req,res){
        let playerUsername = req.body.username
        let playerPassword = req.body.password
       console.log(req.body)
       Player.findOne({where: {username : playerUsername }})
        .then(function (player){  
            if(player == undefined) {
                res.status(400).json({error : "User not found"})
                return
            }
            const token = jwt.sign({userId : player.id}, "amazonwarrior")
            res.status(200).json({token : token})
            if(player.username == playerUsername && player.password == playerPassword){
                console.log('logged in: ',player.username)
            }
        })
    })

app.get('/*',function(req,res){res.render('home')})
app.listen(3100, () => console.log('The Geomancer is listening!'))
