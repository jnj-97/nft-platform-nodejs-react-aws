import PlaceholderApiProvider from "../serviceProviders/PlaceholderApiProvder";

class authService extends PlaceholderApiProvider{
    async register(data){
        return this.api.post('/register',data)
    }
    async login(data){
        return this.api.post('/login',data)
    }
    async checkUserName(username){
        return this.api.get(`/username/${username}`)
    }
}
const auth=new authService('/auth')
export default auth