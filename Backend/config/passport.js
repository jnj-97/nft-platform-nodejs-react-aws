const fs = require('fs');
const moment=require('moment')
const path = require('path');
const knex = require("../config/database");
const JwtStrategy=require('passport-jwt').Strategy
const ExtractJwt=require('passport-jwt').ExtractJwt;
require('dotenv').config()

const options = {
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey:process.env.JWT_SECRET,
};
const strategy=new JwtStrategy(options,(payload,done)=>
{
    if(moment().isBefore(payload.expiresIn)){
        done(null,payload)   
    }
    else{
        done(null,false)
    }

})
module.exports = (passport) => {
    
    passport.use(strategy)
}