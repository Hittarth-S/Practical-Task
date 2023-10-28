const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const Product = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: [
      {
        url: {
          type: String,
        }
      }
    ],
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "comingSoon"],
      default: "active",
      required: true,
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

Product.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", Product);
