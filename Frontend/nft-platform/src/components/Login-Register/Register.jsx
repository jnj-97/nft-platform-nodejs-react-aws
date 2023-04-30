import { useState } from "react";
import auth from "../../services/services/authService";
import { useNavigate } from "react-router-dom";
export default function Register(){
    const [username,setUsername]=useState(false)
    const [empty,setEmpty]=useState(false)
    const navigate=useNavigate(false)
async function checkUsername(username){
    console.log("username: ",username)
    let usernameExists=await auth.checkUserName(username)
    console.log("usernameExists: ",usernameExists)
    if(usernameExists.status){
        setUsername(true)
    }
    else if(!usernameExists.status){
        setUsername(false)
    }
}
async function register(e){ 
    e.preventDefault()
    setEmpty(false)
    let form=document.getElementById("registerForm")
    console.log(form.elements)
    if(form.elements.username.value.length==0 || form.elements.password.value.length==0){
        setEmpty(true)
    }
    if(username || empty){}
    else{
      let register=await auth.register({username:form.elements.username.value,password:form.elements.password.value})
      if(register.status){
        navigate('/')
      }
    }
}
    return(<>
    <p style={{fontSize:28}}><strong>Register</strong></p>
    
    <div style={{border:"2px solid blue",borderRadius:"1vw",padding:"2vw",backgroundColor:"blueviolet",width:"30%",marginLeft:"35%"}}>
    <form  id="registerForm" onSubmit={(e)=>{register(e)}}>
        {username && <p style={{color:"darkred"}}>Username Already Exists</p>}
        {empty && <p style={{color:"darkred"}}>Both Fields are required</p>}
    <div style={{textAlign:"left"}} className="mb-3">
  <label  for="exampleFormControlInput1" className="form-label">Username  </label>
  <input type="text" minLength={10} onChange={(e)=>{checkUsername(e.target.value)}} name="username" className="form-control" id="username"/>
</div>
<div style={{textAlign:"left"}} className="mb-3">
  <label  for="exampleFormControlTextarea1" className="form-label">Password</label>
  <input minLength={8} className="form-control" type="password" name="password" id="password" rows="3"/>
</div>
<div>
<button type="submit" className="btn btn-success">Login</button>
</div>
</form>
</div>
<p>Already Have an account? Login <a href="/">here</a></p>
    </>)
}