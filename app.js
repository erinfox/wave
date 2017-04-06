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
app.use(session({
  secret: 'wavezzz',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/', function(req, res){
  if (req.session.user){
    //user is logged in
    let data = {
      "logged_in": true,
      "email": req.session.user.email
    } //data
    res.render('index', data);
  } else {
    //user is not logged in
    res.render('index');
  } //else
}); //app.get

//*************** "HOME" PAGE ****************//
app.get('/', function(req, res){
  res.render("index");
}) //.get

//**********************LOG IN********************
app.post('/login', function(req, res){
  let data = req.body;
  let error = 'Oops! Invalid email/password.';

  db
    .one('SELECT * FROM surfers WHERE email = $1', [data.email])
    .catch(function(){
      res.send(error);
      //means user is not in the db

    })
    .then(function(user){
      bcrypt
        .compare(data.password, user.password, function(err, cmp){
          if(cmp){
            req.session.user = user;
            res.redirect("/surfers");
            //create a session
          } else {
            res.send(error);
          } //else
        }); //compare
    }); //.then
}); //.post





//**********************SIGN UP********************
app.get('/sign_up', function(req, res){
  // res.render('sign_up/index');
  db
    .any("SELECT * FROM wave_break")
    .then(function(data){
      console.log(data)
      let view_data = {
        waves: data,
      }
      res.render('sign_up/index', view_data);
    })
});

app.post('/sign_up', function(req, res){
  let data = req.body;
  // console.log(data)

  bcrypt
    .hash(data.password, 10, function(err,hash){
       db
      .none('INSERT INTO surfers(name, skill_level, favorite_break_id, email, password) VALUES($1,$2,$3,$4,$5)',
        [data.name, data.skill_level, data.favorite_break_id, data.email,hash])
       .then(function(){
        res.redirect('/surfers')
       }) //.then
    }) //.hash
    }); //.post






//*************** SURFERS PAGE ****************//

app.get('/surfers', function(req, res){
  db
    .any("SELECT * FROM surfers")
    .then(function(data){
      // console.log(data)

      let view_data = {
        surfers: data
      }//view_data
       res.render("surfers/index", view_data);
    });//.then
}); //app.get

//*************** INDIVIDUAL SURFER PAGE ****************//

app.get('/surfers/:id', function(req, res){
        let id = req.params.id

  db
    .one("SELECT * FROM surfers WHERE id = " + id)
    .then(function(data){
      // console.log(data)
      let view_data = {
        surfers: data
      }//view_data
       res.render("surfers/show", view_data);
    });//.then
}); //app.get

//*************** WAVE_BREAK PAGE ****************//

app.get('/wave_break', function(req, res){
  db
    .any("SELECT * FROM wave_break")
    .then(function(data){
      let view_data = {
        wave_break: data
      }//view_data
       res.render("wave_break/index", view_data);
    });//.then
}); //app.get




// ----entering in new wave_break spot-------//

app.post('/wave_break', function(req, res){
  break_location = req.body.break_location
  difficult_level = req.body.difficult_level
  rough_reef = req.body.rough_reef

  db
    .one ("INSERT INTO wave_break(break_location, difficult_level, rough_reef) VALUES($1, $2, $3) returning id",
      [break_location, difficult_level, rough_reef])
    .then (data =>{
      // console.log(data.id); //print new user id
      res.redirect('/wave_break/' + data.id)
    }); //.then
}); //app.post


//*************** INDIVIDUAL WAVE_BREAK PAGE ****************//
app.get('/wave_break/:id', function(req, res){
        let id = req.params.id
  db
    .one("SELECT * FROM wave_break WHERE id = " + id)
    .then(function(data){
      // console.log(data)
      let view_data = {
        wave_break: data
      }//view_data
       res.render("wave_break/show", view_data);
    })//.then
}) //app.get
















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





