const mongoose = require('mongoose');
const bcryp = require('bcrypt-nodejs');
const {Schema} = mongoose;

const userSchema = new Schema({
    email: String,
    password: String
});

userSchema.methods.encryptPassword = (password) =>{
    return bcryp.hashSync(password, bcryp.genSaltSync(10), null);
};

userSchema.methods.comparePassword = (user, password) =>{
    if(user.password != null){
        return bcryp.compareSync(password, user.password);
    }else{
        return false;
    }
};

module.exports = mongoose.model('users', userSchema);