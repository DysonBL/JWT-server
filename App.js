const express = require("express");
const App = express();
const { Data } = require("./Components/Data");
const jwt = require("jsonwebtoken");
const Port = 3001;
App.use(express.json()); //midilewhere
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
  optionSuccessStatus: 200,
};
App.use(cors(corsOptions));
App.get("/", (req, res) => {
  res.send("Learn in JWT");
});

// signup
App.post("/signup", (req, res) => {
  let Name = req.body.Name;
  let Mail = req.body.Mail;
  let password = req.body.password;
  Data.push({
    Name,
    Mail,
    password,
  });
  //   const Token =jwt.sign({Name},"jksdjlj",{expiresIn:'1m'})
  res.status(200).json({
    status: "You signup success",
  });
  console.log(Data, "data");
});
//Login
App.post("/login", (req, res) => {
  const { Name, Mail, password } = req.body;
  const data = Data.find((user) => user.Name === Name);
  if (!Data) {
    res.status(400).json({
      status: "falid to login",
      error: { msg: "User not found" },
    });
  }
  const Token = jwt.sign({ Name }, "jksdjlj", { expiresIn: "1m" });
  const refreshToken = jwt.sign({ Mail }, "jksdjlj", { expiresIn: "1h" });
  console.log(Token, "login");
  res.status(200).json({
    Token,
    refreshToken,
  });
});
App.post("/refresh", (req, res) => {
  const refreshToken = req.headers["x-access-token"];
  console.log(req.headers, "hiiireq");
  let decode = jwt.decode(refreshToken);
  console.log(decode, "va deco");
  let curentMail = decode.Mail;
  let Mail = Data.find((user) => user.Mail);
  console.log(curentMail, "curr");
  if (curentMail) {
    const Token = jwt.sign({ curentMail }, "jdsgkjsd", { expiresIn: "1m" });
    return res.status(200).json({
      status: {
        Msg: "Your goto agin Sign In",
        Token,
        refreshToken,
      },
    });
  }
});
App.post("/check", (req, res, next) => {
  const { tokenExpireError } = jwt;
  const catchError = (req, res) => {
    if (Erro instanceof tokenExpireError) {
      return res
        .status(401)
        .send({ Message: "Unauthorized! Access Token was expired!" });
    }
    return res.status(401).send({ message: "Unauthorized!" });
  };
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(400).json({
      errors: [{ msg: " Token is not Found" }],
    });
  }
  jwt.verify(token, "jdsgkjsd", (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    next();
  });
});

App.listen(Port, () => {
  console.log(`COOL Your App is Runnig GOOD ${Port}`);
});
