const Users = require("../../models/users.model");
const Role = require("../../models/role.model");


// Update Users
module.exports.updateUser = async (request, response, next) => {
    try {
        const { firstName, lastName, mobile, email, user, status } = request.body;

        const { id } = request.params;

        const checkUser = await Users.findOne({
            isDeleted: false,
            _id: id,
        });
        if (!checkUser) {
            return response.status(409).json({
                status: false,
                message: "User Not Found",
                data: null,
            });
        }


        const updateUser = await Users.findByIdAndUpdate(
            { _id: id },
            {
                firstName,
                lastName,
                mobile,
                email,
                user,
                status,
                addedBy: user._id,
            },
            { new: true }
        );

        if (!updateUser) {
            return response.status(400).json({
                status: false,
                message: "Error While Update User",
                data: null,
            });
        }

        return response.status(200).json({
            status: true,
            message: "User Details Updated Successfully",
            data: updateUser?._id,
        });
    } catch (error) {
        console.error(
            "Server Error at admin/controller/users.controller in updateUser ==> Error : ",
            error
        );
        return response.status(500).json({
            status: false,
            message: "Server Error! Failed to update users details",
            data: null,
        });
    }
};

// Get All Users List
module.exports.getUsers = async (request, response, next) => {
    try {
        const { page, sizePerPage, status, search } = request.query;
        let options = {
            page,
            limit: sizePerPage,
            sort: { createdAt: -1 },
        };

        const checkRole = await Role.findOne({ role: "USER" });
        if (!checkRole) {
            return response.status(409).json({
                status: false,
                message: "Role Not Found",
                data: null,
            });
        }


        let query = {
            isDeleted: false,
            role: checkRole?._id
        };
        if (search) {
            query = {
                $or: [
                    { firstName: { $regex: search } },
                    { lastName: { $regex: search } },
                    { email: { $regex: search } },
                    { mobile: { $regex: search } },
                ],
                isDeleted: false,
            };
        }
        if (status) {
            query.status = status;
        }

        const UsersList = await Users.paginate(query, options);

        if (!UsersList) {
            return response.status(400).json({
                status: false,
                message: "Error While Get Users List",
                data: null,
            });
        }

        return response.status(200).json({
            status: true,
            message: "Users List Get Successfully",
            data: UsersList,
        });
    } catch (error) {
        console.error(
            "Server Error at admin/controller/users.controller in getUsers ==> Error : ",
            error
        );
        return response.status(500).json({
            status: false,
            message: "Server Error! Failed to get users list",
            data: null,
        });
    }
};

// Get Users Details By Id
module.exports.getUserById = async (request, response, next) => {
    try {
        const { id } = request.params;

        const userDetails = await Users.findById(id).populate({
            path: "addedBy",
        });

        if (!userDetails) {
            return response.status(400).json({
                status: false,
                message: "Error While Get User Details",
                data: null,
            });
        }

        return response.status(200).json({
            status: true,
            message: "User Details Get Successfully",
            data: userDetails,
        });
    } catch (error) {
        console.error(
            "Server Error at admin/controller/users.controller in getUserById ==> Error : ",
            error
        );
        return response.status(500).json({
            status: false,
            message: "Server Error! Failed to get user details by Id",
            data: null,
        });
    }
};

// Delete Users Details By Id
module.exports.deleteUser = async (request, response, next) => {
    try {
        const { id } = request.params;

        const updateDetails = await Users.findByIdAndUpdate(
            { _id: id },
            {
                isDeleted: true,
            },
            {
                new: true,
            }
        );

        if (!updateDetails) {
            return response.status(400).json({
                status: false,
                message: "Error While Removing User",
                data: null,
            });
        }

        return response.status(200).json({
            status: true,
            message: "User Removed Successfully",
            data: updateDetails?._id,
        });
    } catch (error) {
        console.error(
            "Server Error at admin/controller/users.controller in deleteUserById ==> Error : ",
            error
        );
        return response.status(500).json({
            status: false,
            message: "Server Error! Failed to delete user details by Id",
            data: null,
        });
    }
};