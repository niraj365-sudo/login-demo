var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const User = require("./models/user")

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

// mongodb+srv://niraj365:Npoudel@123@cluster0.ehfsdkf.mongodb.net/?retryWrites=true&w=majority

connUrl =  'mongodb+srv://niraj365:niraj365@cluster0.ehfsdkf.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(connUrl).then(console.log('Mongodb Connected...')).catch(err=>(
    console.log(err)
))

// mongoose.connect('mongodb+srv://vortex:vortex@cluster0.axlq4.mongodb.net/test123?retryWrites=true&w=majority',(err)=>{
//     if(!err) console.log("Connected Successfully");
//     else console.log(err);
// });
var database =mongoose.connection;

// database.on('error',()=>console.log("Error while connecting to database!!"))
// database.once('open',()=>console.log("Connected to database"))

app.post("/signup",(req,res)=>{

    const data = new User(
        req.body
    )

     data.save((err,data)=>{
        if(err) 
        console.log(err);
                return res.redirect('signup_success.html');
   })


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


})

//app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))


app.get("/",(req,res)=>{
    // res.send('Hello')
    res.set({
        "Allow-access-Allow-Origin" : "*"
    })
    return res.redirect('index.html')
})

app.listen(PORT,()=>{
    console.log(`Connected to port ${PORT}`);
})
;