const mongoose = require("mongoose");
const { Schema } = mongoose;
require("@mongoosejs/double");
const mongoosePaginate = require("mongoose-paginate-v2");

const Users = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

Users.plugin(mongoosePaginate);

module.exports = mongoose.model("Users", Users);
