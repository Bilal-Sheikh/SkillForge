const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticateUserJwt, SECRET } = require("../middleware/auth");
const { User, Course } = require("../db");

const router = express.Router();


router.get('/', (req, res) => {
	res.json({ message: 'User API' });
});

// USER ROUTES
router.post('/signup', async (req, res) => {
	const { FirstName, LastName, email, password } = req.body;
	const user = await User.findOne({ email })
	if (user) {
		res.status(400).json({ message: 'User already exists' });
	} else {
		const newUser = new User({ FirstName, LastName, email, password });
		newUser.save();
		const token = jwt.sign({ email, role: 'user' }, SECRET, { expiresIn: '1h' });
		res.json({ message: 'User created successfully', token });
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.headers;
	const user = await User.findOne({ email, password })

	if (user) {
		const token = jwt.sign({ email, role: 'user' }, SECRET, { expiresIn: '1h' });
		res.json({ message: 'Logged in successfully', token });
	} else {
		res.status(403).json({ message: 'Invalid User credentials' });
	}
});

router.get('/me', authenticateUserJwt, async (req, res) => {
	//find FirstName from the Users collection
	const FirstName = await User.findOne({ email: req.user.email }).select('FirstName -_id')
	res.json(FirstName);
})

router.get('/courses', authenticateUserJwt, async (req, res) => {
	const courses = await Course.find({ published: true })
	res.json({ courses: courses })
});

router.get('/courses/:courseId', authenticateUserJwt, async (req, res) => {
	const courseID = await Course.findById(req.params.courseId)
	if (courseID) {
		res.json(courseID)
	} else {
		res.json({ message: 'Wrong Course ID' })
	}
});

//purchaseCourse
router.post('/courses/:courseId', authenticateUserJwt, async (req, res) => {
	const course = await Course.findById(req.params.courseId)

	//check if course is already present in the user.purchasedCourses
	const isPurchased = await User.findOne({ email: req.user.email, purchasedCourses: course._id })

	if (isPurchased) {
		res.status(400).json({ message: 'Course already purchased' });
	}
	else if (!isPurchased) {
		const user = await User.findOne({ email: req.user.email })
		user.purchasedCourses.push(course)
		await user.save()

		res.json({ message: 'Course purchased successfully' });
	} else {
		res.status(404).json({ message: 'Course not found or not available' });
	}
});

router.get('/purchasedCourses', authenticateUserJwt, async (req, res) => {
	const user = await User.findOne({ email: req.user.email }).populate('purchasedCourses')
	res.json({ purchasedCourses: user.purchasedCourses || [] });
});

module.exports = router;