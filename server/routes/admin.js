const express = require('express');
const { SECRET, authenticateAdminJwt } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const { Admin, Course } = require('../db');

const router = express.Router();

router.post('/', (res,req) => {
	res.json({message: 'Admin route'})
})

// Admin routes
router.post('/signup', async (req, res) => {
	const { FirstName, LastName, email, password } = req.body;
	const admin = await Admin.findOne({ email })
	if (admin) {
		res.status(403).json({ message: 'Admin already exists' });
	} else {
		const newAdmin = new Admin({ FirstName, LastName, email, password });
		newAdmin.save();
		const token = jwt.sign({ email, role: 'admin' }, SECRET, { expiresIn: '1h' });
		res.json({ message: 'Admin created successfully', token });
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.headers;
	const admin = await Admin.findOne({ email, password })
	
	if (admin) {
		const token = jwt.sign({ email, role: 'admin' }, SECRET, { expiresIn: '1h' });
		res.json({ message: 'Logged in successfully', token });
	} else {
		res.status(403).json({ message: 'Invalid Admin credentials' });
	}
});

router.get('/me', authenticateAdminJwt, async (req, res) => {
	//find FirstName from the Admins collection
	const FirstName = await Admin.findOne({ email: req.user.email }).select('FirstName -_id')
	res.json(FirstName);
})

// create course
router.post('/courses', authenticateAdminJwt, async (req, res) => {
	//adding a new course to the courses collection
	const course = new Course(req.body);	
	const adminDetails = await Admin.findOne({ email: req.user.email }).select('_id FirstName LastName')
	course.publishedBy.push(adminDetails);
	await course.save();
	
	await Admin.findOneAndUpdate({ email: req.user.email }, { $push: { createdCourses: course } })
	
	res.json({ message: 'Course created successfully', courseId: course.id });
});

router.put('/courses/:courseId', authenticateAdminJwt, async (req, res) => {
	const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true })
	if (course) {
		res.json({ message: 'Course updated successfully' });
	} else {
		res.status(404).json({ message: 'Course not found' });
	}
});

router.get('/courses', authenticateAdminJwt, async (req, res) => {
	const courses = await Admin.findOne({ email: req.user.email }).populate('createdCourses')
	res.json({ courses: courses.createdCourses || [] })
});

router.get('/courses/:courseId', authenticateAdminJwt, async (req, res) => {
	const courseID = await Course.findById(req.params.courseId)
	if (courseID) {
		res.json(courseID)
	} else {
		res.json({ message: 'Wrong Course ID' })
	}
});

router.delete('/courses/:courseId', authenticateAdminJwt, async (req, res) => {
	await Course.findByIdAndDelete(req.params.courseId)
	await Admin.findOneAndUpdate({ email: req.user.email }, { $pull: { createdCourses: req.params.courseId } })
	res.json({ message: 'Course deleted successfully' })
});

module.exports = router;