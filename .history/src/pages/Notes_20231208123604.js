import { Grid, Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/notes/" + id, {
      method: "DELETE",
    });

    const newNotes = notes.filter((note) => note.id !== id);

    setNotes(newNotes);
  };
  const handleEdit = (id) => {
    navigate("/edit/" + id);
    /*     await fetch("http://localhost:8000/notes/" + id, {
      method: "PUT",
    }); */
  };
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry columnsCount={3} gutter="10px">
        {notes.map((note) =>
          note ? (
            <NoteCard
              note={note}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              spacing={3}
            />
          ) : (
            ""
          )
        )}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default Notes;
