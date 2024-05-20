const jwt = require('jsonwebtoken');

function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ',)[1];

    if (token === null){
        return res.status(401).json({message: "Åtkomst nekad, token saknas"});
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) {return res.status(403).json({message: "Token inte giltig"})}
        
        console.log("Username:", username.username);
        req.username = username.username;
        next();
    })
}

module.exports = {authenticateToken}