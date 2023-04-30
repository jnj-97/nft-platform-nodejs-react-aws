const {User}=require('../models/users.model')
const {NFT}=require('../models/ntf.model')
const path = require('path');
const fs=require('fs')

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_SECRET,
    region: process.env.REGION
  });
exports.home=async (req,res)=>{
    try{
        let nfts=await NFT.find()
        let data=[]
        for(let i=0;i<nfts.length;i++){
           let user=await User.findById(nfts[i].userid)
           data.push({_id:nfts[i]._id,nft:nfts[i].nft,username:user.username,supply:nfts[i].Supply,price:nfts[i].Price,limit:nfts[i].mintperWallet}) 
          }
        
        res.status(200).json(data)
    }catch(err){
        console.log(err)
        res.status(500).json({status:false,message:"Unknown error occurred"+err})
    }
}

exports.nftPage= async (req,res)=>{
    let nftId=req.params.nftID
    try{
        let nftdata=await NFT.findById(nftId)
        let user=await User.findById(nftdata.userid)
        res.status(200).json({nft:nftdata.nft,username:user.username,supply:nftdata.Supply,price:nftdata.Price,remaining:nftdata.mintperWallet})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Unknown error occurred"+err})
    }

}

exports.uploadNFT = async (req, res) => {
    try {
        console.log(req.body.file)
      const bufferImage = Buffer.from(req.body.file.split(";base64,")[1], "base64");
      const tempPath = path.join(__dirname, "temp.png");
      const filename=`${Date.now().toString()}.png`
      fs.writeFileSync(tempPath, bufferImage);
      const params = {
        Bucket: process.env.BUCKET,
        Key: filename,
        Body: fs.createReadStream(tempPath),
        ContentType: "image/png",
      };
  
      // Wrap s3.upload() function with a promise
      const uploadPromise = () => {
        return new Promise((resolve, reject) => {
          s3.upload(params, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      };
  
      // Use await to wait for the promise to resolve
      const data = await uploadPromise();
      s3.putObjectAcl({
        Bucket: process.env.BUCKET,
        Key: filename,
        ACL: 'public-read'
    }, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Object ACL set to public-read`);
        }
    });
      console.log(`File uploaded successfully to ${data.Location}`);
      let newNFT = new NFT({
        userid: req.user.id,
        nft: data.Location,
        Supply: req.body.supply,
        Price: req.body.price,
        mintperWallet: req.body.limit,
      });
      newNFT.save(newNFT);
      res.status(200).json({ status: true });
      // Clean up temporary file
      fs.unlinkSync(tempPath);
  
      
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: false, message: "Unknown Error Occurred" + err });
    }
  };
  