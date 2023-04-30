import PlaceholderApiProvider from "../serviceProviders/PlaceholderApiProvder";

class nftService extends PlaceholderApiProvider{
    async home(token){
        const headers={"authorization":token}
        return this.api.get('/home',{headers:headers})
    }
    async upload(data,token,){
        const headers={"authorization":token}
        return this.api.post('/uploadNFT',data,{headers:headers})
    }
    async checkUserName(username){
        return this.api.get(`/username/${username}`)
    }
}
const nft=new nftService('/nft')
export default nft