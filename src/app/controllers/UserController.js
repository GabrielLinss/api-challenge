require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateToken(params = {}){
    return jwt.sign(params, process.env.JWT_SECRET, {
        expiresIn: 86400
    });
}

exports.save = async (req, res) => {
    const {email} = req.body;

    try{
        if(await User.findOne({email})){
            return res.status(400).send({error: 'User already exists'});
        }

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({user, token: generateToken({id: user.id})});
    } catch (err){
        return res.status(400).send({error: 'Registration failed'});
    }
};

exports.all = async (req, res) => {
    try{
        const users = await User.find().select('-password');
        res.send(users);
    } catch (err){
        return res.status(500).send({error: 'Operation failed'});
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;

    try{
        let user = await User.findById(id);
        if(user != null){
            if(await User.deleteOne(user)){
                return res.status(200).send();
            }
        }
    }catch (err){
        return res.status(400).send({error: 'Operation failed'});    
    }
};

exports.authenticate = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email}).select('+password');

    if(!user){
        return res.status(400).send({error: 'User not found'});
    }

    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({error: 'Invalid password'});
    }

    user.password = undefined;

    res.send({user, token: generateToken({id: user.id})});
};
