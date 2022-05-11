const express = require("express");
const App = express();
// const { Data, tours } = require("./Components/Data");
const jwt = require("jsonwebtoken");
const Port = 3004;
App.use(express.json()); //midilewhere
const cors = require("cors");
const { Data, Juice } = require("./Components/Data");

App.listen(Port, () => {
  console.log(`COOL Your App is Runnig GOOD ${Port}`);
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
App.use(cors(corsOptions));
App.get("/", (req, res) => {
  res.send("Learn in JWT");
});

// signup
App.post("/signup", (req,res) => {
  let Name = req.body.Name;
  let Mail = req.body.Mail;
  let password = req.body.password;
  Data.push({
    Name,
    Mail,
    password,
  });
  console.log("hai original secred maik",[Name,Mail,password])
  const Token =jwt.sign({Mail},"hdhdhdhd",{expiresIn:'1m'})
  res.status(200).json({
    status: "You signup success",
    user:Data
  });
  console.log(Data, "Data from sign");
});
//Login
App.post("/login", (req, res) => {
  console.log("bodys",req.body)
  const {Mail, password } = req.body;
  console.log(Mail,"Mail")
  const data = Data.find((user) => user.Mail===Mail);
  console.log("hai login data",data)
  if (!data) {
    res.status(400).json({
      status: "falid to login user",
      error: { msg: "User not found" },
    });
  }
  const Token = jwt.sign({ Mail }, "hdhdhdhd", { expiresIn: "1m" });
  const refreshToken = jwt.sign({ Mail }, "hdhdhdhd", { expiresIn: "1h" });
  console.log(Token, "get login token");
  res.status(200).json({
    status:"success",
    Token,
    refreshToken,
  });
});
//Refresh
App.post("/refresh", (req, res) => {
  console.log("refresh",req.body['x-access-token'])
  const refreshToken = req.body["x-access-token"];
  let decode = jwt.decode(refreshToken);
  console.log("hai",decode)
  let curentMail = decode.Mail;
  // let Mail = Data.find((user) =>user.Email);
  console.log(curentMail, "curr");
  if (curentMail) {
    const Token = jwt.sign({ curentMail }, "hdhdhdhd", { expiresIn: "1m" });
    return res.status(200).json({
      status: {
        Msg: "Your goto agin Sign In",
        Token,
        refreshToken,
      },
    });
  }
});

//Check
const checkAuth = (req, res, next) => {
  console.log("i am in check auth")
  const  {TokenExpiredError } = jwt;
  const catchError = (error, res) => {
    if (error instanceof TokenExpiredError) {
      return res
        .status(401)
        .send({ Message: "Unauthorized! AccessToken was expired!" });
    }
    return res.status(401).send({ message: "Unauthorized!" });
  };
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(400).json({
      errors: [{ msg: " Token is not Found" }]
    });
  }
  jwt.verify(token, "hdhdhdhd", (error,decoded) => {
    console.log("decoces",decoded)
    if (error) {
      return catchError(error, res);
    }
    next();
  });
};

//Get User
App.get("/user",checkAuth,(req, res) => {
  console.log("user chechauth")
  res.status(200).json({
    status: "success get your Page",
    item: Juice,
  });
});

