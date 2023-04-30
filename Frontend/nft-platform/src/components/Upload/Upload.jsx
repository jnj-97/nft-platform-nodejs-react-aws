import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import nft from "../../services/services/nftService"

export default function Upload(){
  const [backend,setBackend]=useState(false)
  const [file,setFile]=useState(null)
  const navigate=useNavigate(false)
  function loadFile(event){
    const file=event.target.files[0]
    console.log("type: ",typeof(event.target.files[0]))
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
      setFile(reader.result)
    }
    
  }
  function logout(){
    Cookies.remove("token")
    navigate("/")
  }
    async function uploadNFT(e){
        e.preventDefault()
        let form=document.getElementById("uploadForm")
        
        console.log(form.elements)
        let formdata={file:file,price:form.elements.price.value,supply:form.elements.supply.value,limit:form.elements.limit.value}
        let token= Cookies.get("token")
        console.log("file: ",file)
        let upload=await nft.upload(formdata,token)
        if(upload.status){
          navigate("/home")
        }
        else{
          setBackend(true)
        }
    }
    return(<>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">NFT Platform</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/home">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/upload">Upload</a>
        </li>
          <a className="nav-link " onClick={logout} role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Logout
          </a>   
      </ul>
    </div>
  </div>
</nav>
        <h2>Upload NFT</h2>
        {backend && <p style={{color:"red"}}>Unknown Error Occurred. Please Try Again</p>}
        <form style={{border:"2px solid blue",padding:"2vw",borderRadius:"10px", backgroundColor:"beige"}} id="uploadForm" onSubmit={(e)=>uploadNFT(e)}>
        <div style={{textAlign:"left"}} class="mb-3">
  <label  for="formFile" class="form-label">NFT Image</label>
  <input class="form-control" type="file" required onChange={loadFile} accept="image/png"/>
  {file && <img style={{height:"20%",width:"20%"}} src={file}/>}
</div>
        <div style={{textAlign:"left"}} class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Supply</label>
  <input type="number" class="form-control" required id="supply" placeholder="99"/>
</div>
<div style={{textAlign:"left"}} class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Price</label>
  <input type="number" class="form-control" required id="price" placeholder="99"/>
</div>
<div style={{textAlign:"left"}} class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Limit of NFT that a User can buy</label>
  <input type="number" class="form-control" required id="limit" placeholder="10"/>
</div>
<button type="submit" class="btn btn-success">Upload</button>

</form>
        </>)
}