var express = require("express");
var mongoose = require("mongoose");
const User = require("./models/user");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

connUrl =
  "mongodb+srv://niraj365:niraj365@cluster0.ehfsdkf.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(connUrl)
  .then(console.log("Mongodb Connected..."))
  .catch((err) => console.log(err));

var database = mongoose.connection;

// database.on('error',()=>console.log("Error while connecting to database!!"))
// database.once('open',()=>console.log("Connected to database"))

app.get("/users", (req, res) => {
  //To see users in database
  User.find().exec((err, data) => {
    if (err) console.log(err);
    console.log(data);
    res.json(data);
  });
});

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  if (req.body) {
    const data = new User({
      name: username,
      email: email,
      password: password,
    });

    data.save((err, data) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        return res.redirect("signup_success.html");
      }
    });
  } else {
    return res.send("Body bata pass vako chaina");
  }

  // var username = req.body.username;
  // var email = req.body.email;
  // var password = req.body.password;

  // var data = {
  //     name: username,
  //     email : email,
  //     password : password
  // }

  // database.collection('users').insertOne(data,(err,collection)=>{
  //     if(err){
  //         throw err;
  //     }
  //     console.log("Record inserted Successfully");
  //     // if(collection){

  //     //    return res.status(200).json({
  //     //         msg: "Success!!"

  //     //     })
  //     // }
  //     // console.log(err);
  //     // return res.status(500).json({
  //     //     msg: "Error"
  //     // })

  //  });
});

app.get("/", (req, res) => {
  return res.redirect("index.html");
});

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
