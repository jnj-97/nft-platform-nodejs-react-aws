import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useCookies } from "react-cookie"
import auth from "../../services/services/authService";
export default function Login(){
  const [empty,setEmpty]=useState(false)
  const [invalidCredentials,setInvalidCredentials]=useState(false)
  const navigate=useNavigate(false)
  const [cookie,setCookie,removeCookie]=useCookies(["dummycookie"])
async function login(e){
    e.preventDefault()
    setEmpty(false)
    setInvalidCredentials(false)
    let form=document.getElementById("loginForm")
    if(form.elements.username.value.length==0 ||form.elements.password.value.length==0){
      setEmpty(true)
    }
    else{
      let loginResult= await auth.login({username:form.elements.username.value,password:form.elements.password.value})
      console.log("response: ",loginResult)
      if(loginResult.status){
        setCookie('token', loginResult.jwt, { path: '/' });
        navigate("/home")
      }
      else{
        setInvalidCredentials(true)
      }
    }
    console.log(form.elements) 
}
    return(<>
    <p style={{fontSize:28}}><strong>Login</strong></p>
    <div style={{border:"2px solid blue",borderRadius:"1vw",padding:"2vw",backgroundColor:"blueviolet",width:"30%",marginLeft:"35%"}}>
      {empty && <p style={{color:"red"}}>Both Fields are required</p>}
      {invalidCredentials && <p style={{color:"red"}}>Invalid Credentials</p>}
    
    <form id="loginForm" onSubmit={(e)=>{login(e)}}>
    <div style={{textAlign:"left"}} className="mb-3">
  <label  for="exampleFormControlInput1" className="form-label">Username</label>
  <input type="text" name="username" className="form-control" id="username" />
</div>
<div style={{textAlign:"left"}} className="mb-3">
  <label  for="exampleFormControlTextarea1" className="form-label">Password</label>
  <input className="form-control" type="password" name="password" id="password" rows="3"/>
</div>
<div>
<button type="submit" className="btn btn-success">Login</button>
</div>
</form>
</div>
<p>Don't have an account? Create one <a href="/register">here</a></p>
    </>)
}