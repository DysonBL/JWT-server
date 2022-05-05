const express = require("express");
const App = express();
const {Data } = require("./Components/Data");
const { tokenGenerator } = require("./Components/Token");
const jwt =require('jsonwebtoken')
const Port = 3001;

App.use(express.json()); //midilewhere

App.get("/", (req, res) => {
  res.send("Learn in JWT");
});

// signup
App.post("/signup", (req, res) => {
  let Name = req.body.Name;
  let Mail = req.body.Mail;
  let password =req.body.password;
  Data.push({
    Name,
    Mail,
    password,
  });
//   const Token =jwt.sign({Name},"jksdjlj",{expiresIn:'1m'})
  res.status(200).json({
       status:"You signup success",
     });
  console.log(Data, "data");
});
//Login
App.post("/login",(req,res)=>{
    const {Name,Mail,password}=req.body
    const data = Data.find((user)=>user.Name===Name)
    if(!Data){
        res.status(400).json({
            status:"falid to login",
            error:{msg:'User not found'}
        })
    }
    const Token =jwt.sign({Name},"jksdjlj",{expiresIn:'1m'});
    const refreshToken = jwt.sign({Mail},"jksdjlj",{expiresIn:'1h'})
    console.log(Token,"login")
    res.status(200).json({
        Token,
        refreshToken
    })

})


// App.put("/login", (req, res) => {
//   res.send({
//     Name: "Stanly",
//     Mail: "stanly@gmail.com",
//     password: "stn123",
//   });
// });
App.listen(Port, () => {
  console.log(`Runnig App in ${Port}`);
});
