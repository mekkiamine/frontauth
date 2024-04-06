require('dotenv').config()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const {pool}=require("../database/DBC.js")
const user=require("../Models/User.js")
const tokenController=require("./tokenController")


//these functions are used to verify and add new users ( students ) in the database 
const loginUser = async (req, res) => {
    console.log('-->Login User function : ');
    console.log('the request sent is : ', req.body);
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM "users" WHERE email=$1', [req.body.email]);
        client.release();

        if (result.rowCount === 0) {
            console.log('user not found');
            return res.sendStatus(404);
        }

        const pw = await bcrypt.compare(req.body.password, result.rows[0].password);
        if (pw) {
            const user = result.rows[0];
            const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            const refreshToken = await tokenController.generateRefreshToken(user.id);

            console.log('the access token is : --->', accessToken);
            console.log('/////////////');
            console.log('the refresh token is : --->', refreshToken);
            console.log('user logged in successfully');

            res.cookie('accessToken', accessToken, { httpOnly: true });
            res.cookie('refreshToken', refreshToken, { httpOnly: true });

            return res.status(200).json({
                message: "Login successfull",
                username: user.username,
            });
        } else {
            console.log('Mot de passe incorrecte');
            return res.sendStatus(403);
        }
    } catch (error) {
        console.log('ERROR: ', error);
        return res.sendStatus(500);
    }
};

const signUpUser=async(req,res)=>{
   
    console.log(" the neww user is :--->  ",req.body)
    // const hashedPassword
    const salt =await bcrypt.genSalt()
    const hashedPassword= await bcrypt.hash(req.body.password,salt)
    pool.connect()
    pool.query('INSERT INTO "users" (username,password,email) VALUES ($1,$2,$3) RETURNING *',[req.body.username,hashedPassword,req.body.email],async(err,result)=> {
        if(err){
            return console.error('Error executing query', err.stack);
        }
        console.log("the result from the database is : ---> ",result.rows[0].id)
        const refreshtoken=tokenController.generateRefreshToken(result.rows[0].id)
        const accesstoken=tokenController.generateAccessToken(result.rows[0].id)
        console.log('user Signed up successfully')
        res.status(200).json({
            message:"Inscription réussie",
            id:result.rows[0].id,
            accessToken:accesstoken,
            refreshToken:refreshtoken,
        })
    })
}

module.exports={signUpUser,loginUser};