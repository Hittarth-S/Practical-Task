const jwt = require("jsonwebtoken");
const config = require("../../config/config");

const {
    setPassword,
    verifyPassword,
} = require("../../helpers/password.helper");

const { generateNumericString, getUniqueUserId } = require("../../helpers");

const Users = require("../../models/users.model");
const Role = require("../../models/role.model");

module.exports.register = async (request, response, next) => {
    try {
        const { firstName, lastName, email, password, mobile } = request.body;

        const checkRole = await Role.findOne({ role: "USER" });
        if (!checkRole) {
            return response.status(409).json({
                status: false,
                message: "Role Not Found",
                data: null,
            });
        }

        // check if user is exists
        const checkUser = await Users.findOne({
            email: email.toLowerCase(),
            role: checkRole?._id,
            isDeleted: false,
        });
        if (checkUser) {
            return response.status(409).json({
                status: false,
                message: "Your email is already associated with an account",
                data: null,
            });
        }

        //GENERATING PASSWORD
        const pass = setPassword(password);

        // GENERATE USERNAME
        const userName = await getUniqueUserId();

        let newUsers = await Users.create({
            userName,
            firstName,
            lastName,
            mobile,
            email: email.toLowerCase(),
            password: pass,
            isEmailVerified: true,
            role: checkRole?._id
        });
        if (!newUsers) {
            return response.status(409).json({
                status: false,
                message: "Failed to create User",
                data: null,
            });
        }

        return response.status(200).json({
            status: true,
            message:
                "You have created your account successfully.",
            data: newUsers?._id,
        });
    } catch (error) {
        console.error(
            "Server Error at user/controller/auth.controller in register ==> Error : ",
            error
        );
        return response.status(500).json({
            status: false,
            message: "Server Error! Failed to Register User",
            data: null,
        });
    }
};

module.exports.login = async (request, response, next) => {
    try {
        const { email, password } = request.body;

        const checkRole = await Role.findOne({ role: "USER" });
        if (!checkRole) {
            return response.status(409).json({
                status: false,
                message: "Role Not Found",
                data: null,
            });
        }
        const userData = await Users.findOne({
            email: email.toLowerCase(),
            role: checkRole?._id,
            isDeleted: false,
        }).select("+password");

        if (!userData) {
            return response.status(401).json({
                status: false,
                message: "Your email is not associated with any account",
                data: null,
            });
        }

        const checkPassword = verifyPassword(password, userData.password);
        if (!checkPassword) {
            return response.status(401).json({
                status: false,
                message: "You have entered incorrect password.",
                data: null,
            });
        }

        const token = jwt.sign(JSON.stringify(userData), config.JWT_AUTH_TOKEN);

        delete userData.password;
        const sendData = { userData, token: token };
        return response.status(200).json({
            status: true,
            message: "You have logged in to your account successfully.",
            data: sendData,
        });
    } catch (error) {
        console.error(
            "Server Error at user/controller/auth.controller in login ==> Error : ",
            error
        );
        return response.status(500).json({
            status: false,
            message: "Server Error! Failed to Login User",
            data: null,
        });
    }
};