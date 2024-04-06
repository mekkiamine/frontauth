const express=require('express')
const passport = require('passport')
const session=require('express-session')
const { authenticate } = require('passport')
require('./Controller/authGoogle')
const cors=require('cors')
const authentication=require('./Controller/auth')
const cookieParser=require('cookie-parser')


const app=express();
const corsOptions = {
    origin: 'http://localhost:4200',
    methods: 'GET,POST,DELETE',
    preflightContinue: false,
    credentials: true,
    optionSuccessStatus: 200,
  };
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
  


app.use(session({secret:"cats",cookie:{maxAge:60000}}));
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});


//app.use(cookieParser)

function isLoggedIn(req,res,next){
    req.user ? next():res.sendStatus(401)
}

app.get('/',(req,res)=>{
    res.send('<a href="/auth/google">go to google</a>')
})
app.get('/google',(req,res)=>{
    res.redirect('/auth/google');
})

app.get('/auth/google',passport.authenticate('google',{scope:['email','profile']}), (req,res)=>{
    const {user,accessToken,refreshToken}=req.user;
    console.log('the user is : '+user+' , the accessToken is:'+accessToken+'and the refresh_token is : '+refreshToken);
    res.cookie('access_token',accessToken,{httpOnly:true})
    res.cookie('refresh_token', refreshToken, {httpOnly: true });
    return res.status(200).json({ id: user.id, name: user.name, email: user.email })
})

app.get('/google/redirect',passport.authenticate('google',{
    successRedirect:'http://localhost:4200/redirect',//should redirect to the home page /landing page in  client side
    failureRedirect:'/'
}))
app.get('/logout',isLoggedIn,(req,res)=>{
    req.logout()
    req.session.destroy()
    res.send('goodbye')
})

app.get('/login',authentication.loginUser)
app.post('/signup',authentication.signUpUser)

app.listen(3000,()=>{
    console.log('app up and running on port 3000')
}) 