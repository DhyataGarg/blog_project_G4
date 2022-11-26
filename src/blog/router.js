const express = require('express');
const { isAuthenticated } = require("../helper/util");
const { createNewBlog, getBlogs } = require('./controllers');
const blogRouter = express.Router();

blogRouter.route('/blog').post(isAuthenticated, createNewBlog).get(isAuthenticated, getBlogs);

module.exports = blogRouter;
