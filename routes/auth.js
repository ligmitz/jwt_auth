const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validateRegister,validateLogin} = require('../validation');

router.post('/register',async (req,res) => {

    const {error} = validateRegister(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send("Email Already Exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try{
        const savedUser = await user.save();
        res.json({_id: savedUser._id});
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login',async (req,res) => {
    const {error} = validateLogin(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Email/Passsword doesn't Exists");

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid Password');

    const token = jwt.sign({_id: user._id},process.env.JWT_TOKEN);
    res.header('auth-token',token).send(token);

    res.send("Welcome " + user.name);
})

module.exports = router;