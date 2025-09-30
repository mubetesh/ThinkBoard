import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/ratelimiter.js';
import cors from "cors"
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: "http://localhost:5173" }));
}
app.use(express.json()); // used to parse JSON request bodies and populate req.body
app.use(rateLimiter); // Apply rate limiting middleware to all routes

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
}
 app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Connect to Database
connectDB();

// Routes
app.use("/api/notes", notesRoutes);
app.use("/api/users", usersRoutes);

//
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




