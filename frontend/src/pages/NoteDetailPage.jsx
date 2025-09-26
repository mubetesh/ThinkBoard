import { useLocation, useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const NoteDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const passedNote = location.state?.note;
  const [note, setNote] = useState(passedNote);
  const [title, setTitle] = useState(passedNote?.title || "");
  const [description, setDescription] = useState(passedNote?.description || "");
  const [loading, setLoading] = useState(!passedNote);

  useEffect(() => {
    if (!note) {
      (async () => {
        try {
          const res = await axios.get(`http://localhost:5001/api/notes/${id}`);
          setNote(res.data);
          setTitle(res.data.title);
          setDescription(res.data.description);
        } catch (error) {
          toast.error("Failed to load note");
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [id, note]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/notes/${id}`, { title, description });
      toast.success("Note updated!");
      setNote({ ...note, title, description });
      // Optionally navigate back or refresh
    } catch (error) {
      toast.error("Failed to update note");
    }
  };

  if (loading) return <p className="p-4 text-gray-500">Loading note…</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="card bg-white shadow p-6">
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="input input-bordered"
            required
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="textarea textarea-bordered"
            required
          />
          <button type="submit" className="btn btn-primary">
            Update Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoteDetailPage;