const mongoose = require('mongoose')
const { User } = require("../auth/models");

const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = { Blog };