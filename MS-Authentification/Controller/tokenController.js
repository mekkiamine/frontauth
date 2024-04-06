const {pool}=require('../database/DBC')
const jwt=require('jsonwebtoken')
require('dotenv').config();

//generates the access token for user authentication 
const generateAccessToken=(user)=>{
    return jwt.sign({userId:user.id},process.env.JWT_SECRET,{ expiresIn: '1h' })
}

//checks if the users's refresh token still in the database , if not it creates a new one 
const generateRefreshToken = async (id) => {
    try {
        console.log('the id of the user is //function side//: ', id);
        const client = await pool.connect();
        const result = await pool.query('SELECT * FROM "refreshTokens" WHERE "idUser" = $1', [id]);
        
        if (result.rows.length > 0) { // Check if rows are not empty
            const user = result.rows[0];
            console.log('the user is //function side// : ', user);
            return user.refreshToken;
        } else {
            const refreshToken = jwt.sign({ userId: id }, process.env.JWT_REFRESH); // Use id instead of user.id
            await pool.query('INSERT INTO "refreshTokens" ("idUser", "refreshToken") VALUES ($1, $2)', [id, refreshToken]);
            return refreshToken;
        }
    } catch (err) {
        console.log('Error in generateRefreshToken:', err);
        return null; // Handle error appropriately
    } 
};


//delete the user's refresh token from database 
const logout=(id)=>{
    try{
        pool.connect().then(
            pool.query('DELETE FROM "refreshTokens" WHERE idUser=$1',[id],(err,result)=>{
                if(err){
                    return console.log('erreur deleting the refresh token from database : ',err)
                }
                console.log('User with the id :',id,' Has been logged out Succesfully')
                return true;
            })
        )
    }catch(err){
        return console.log(err)
    }
}
//this function retrives the refresh token from database 
const getRefreshtoken = async (id) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM "refreshTokens" WHERE "idUser"=$1', [id]);
        client.release();

        if (result.rows.length > 0) {
            console.log('the refresh token is : ---> ', result.rows[0].refreshToken);
            return result.rows[0].refreshToken;
        } else {
            return null; // Handle case where refresh token is not found
        }
    } catch (error) {
        console.error('erreur getting the refresh token from database : ', error);
        return null;
    }
};
//authenticates the accessToken sent in the request 
const authenticateToken=(req,res,next)=>{

}
module.exports={generateAccessToken,generateRefreshToken,logout,getRefreshtoken};
