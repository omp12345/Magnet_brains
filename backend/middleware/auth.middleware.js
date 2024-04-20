
const jwt=require("jsonwebtoken");
const { blacklist } = require("../blacklist");
require("dotenv").config()

const auth = (req, res, next) => {
  const token=req.headers.authorization?.split(" ")[1]
  if(blacklist.includes(token)){
      next()
  }
    try {
      const token = req.headers.authorization.split(' ')[1];
   
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
     console.log(decodedToken)
      req.body.userId = decodedToken.userId ;
      req.body.username=decodedToken.username
      next();
    } catch (error) {
      res.status(401).json({ message: 'Authentication failed' });
    }
  };
  const isAdmin = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
   
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decodedToken)
    if ( decodedToken.role === 'admin') {
     
      return next(); 
    }else{
      return res.status(401).json({ error: error.message});
    }
    
  }
  
 
  
  module.exports={
   auth,
   isAdmin
  }
