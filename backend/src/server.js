import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/ratelimiter.js';
import cors from "cors"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({origin : "http://localhost:5173" })) // Adjust the origin as per your frontend's address
app.use(express.json()); // used to parse JSON request bodies and populate req.body
app.use(rateLimiter); // Apply rate limiting middleware to all routes

// Connect to Database
connectDB();

// Routes
app.use("/api/notes", notesRoutes);
app.use("/api/users", usersRoutes);

//
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




