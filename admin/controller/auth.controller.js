const jwt = require("jsonwebtoken");
const Admin = require("../../models/users.model");
const Role = require("../../models/role.model");
const config = require("../../config/config");
const {
  setPassword,
  verifyPassword,
} = require("../../helpers/password.helper");

module.exports.register = async (request, response, next) => {
  try {
    const { firstName, lastName, email, password } = request.body;

    // check if user is exists
    const checkUser = await Admin.findOne({
      email: email,
      role: "ADMIN",
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

    //CREATING USER IN MONGODB

    const newUsers = await Admin.create({
      firstName,
      lastName,
      email,
      role: "ADMIN",
      password: pass,
    });

    //jwt token
    const token = jwt.sign(JSON.stringify(newUsers), config.JWT_AUTH_TOKEN);
    const sendData = { userData: newUsers, token: token };

    return response.json({
      status: true,
      message: "You have registered as an admin successfully",
      data: sendData,
    });
  } catch (e) {
    return response.status(500).json({
      status: false,
      message: "Something went wrong. Please try again",
      data: null,
    });
  }
};

module.exports.login = async (request, response, next) => {
  try {
    const { email, password } = request.body;

    const checkRole = await Role.findOne({ role: "SUPER-ADMIN" });
    if (!checkRole) {
      return response.status(409).json({
        status: false,
        message: "Role Not Found",
        data: null,
      });
    }

    const userData = await Admin.findOne({
      email: email,
      role: checkRole._id,
      isDeleted: false,
    })
      .select("+password")
      .populate("role");

    if (!userData) {
      return response.status(401).json({
        status: false,
        message: "No account was found associated with this email",
        data: null,
      });
    }

    const checkPassword = verifyPassword(password, userData.password);
    if (!checkPassword) {
      return response.status(401).json({
        status: false,
        message: "The password entered is incorrect",
        data: null,
      });
    }

    const token = jwt.sign(JSON.stringify(userData), config.JWT_AUTH_TOKEN);
    const sendData = { userData, token: token };

    return response.json({
      status: true,
      message: "You have logged in to your account successfully",
      data: sendData,
    });
  } catch (e) {
    return response.status(500).json({
      status: false,
      message: "Something went wrong. Please try again",
      data: null,
    });
  }
};

module.exports.changePassword = async (request, response, next) => {
  try {
    const { oldPassword, newPassword, user } = request.body;

    const userData = await Admin.findById(user._id).select("+password");
    if (!userData) {
      return response.status(404).json({
        status: false,
        message: "No account was found associated with this user",
        data: null,
      });
    }
    const checkPassword = verifyPassword(oldPassword, userData.password);
    if (!checkPassword) {
      return response.status(413).json({
        status: false,
        message: "The old password doen't match",
        data: null,
      });
    }
    const pass = setPassword(newPassword);
    const updateUserData = await Admin.findOneAndUpdate(
      { _id: user._id },
      { $set: { password: pass } },
      { new: true }
    );
    if (!updateUserData) {
      return response.status(400).json({
        status: false,
        message: "Some error occured while updating your password",
        data: null,
      });
    }
    return response.status(200).json({
      status: true,
      message: "The password has been changed successfully",
      data: [],
    });
  } catch (e) {
    return response.status(500).json({
      status: false,
      message: "Something went wrong. Please try again",
      data: null,
    });
  }
};

module.exports.forgotPassword = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const pass = setPassword(password);
    const updateUserData = await Admin.findOneAndUpdate(
      { email: email },
      { $set: { password: pass } },
      { new: true }
    );
    if (!updateUserData) {
      return response.status(400).json({
        status: false,
        message: "Your email is not associated with any account",
        data: null,
      });
    }
    return response.status(200).json({
      status: true,
      message: "Your password has been changed successfully",
      data: [],
    });
  } catch (e) {
    return response.status(500).json({
      status: false,
      message: "Something went wrong. Please try again.",
      data: null,
    });
  }
};

module.exports.userPass = async (request, response, next) => {
  try {
    const { password, user } = request.body;
    const { id } = request.params;

    const userData = await Admin.findById(id);
    if (!userData) {
      return response.status(404).json({
        status: false,
        message: "User Not Found",
        data: null,
      });
    }
    const pass = setPassword(password);
    const updateUserData = await Admin.findOneAndUpdate(
      { _id: id },
      { $set: { password: pass } },
      { new: true }
    );
    if (!updateUserData) {
      return response.status(400).json({
        status: false,
        message: "id you enter is not associated with any account",
        data: null,
      });
    }
    return response.status(200).json({
      status: true,
      message: "Your password has been changed successfully",
      data: [],
    });
  } catch (e) {
    return response.status(500).json({
      status: false,
      message: "Something went wrong. Please try again.",
      data: null,
    });
  }
};

// module.exports.deleteUser = async (request, response, next) => {
//     try {
//         const { id } = request.params;

//         const updateUserData = await Admin.findByIdAndUpdate(
//             { _id: id },
//             {
//                 $set: { isDeleted: true },
//             },
//             { new: true },
//         );
//         if (!updateUserData) {
//             return response.status(400).json({
//                 status: false,
//                 message: "Some error occured while deleting the account",
//                 data: null,
//             });
//         }
//         return response.status(200).json({
//             status: true,
//             message: "The admin account has been deleted",
//             data: updateUserData,
//         });
//     } catch (e) {
//         return response.status(500).json({
//             status: false,
//             message: "Something went wrong. Please try again",
//             data: null,
//         });
//     }
// };

// module.exports.adminList = async (request, response, next) => {
//     try {
//         const { page, sizePerPage, search } = request.query;

//         const options = {
//             page,
//             limit: sizePerPage,
//             sort: { createdAt: -1 },
//         };
//         let query = { isDeleted: false };
//         if (search) {
//             query = {
//                 $or: [
//                     { name: { $regex: search } },
//                     { email: { $regex: search } },
//                 ],
//             };
//         }

//         const userData = await Admin.paginate(query, options);

//         return response.json({
//             status: true,
//             message: "The list of users have been fetched successfully",
//             data: userData,
//         });
//     } catch (e) {
//         return response.status(500).json({
//             status: false,
//             message: "Something went wrong. Please try again",
//             data: null,
//         });
//     }
// };

// module.exports.getAdmin = async (request, response, next) => {
//     try {
//         const { id } = request.params;

//         const userData = await Admin.findOne({
//             _id: id,
//             isDeleted: false,
//         });
//         if (!userData) {
//             return response.status(409).json({
//                 status: false,
//                 message: "No admin account was found",
//                 data: null,
//             });
//         }

//         return response.json({
//             status: true,
//             message: "The admin have been fetched successfully",
//             data: userData,
//         });
//     } catch (e) {
//         return response.status(500).json({
//             status: false,
//             message: "Something went wrong. Please try again",
//             data: null,
//         });
//     }
// };
