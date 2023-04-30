const LoginController=require('../controllers/login.controller')
module.exports=app=>{
app.post('/auth/register',LoginController.register)
app.post('/auth/login',LoginController.login)
app.get('/auth/username/:username',LoginController.checkUsername)
}