import Note from '../models/Note.js';

const getAllNotes = async (req,res) => {
    try {
        const allNotes = await Note.find().sort({createdAt:-1}); // Fetch all notes from the database and sort them by creation date in descending order.
        res.status(200).json(allNotes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notes', error });
    }
}
const getNoteById = async (req, res) => {
    try {
        const fetchedNote = await Note.findById(req.params.id);
        if (!fetchedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }   // If no note is found with the given ID, respond with a 404 status and a message indicating that the note was not found.
        res.status(200).json(fetchedNote);
    } catch (error) {
        console.error('Error fetching note by ID:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

const createNote = async (req, res) => {
    try{
        const {title, description} = req.body
        const newNote = new Note({title, description})
        const savedNote = await newNote.save()
        res.status(201).json(savedNote)
    }
    catch(error){
        console.error('Error creating note:', error);
        res.status(500).json({message:'Internal Server Error', error});

    }
};

const updateNote = async (req, res) => {
    try {
        const {title, description} = req.body

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title,description},{new:true})

        if(!updatedNote){
            return res.status(404).json({message:'Note not found'}); 
        } // If no note is found with the given ID, respond with a 404 status and a message indicating that the note was not found.

        res.status(200).json(updatedNote)


    }
    catch(error){
        console.error('Error updating note:', error);
        res.status(500).json({message:'Internal Server Error', error});
    }
};

const deleteNote = async (req, res) => {
try{
    const deletedNote = await Note.findByIdAndDelete(req.params.id)
    if(!deletedNote) return res.status(404).json({message:'Note not found'});
    res.status(200).json({ message: 'Note deleted successfully' });
}
catch(error){
        console.error('Error deleting note:', error);
        res.status(500).json({message:'Internal Server Error', error});
    }
};

export { getAllNotes, getNoteById, createNote, updateNote, deleteNote };