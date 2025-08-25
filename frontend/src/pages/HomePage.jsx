import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import axios from "axios";
import toast from "react-hot-toast";
import NoteDetailPage from "./NoteDetailPage";
import NoteCard from "../components/NoteCard";
import api from "../components/lib/axios";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRatelimited, setisRatelimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setisRatelimited(false);
      } catch (error) {
        console.log("Error fetching Notes", error);
        if (error.response && error.response.status === 429) {
          setisRatelimited(true);
        } else {
          toast.error("Failed to load Notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRatelimited && <RateLimitedUI />}

      <div className="mx-auto max-w-7xl p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading...</div>
        )}

        {notes.length === 0 && !isRatelimited && <NotesNotFound />}

        {notes.length > 0 && !isRatelimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
