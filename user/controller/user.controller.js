const User = require("../../models/users.model");

/* PRODUCT RELATED CONTROLLERS */
// Get User Details By Id
module.exports.getUserById = async (request, response, next) => {
    try {
        const { user } = request.body;

        if (user?._id) {
            const userDetails = await User.findById(user?._id);

            if (!userDetails) {
                return response.status(400).json({
                    status: false,
                    message: "Error While Get User",
                    data: null,
                });
            }

            return response.status(200).json({
                status: true,
                message: "User Details Get Successfully",
                data: userDetails,
            });
        }else{
            return response.status(400).json({
                status: false,
                message: "User Account Not Found",
                data: null,
            });
        }


    } catch (error) {
        console.error(
            "Server Error at user/controller/user.controller in getUserById ==> Error : ",
            error
        );
        return response.status(500).json({
            status: false,
            message: "Server Error! Failed to get user details by Id",
            data: null,
        });
    }
};