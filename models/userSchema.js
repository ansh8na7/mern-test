require('dotenv').config();
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    phone:{
        type: Number,
        required: true
    },
    pass:{
        type: String,
        required:true
    },
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
});

userSchema.pre('save',async function(next){
    if(this.isModified('pass')){
        this.pass = await bcrypt.hash(this.pass,10)
    }
    next();
});

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model('USER', userSchema);

module.exports = User;
