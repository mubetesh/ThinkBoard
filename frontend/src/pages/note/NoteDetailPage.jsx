import { useParams, useNavigate, useLocation, Link } from "react-router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../lib/axios";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

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
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchNote();
    }
  }, [state, id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if( !title.trim() || !description.trim()) {
      toast.error("Title and description are required");
      return;
    }
    try {
      setUpdating(true);
      await api.put(`/notes/${id}`, { title, description });
      toast.success("Note updated!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note");
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note");
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-lg shadow">
      {loading ? (
        <LoaderIcon className="size-20 animate-spin" />
      ) : (
        <div className="flex flex-col items-center">
          <div className="font-bold text-lg mb-4 flex justify-between w-full">
            <Link to="/" className="btn btn-ghost mb-4">
              <ArrowLeftIcon className="size-6" />
              Back to Home
            </Link>
            <Link to="/" className="btn btn-primary mb-4">
              <Trash2Icon className="size-4" />
              <button onClick={(e) => handleDelete(e, id)}>Delete Note</button>
            </Link>
          </div>
          <form onSubmit={handleUpdate} className="flex flex-col gap-4 w-full">
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
            <button
              type="submit"
              className="btn btn-primary"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Note"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NoteDetailPage;
