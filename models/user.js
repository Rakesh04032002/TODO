const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: String,
    password: {
        type: String,
        required: true,
    },
    list: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "List",
        },
    ],
});

module.exports = mongoose.model("User", userSchema);
