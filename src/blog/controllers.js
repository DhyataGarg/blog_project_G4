const { Blog } = require('./models');

const createNewBlog = async (req, res) => {
    var newBlog = await Blog.create(req.body);
    return res.json({ status: "Done", newBlog });
}

const getBlogs = async (req, res) => {
    var blogs = await Blog.find({ user_id: req.user }).populate("user_id");
    return res.json({ status: "Done", blogs });
}

const updateBlog = async (req, res) => {
    var { blog_id } = req.body;
    await Blog.updateOne({ _id: blog_id }, { $set: req.body });

    var blog = await Blog.findById(blog_id);
    return res.json({ status: "Done", blog });
}

const deleteBlog = async (req, res) => {
    await Blog.deleteOne({ _id: req.body.blog_id });

    return res.json({ status: "Done" });
}

module.exports = { createNewBlog, getBlogs, updateBlog, deleteBlog };