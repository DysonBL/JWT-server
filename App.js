const express = require('express')
const App = express()
const Port = 3002

App.use(express.json());

App.get('/',(req,res)=>{
    res.send('Learn in JWT')
})
App.post("/login",(req,res)=>{
    res.send({
        Name:'Henry',
        Mail:'henry@gmail.com',
        pasword:'hen123@123'
    })
})
App.put("/login",(req,res)=>{
    res.send(({
        Name:'Stanly',
        Mail:'stanly@gmail.com',
        password:'stn123'
    }))
})

// sign in 
App.post('/sign',(req,res)=>{
    console.log(req.body)
    let Name =req.body.Name;
    let Mail =req.body.Mail;
    let password = req.body.password;
    res.status(404).json({msg:"Your Sign in Success...!!"})
        `Name:${Name}`
        `Mail"${Mail}`
        `password:${password}`

})
App.listen(Port,()=>{
  console.log(`Runnig App in ${Port}`)
})

/* /loginapi.. /getapi /refreshapi*/