const { Schema } = require("mongoose");

module.exports = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: false,
    }
});
