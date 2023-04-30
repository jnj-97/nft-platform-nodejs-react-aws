const nftController=require('../controllers/nft.controller')
const passport=require('passport')
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');


module.exports=app=>{
    app.get('/nft/home',passport.authenticate('jwt',{session:false}),nftController.home)
    app.get('/nft/nftPage:nftID',passport.authenticate('jwt',{session:false}),nftController.nftPage)
    app.post('/nft/uploadNFT', passport.authenticate('jwt', {session: false}),nftController.uploadNFT);
}