const express = require('express');
const { isAuthenticated } = require("../helper/util");
const { createNewBlog, getBlogs, updateBlog, deleteBlog } = require('./controllers');
const blogRouter = express.Router();

blogRouter.route('/blog').post(isAuthenticated, createNewBlog).get(isAuthenticated, getBlogs).patch(isAuthenticated, updateBlog).delete(isAuthenticated, deleteBlog);

module.exports = blogRouter;
