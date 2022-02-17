const {User} = require("../models/models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


class UserControllers {
    async createUser(req,res){
        try {
            const {name, email, password} = req.body;
            let hashPassword = bcrypt.hashSync(password);

            let user = await User.create({name, email, password: hashPassword});

            res.json({info: user})
        }catch (e) {
            res.json({error: e.message});
        }
    }

    async loginUser(req,res){
        try {
            const {email,password} = req.body;
            let checkingUser = await User.findOne({where: {email}});

            if (!checkingUser) {
                return res.json({error: 'Invalid Email'})
            } else {
                let confirmPassword = bcrypt.compareSync(password, checkingUser.password);
                if (!confirmPassword) return res.json({error: 'Invalid Password'});

                let payload = {
                    id: checkingUser.id,
                    name: checkingUser.name,
                    email: checkingUser.email,
                }

                jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1d'},(err,token)=>{
                    if (err) {
                        return res.json({error: err.message});
                    }
                    res.json({checkingUser, token});
                });
            }
        }catch (e) {
            res.json({error: e.message});
        }
    }
}

module.exports = new UserControllers();