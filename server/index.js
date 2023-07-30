const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

require('dotenv').config();

const app = express();
// Use the environment variable or default to 3000
const port = process.env.PORT || 6010;

app.use(express.json());

app.use(cors({
    credentials : true,
    origin :  process.env.CLIENT_URL
}));

app.use('/admin', adminRouter);
app.use('/user', userRouter);

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "course-seller" })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
