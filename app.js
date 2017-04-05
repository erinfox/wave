let express = require("express");
let app = express();
let mustacheExpress = require("mustache-express");
let bodyParser = require("body-parser");
let pgp = require("pg-promise")();
let session = require('express-session');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);

app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/html");
app.use("/", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.listen(3000, function(){
    console.log("aloha, it's working!");
  }) //app.listen

let db = pgp("postgres://erinfox@localhost:5432/wave_db")






















//*************************START SESSION******************
// app.use(session({
//   secret: 'wavezzz',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }))

//**********************LOG IN********************
// app.post('/login', function(req, res){
//   let data = req.body;
//   db
//     .one ('SELECT * FROM users WHERE EMAIL = $1', [data.email])
//     .catch(function(){
//       res.send("Authrization Failed: Invalid Email/Password");
//       //means user is not in the db
//     })
//     .then(function(user){
//       bcrypt
//         .compare(data.password, user.password_digest, function(err, cmp){
//           if(cmp){
//             req.session.user = user; //true
//             res.redirect("/");
//             //create a session
//           } else {
//             res.send("Authrization Failed: Invalid Email/Password");
//           } //else
//         }) //compare
//     }) //.then
// }); //.post



//**********************SIGN UP********************
// app.get('/signup', function(req, res){
//   res.render('signup/index');
// });

// app.post('/signup', function(req, res){
//   let data = req.body;


//   bcrypt
//     .hash(data.password, 10, function(err,hash){
//        db
//       .none('INSERT INTO users(email, password_digest) VALUES($1,$2)',
//         [data.email,hash])
//        .then(function(){
//         res.send('User Created!')
//        }) //.then
//     }) //.hash
//     }); //.post


// //**********************LOG OUT********************
// app.get('/logout', function(req, res){
//   req.session.user = false;
//   res.redirect("/");
// }); //. logout





