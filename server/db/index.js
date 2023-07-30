const mongoose = require("mongoose");

//user schema
const userSchema = new mongoose.Schema({
	FirstName: String,
	LastName: String,
	email: String,
	password: String,
	purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
})

//admin schema
const adminSchema = new mongoose.Schema({
	FirstName: String,
	LastName: String,
	email: String,
	password: String,
	createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
})

//courses schema
const courseSchema = new mongoose.Schema({
	title: String,
	description: String,
	price: Number,
	imageLink: String,
	published: Boolean,
	publishedBy: Array,
})

//make models
const Admin = mongoose.model('Admin', adminSchema);
const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);


module.exports = {
	Admin,
	User,
	Course
}