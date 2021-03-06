require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateToken(params = {}) {
    return jwt.sign(params, process.env.JWT_SECRET, {
        expiresIn: 86400
    });
}

class UserController {
    async save(req, res) {
        const {email} = req.body;

        try{
            if(await User.findOne({email})){
                return res.status(400).send({error: 'User already exists'});
            }
    
            const user = await User.create(req.body);
    
            user.password = undefined;
    
            return res.status(201).send({user, token: generateToken({id: user.id})});
        } catch (err){
            return res.status(400).send({error: 'Registration failed'});
        }
    }

    async all(req, res) {
        try{
            const users = await User.find().select('-password');
            res.status(200).send(users);
        } catch (err){
            return res.status(400).send({error: 'Operation failed'});
        }
    }

    async delete(req, res) {
        const id = req.params.id;

        try{
            let user = await User.findById(id);
            if(user != null){
                if(await User.deleteOne(user)){
                    return res.status(204).send();
                }
            }
        }catch (err){
            return res.status(400).send({error: 'Operation failed'});    
        }
    }

    async authenticate(req, res) {
        const {email, password} = req.body;

        const user = await User.findOne({email}).select('+password');
    
        if(!user){
            return res.status(400).send({error: 'User not found'});
        }
    
        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).send({error: 'Invalid password'});
        }
    
        user.password = undefined;
    
        res.status(200).send({user, token: generateToken({id: user.id})});
    }
}

module.exports = UserController;