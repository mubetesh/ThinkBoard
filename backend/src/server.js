import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/ratelimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();



// Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
} // Enable CORS for local development
else {
  app.use(cors());
} // Enable CORS for all origins in production
app.use(express.json()); // used to parse JSON request bodies and populate req.body
app.use(rateLimiter); // Apply rate limiting middleware to all routes


// Connect to Database
connectDB();

// Routes
app.use("/api/notes", notesRoutes); // Prefix all note routes with /api/notes
app.use("/api/users", usersRoutes); // Prefix all user routes with /api/users

// Serve static assets if in production

if (process.env.NODE_ENV === "production") {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Adjusted for Vite build output

  // Handle React routing, return all requests to React app

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  }); // Catch-all route to serve index.html for any unmatched routes 
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
