import { useParams, useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../lib/axios";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state?.note) {
      setTitle(state.note.title);
      setDescription(state.note.description);
    }
    setLoading(false);
  }, [state]);

  useEffect(() => {
    if (!state?.note) {
      const fetchNote = async () => {
        try {
          const response = await api.get(`/notes/${id}`);
          setTitle(response.data.title);
          setDescription(response.data.description);
        } catch (error) {
          toast.error("Error fetching note");
        } finally {
          setLoading(false);
        }
      };
      fetchNote();
    }
  }, [state, id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      await api.put(`/notes/${id}`, { title, description });
      toast.success("Note updated!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-lg shadow">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input input-bordered"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="textarea textarea-bordered h-40"
          />
          <button type="submit" className="btn btn-primary" disabled={updating}>
            {updating ? "Updating..." : "Update Note"}
          </button>
        </form>
      )}
    </div>
  );
};

export default NoteDetailPage;
