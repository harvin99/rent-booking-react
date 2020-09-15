const bcrypt = require("bcrypt");
require("dotenv").config();


const User = require("../../models/users.model");

module.exports.postLogin = async (req, res) => {
try {
    const {email, password} = req.body
    //console.log(req.body)
    const user = await User.findOne({ email: email });
    if (!user) {
        res.status(500).json({error : 'User does not exist.'})
        return;
    }

    if (user.wrongLoginCount >= 4) {
        res.status(500).json({error : 'Input wrong password too more ! Contact with admin t unlock acc !'})
        return;
    }
    if (!(await bcrypt.compare(password, user.password))) {
        res.status(500).json({error: 'Wrong password !'})
        return;
    }
    res.cookie('userId', user.id, {
        signed: true
    })
    res.status(201).json({message : 'Login success ! OK'})
    } catch (error) {
        console.log(error.message);
    }
};
