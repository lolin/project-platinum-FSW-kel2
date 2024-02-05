const { Users } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { responseSimple } = require('../utility/response');
const { secret } = require('../config/config.js')
const { jwtExpires } = require('../config/config.js')
class Auth {

    static login = async (req, res) => {
        const { email, password } = req.body
        if (!email || !password) {
            responseSimple(400, result, "email and password is required", res);
        }
        const user = await Users.findOne({
            where: {
                email: email
            }
        })
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            responseSimple(400, result, "Email or password is invalid", res);
        }
        const payload = {
            name: user.name,
            email: user.email,
        }
        const token = jwt.sign(payload, secret, { expiresIn: jwtExpires })
        res.json({
            message: "Login success",
            data: {
                name: user.name,
                email: user.email,
            },
            token: token
        })
    }
    static logout = async (req, res) => {
        const { id } = req.params
        const data = await Auth.findByPk(id);
        res.json({
            message: "Get data Auths success",
            data: data
        })
    }
}
module.exports = Auth