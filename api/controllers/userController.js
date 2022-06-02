const userModel = require('../models').user;
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// USER sign up
const userRegister = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userModel.findOne({
            where: {
                email
            }
        });

        if (user) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "user is already exists",
                responseCode: httpStatus.BAD_REQUEST
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        const response = await userModel.create(req.body)
        delete response.password;
        return res.status(httpStatus.CREATED).json({
            message: "user is created successfully",
            data: null,
            responseCode: httpStatus.CREATED
        })
    }
    catch (error) {
        console.error(error)
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Something went wrong",
            data: error,
            responseCode: httpStatus.BAD_REQUEST
        });
    }
}

// USER login
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    //FIND user with email
    try {
        const user = await userModel.findOne({
            where: {
                email
            }
        });
    
        if (!user) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "user not found",
                responseCode: httpStatus.BAD_REQUEST
            });
        }
        else {
    
            const isValidatePassword = await bcrypt.compare(password, user.password);
            if(isValidatePassword) {
                const token = jwt.sign({
                    email: user.email,
                    username: user.username
                }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
                return res.status(httpStatus.OK).json({
                    data: token,
                    responseCode: httpStatus.OK
                })
            }
            else {
                return res.status(httpStatus.BAD_REQUEST).json({
                    message: "wrong password",
                    responseCode: httpStatus.BAD_REQUEST
                });
            }
        }
    }
    catch(error) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Something went wrong",
            error,
            responseCode: httpStatus.BAD_REQUEST
        });
    }
}

module.exports = {
    userRegister,
    userLogin
}