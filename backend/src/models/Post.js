const mongoose = require("mongoose");
const storage = require('../config/storage');

const postSchema = new mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

postSchema.pre("save", function () {
    if (!this.url) this.url = `${process.env.AppURL}:${process.env.PORT}/files/${this.key}`;
});

postSchema.pre('remove', function () {
    storage.remove(this);  
});

module.exports = mongoose.model("Post", postSchema);
