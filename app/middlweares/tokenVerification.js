const jwt = require('jsonwebtoken');

class tokenVeification {
    verify(req, res, next) {
        if(req.headers['authorization'] == undefined){
            res.status(401);
            throw new Error("Not Authorized, no token");
        }
        
        let Token = req.headers['authorization'].split(' ')[1];
        if (Token) {
            try {
                const tokenValue = jwt.verify(Token , process.env.JWT_PRIVATE_KEY);
                req.user = tokenValue;
                next()
            } catch (error) {
                throw new Error('JWT expired');
            }
        } else {
            res.status(401);
            throw new Error("Not Authorized, no token");
        }
    }
}

module.exports = new tokenVeification()