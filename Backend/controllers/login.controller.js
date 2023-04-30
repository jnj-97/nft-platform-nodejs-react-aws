const {User}=require('../models/users.model')
const utils=require('../utils/utils')
exports.register=async (req,res)=>{
    console.log(req.body)
    let Password=utils.genPassword(req.body.password)
try{
    let newUser=new User({username:req.body.username,password:Password})
await newUser.save()
res.status(200).json({status:true})
}catch(err){
   console.log("err: ",err)
    res.status(500).json({status:false,message:"Unknown error occurred"+err})
}

}
exports.login=async (req,res)=>{
    try{
    let user= await User.findOne({username:req.body.username})
    
   
    if(Boolean(user)){
        let hashexists=utils.validPassword(req.body.password,user.password)
        if(hashexists){
            console.log("user: ",user)
            let jwt=utils.issueJWT(user)
            res.status(200).json({status:true,jwt:jwt})
        }
        else if(!hashexists){
            console.log("incorrect password")
            res.status(200).json({status:false})
        }
    }
    else if(user==null){
        res.status(200).json({status:false})
    }
}catch(err){
    console.log("err: ",err)
    res.status(500).json({status:false,message:"Unknown error occurred"+err})
}   
}
exports.checkUsername=async (req,res)=>{
    let username=req.params.username
    try{
        let exists=await User.exists({username:username})
        if(exists){
            res.status(200).json({status:true})
        }
        else{
            res.status(200).json({status:false})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Unknown Error occurred"+err})
    }
}