const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const Role = new Schema(
    {
        role: {
            type: String,
            required: true,
        },
        permission: [
            {
                module: {
                    type: Schema.Types.ObjectId,
                    ref: "Module",
                    required: true,
                },
                read: {
                    type: Boolean,
                    default: false,
                    required: true,
                },
                create: {
                    type: Boolean,
                    default: false,
                    required: true,
                },
                write: {
                    type: Boolean,
                    default: false,
                    required: true,
                },
                delete: {
                    type: Boolean,
                    default: false,
                    required: true,
                },
                update: {
                    type: Boolean,
                    default: false,
                    required: true,
                },
            },
        ],
        addedBy: {
            type: Schema.Types.ObjectId,
            ref: "Users",
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

Role.plugin(mongoosePaginate);

module.exports = mongoose.model("Role", Role);
