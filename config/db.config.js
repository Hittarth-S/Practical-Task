const { DATABASE } = require("./config");
const mongoose = require("mongoose");
const Role = require("../models/role.model");
const User = require("../models/users.model");
const Module = require("../models/module.model")
const { setPassword } = require("../helpers/password.helper");

const connectDb = mongoose.connect(
  DATABASE.CONNECT_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  async (err) => {
    if (err) {
      console.log("Connection to Database failed. Reason ===>", err);
    } else {
      let roleId = '';
      const checkData = await Role.findOne({ role: "SUPER-ADMIN" });
      if (!checkData) {
        const module = await Module.create({ name: "ADMIN" })

        const role = await Role.create({
          role: "SUPER-ADMIN",
          permission: {
            module: module._id,
            read: true,
            create: true,
            write: true,
            delete: true,
            update: true
          }
        });
        await User.create({
          userName: DATABASE.USERNAME,
          firstName: DATABASE.FIRST_NAME,
          lastName: DATABASE.LAST_NAME,
          role: role._id,
          email: DATABASE.EMAIL,
          password: setPassword(DATABASE.PASSWORD),
        });
        roleId = role._id
      } else {
        roleId = checkData._id
      }
      const checkUser = await User.findOne({ role: roleId });
      if (!checkUser) {
        await User.create({
          userName: DATABASE.USERNAME,
          firstName: DATABASE.FIRST_NAME,
          lastName: DATABASE.LAST_NAME,
          role: checkData._id,
          email: DATABASE.EMAIL,
          password: setPassword(DATABASE.PASSWORD),
        });
      }
      console.log("Database connection successful.");
    }
  },
);

const database = mongoose.connection;

database.on("error", console.error.bind(console, "MongoDB connection error"));

module.exports = connectDb;
