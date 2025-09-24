import mongoose from 'mongoose';

const noteSchema =  mongoose.Schema({
    title: {
        type:String,
        required: true,
    },
    description: {
        type:String,
        required: true,
    },
},
{
    timestamps: true,
});  // This schema defines the structure of a note document in MongoDB. Each note will have a title and description, both of which are strings and required. The timestamps option automatically adds createdAt and updatedAt fields to the schema.

const Note = mongoose.model('Note', noteSchema);  // This creates a Mongoose model named 'Note' based on the noteSchema. The model provides an interface for interacting with the notes collection in the MongoDB database.
export default Note;