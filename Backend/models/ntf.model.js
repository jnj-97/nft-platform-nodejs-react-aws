const mongoose=require('mongoose')
require('dotenv').config();
const { mainDBConnection } = require('../config/database');
const Schema=mongoose.Schema

const nftSchema=new Schema({
    nft:{type:String,required:true},
    userid:{type:String,
    required:true},
   
    Supply:{type:Number,required:true},
    Price:{type:Number,required:true},
    mintperWallet:{type:Number,required:true}
})
const NFT=mainDBConnection.model('nft',nftSchema)
module.exports={NFT}