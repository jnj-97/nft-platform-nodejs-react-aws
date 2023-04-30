import { useState,useEffect } from "react"
import Cookies from 'js-cookie';
import nft from "../../services/services/nftService";
import NFT from "./NFT";
import { useNavigate } from "react-router-dom";
export default function Home(){
  const navigate=useNavigate(false)
  function logout(){
    Cookies.remove("token")
    navigate("/")
  }
    const [nfts,setNFTS]=useState(null)
    useEffect(() => {
        (async () => {
          var token =Cookies.get('token');
          const results = await nft.home(token)
          console.log("results: ",results)
          setNFTS(results)
          })(); 
      }, [])

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
<h3>Browse our collection</h3>
{console.log("nfts: ",nfts )}
{nfts && nfts.length==0 && <p style={{color:"red"}}>No NFT's available. Sorry &#128546;</p>}
{<div>
{nfts && nfts.length!=0 && nfts.map((element)=>{
    return(
        <NFT image={element.nft} _id={element._id} username={element.username} supply={element.Supply} price={element.price} />
    )
})}
</div>}
    </>)
}