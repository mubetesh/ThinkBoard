import { useEffect, useState } from "react";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";

const Homepage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error in fetching notes.");
        console.log(error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else toast.error("Failed to load notes!");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen ">
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-6xl mx-auto p-4">
        {loading ? (
          <p className="text-center text-lg">Loading notes...</p>
        ) : (
          notes.length > 0 &&
          !isRateLimited && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-gap-4 justify-items-center">
              {notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onDeleted={() =>
                    setNotes(notes.filter((n) => n._id !== note._id))
                  }
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Homepage;
