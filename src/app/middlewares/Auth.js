const jwt = require('jsonwebtoken');
require('dotenv').config();

class Auth {
    interceptRequest(req, res, next) {
        try{
            const authHeader = req.headers.authorization;

            if(!authHeader){
                return res.status(401).send({error: 'No token provided'});
            }

            const parts = authHeader.split(' ');

            if(!parts.length === 2){
                return res.status(401).send({error: 'Token error'});
            }

            const [scheme, token] = parts;

            if(!/^Bearer$/i.test(scheme)){
                return res.status(401).send({error: 'Token malformated'});
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if(err) return res.status(401).send({error: 'Token invalid'});

                req.userId = decoded.id;
                return next();
            });
        } catch (err){
            throw err;
        }
    }
}

module.exports = Auth;