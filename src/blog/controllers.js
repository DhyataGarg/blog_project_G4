const { Blog } = require('./models');

const createNewBlog = async (req, res) => {
    var newBlog = await Blog.create(req.body);
    return res.json({ status: "Done", newBlog });
}

const getBlogs = async (req, res) => {
    var blogs = await Blog.find({ user_id: req.user }).populate("user_id");

    return res.json({ status: "Done", blogs });
}

module.exports = { createNewBlog, getBlogs };