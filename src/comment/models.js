const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: String,
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true });

const Comment = new mongoose.model("Comment", commentSchema);
module.exports = { Comment };