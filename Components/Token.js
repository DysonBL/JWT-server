const jwt =require('jsonwebtoken');

const tokenGenerator =(Email)=>{
    const token = jwt.sign({Email},"djafhklsk",{expireIn:""})
    return token;
}
module.exports.tokenGenerator =tokenGenerator;