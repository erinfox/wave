let express = require("express");
let app = express();
let mustacheExpress = require("mustache-express");
let bodyParser = require("body-parser");
let pgp = require("pg-promise")();
let session = require('express-session');
let methodOverride = require('method-override');
// let axios = require('axios');
let config = require('./config');
app.use(methodOverride('_method'));

const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);

app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/html");
app.use(express.static(__dirname + "/public"));
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
      // console.log(data)
      let view_data = {
        waves: data,
      }
      res.render('sign_up/index', view_data);
    })
});



app.post('/sign_up', function(req, res){
  let data = req.body;
      console.log(data)

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

//*************** SURFER/:ID ****************//

app.get('/surfers/:id', function(req, res){
  let id = req.params.id
  // console.log(req.params) //this is consoling the right id

  db
    .one("SELECT surfers.id AS person_id, name, skill_level,board_type, favorite_break_id, email, wave_break.break_location  FROM surfers INNER JOIN wave_break ON surfers.favorite_break_id = wave_break.id WHERE surfers.id = $1",[id])

    .then(function(data){
      // console.log(data)
      let view_data = {
        show:data,
        id:data.id,
        name: data.name,
        skill_level: data.skill_level,
        board_type: data.board_type,
        favorite_break_id: data.favorite_break_id,
        email: data.email,
        password: data.password,
        surfers: data
      }//view_data
       res.render("surfers/show", view_data);
    });//.then
}); //app.get



//*************** API CALL FOR EACH SURFER PROFILE ****************//

// app.get('/api/:location_id', function(req, res){

//   let id = req.params.location_id;

//   db.one('SELECT * FROM wave_break WHERE id = $1', id)
//   .then(function(data){

//   let url =

//     .catch(function(err){
//       console.log(err);
//     })

//   })

// }) //app.get






//*************** UPDATE SURFER BOARD TYPE ****************//
// using METHOD OVERRIDE
app.put("/user/:id", function(req,res){
  id = req.params.id
  // console.log(id)
  // console.log(req.params)
  // console.log(req.body)
  // console.log(parseInt(req.body.changeSurferBoard))
  db
  .none("UPDATE surfers SET board_type = $1 WHERE id = $2",
    [req.body.board_type, id])
  .then(function(){
     // console.log(req.body) 
    res.redirect("/surfers/" + id)
  })
  .catch(function(){
    res.send("fail")

  });
});



//*************** UPDATE SURFER SKILL LEVEL ****************//
// using METHOD OVERRIDE
app.put("/user1/:id", function(req,res){
  id = req.params.id
  // console.log(req.body)
  // console.log(req.body.skill_level)
  // console.log(req.body.id)
  // console.log("params")
  // console.log(req.params.id)
  db
  .none("UPDATE surfers SET skill_level = $1 WHERE id = $2",
    [Number(req.body.skill_level), parseInt(req.body.surfer_id_again)])
  .then(function(){
     // console.log(req.body) 
    res.redirect("/surfers/" + id)
  })
   .catch(function(){
    res.send("fail")
  });
});




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


//*************** DELETE SURFER ****************//
app.get('/delete/:id', function(req, res){
  let id = req.params.id
  console.log(id)
  db
  .none ('DELETE FROM surfers WHERE id = $1', [id]);
  res.redirect('/surfers');
});

//*************** LOG OUT/ END SESSION ****************//
app.get('/logout', function(req, res){
  req.session.user = false;
  res.redirect("/");
});







