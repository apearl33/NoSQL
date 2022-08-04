const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;
var User = require('./user');

// User Schema
const userSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	email:{
		type: String,
		default: true
	}
});

// Comments Schema
const commentsSchema = mongoose.Schema({
    user_id:{
        type: ObjectId,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    approved:{
        type: Boolean,
        default: false
    },
    created_at:{
        type: Date,
        default: Date.now
    },
});

// Category Schema
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

// Blogs Schema
const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    author: userSchema,
    comments: [commentsSchema],
    category: [categorySchema]
})

const Blog = module.exports = mongoose.model('Blog', blogSchema);

// Get All Blogs - find method
module.exports.getBlogs = (callback, limit) => {
    Blog.find().exec(callback); 
}


// Get Blog - findById method
module.exports.getBlogById = (id, callback) => {
    Blog.findById(id).exec(callback);
}

// Add Blog - create method
module.exports.addBlog = (blog, callback) => {
	Blog.create(blog, callback);
};

// Update Blog - findOneAndUpdate method
module.exports.updateBlog = (id, newBlog, options, callback) => {
	query = Blog.findById(id)
	Blog.findOneAndUpdate(query, newBlog, options, callback);
};


// Delete Blog - deleteOne method
module.exports.removeBlog = (blog, callback) => {
	Blog.deleteOne(Blog.findById(blog), callback);
};