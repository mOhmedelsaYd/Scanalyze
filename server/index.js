const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ApiError = require('./utils/apiError')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config({});
const authRoute = require('./routes/auth.route');
const staffRoute = require('./routes/staff.route');
const branchRoute = require('./routes/branch.route');
const globalError = require('./middlewares/globalError');

// Connect to MongoDB
connectDB();

const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true); // Accept all origins
    },
    credentials: true, // Allow credentials (cookies)
};


// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());
app.use(cors(corsOptions));



// Apis
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/staff', staffRoute);
app.use('/api/v1/branches', branchRoute);



app.use(globalError);



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})