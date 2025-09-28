import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
); // This schema defines the structure of a user document in MongoDB. Each user will have a name, sex, and age. The timestamps option automatically adds createdAt and updatedAt fields to the schema.

const User = mongoose.model("User", userSchema); // This creates a Mongoose model named 'User' based on the userSchema. The model provides an interface for interacting with the users collection in the MongoDB database.
export default User; // This exports the User model for use in other parts of the application.
