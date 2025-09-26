import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { DeleteIcon } from "lucide-react";

const NoteDelete = ({ noteId, onDeleted }) => {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/notes/${noteId}`);
      toast.success("Note deleted!");
      if (onDeleted) onDeleted();
    } catch (error) {
      toast.error("Error deleting note.");
    }
  };

  return (
    <button onClick={handleDelete} title="Delete Note" className="btn btn-ghost text-error">
      <DeleteIcon className="size-6" />
    </button>
  );
};

export default NoteDelete;