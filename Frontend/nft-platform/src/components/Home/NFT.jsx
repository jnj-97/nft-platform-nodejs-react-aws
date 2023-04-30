import { useNavigate } from "react-router-dom"

export default function NFT(props){
  const navigate=useNavigate(false)
    return(<>
    <div className="card" style={{justifyContent:"center"}} >
  <img src={props.image} style={{width:"20%",height:"5%"}}  className="card-img-top" alt={"NFT Image by"+props.username}/>
  <div className="card-body">
    <h5 className="card-title">By {props.username}</h5>
    <h6>Price: {props.price} ETH</h6>
    <a href="#" className="btn btn-primary">Buy</a>
  </div>
</div>
</>)
}