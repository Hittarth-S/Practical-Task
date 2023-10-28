const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const Module = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        addedBy: {
            type: Schema.Types.ObjectId,
            ref: "Users"
        },
        status: {
            type: String,
            enum: ["active", "deActive"],
            default: "active",
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

Module.plugin(mongoosePaginate);

module.exports = mongoose.model("Module", Module);