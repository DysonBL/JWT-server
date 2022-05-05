const bcrypt = require('bcrypt');
const saltRounds = 5;

const hashGenerate =async(plainPsw)=>{
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainPsw);
    return hash;
}
module.exports.hashGenerate = hashGenerate;