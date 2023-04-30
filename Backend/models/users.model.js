const mongoose=require('mongoose')
require('dotenv').config();
const { mainDBConnection } = require('../config/database');
const Schema=mongoose.Schema

const userSchema=new Schema({
    username:{type:String,
    required:true},
    password:{type:String,
    required:true}
})
const User=mainDBConnection.model('user',userSchema)
module.exports={User}