import { Typography, Button } from "@material-ui/core";
import { KeyboardArrowRight, NoteAddRounded } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import format from "date-fns/format/index";

import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

const Create = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  // const [title, setTitle] = useState("");
  // const [details, setDetails] = useState("");
  // const [category, setCategory] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [editNote, setEditNote] = useState(false);
  const [noteForm, setNoteForm] = useState({
    id: undefined,
    title: "",
    details: "",
    category: "",
    currentDate: format(new Date(), "do MMMM Y"),
  });
  const params = useParams();
  const { id } = params;

  console.log("=====>", params.note);

  useEffect(() => {
    const note = params.note;
    if (note) {
      // setTitle(note.title);
      // setDetails(note.details);
      // setCategory(note.category);
      setNoteForm(note);
      setEditNote(true);
    }
  }, [params.note]);

  const isValid = (data) => {
    return data.title && data.details && data.category;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setDetailsError(false);
    setTitleError(false);

    if (noteForm.title === "") {
      setTitleError(true);
    }
    if (noteForm.details === "") {
      setDetailsError(true);
    }
    console.log(titleError);
    console.log(detailsError);

    if (isValid(noteForm)) {
      let url = editNote
        ? "http://localhost:8000/notes/" + noteForm.id
        : "http://localhost:8000/notes/";

      fetch(url, {
        method: editNote ? "POST" : "PUT",
        headers: { "content-type": "application/json" },
        body: noteForm,
      }).then(() => navigate("/"));
    }
  };
  return (
    <div>
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom
      >
        {editNote ? " Modify the note" : "create A new Note"}
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
          className={classes.field}
          label="Note title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          value={noteForm.title}
          error={titleError}
        />
        <TextField
          onChange={(e) =>
            setNoteForm({ ...noteForm, details: e.target.value })
          }
          className={classes.field}
          label="Detail"
          variant="outlined"
          color="secondary"
          fullWidth
          multiline
          minRows={4}
          required
          value={noteForm.details}
          error={detailsError}
        />
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={noteForm.category}
            onChange={(e) =>
              setNoteForm({ ...noteForm, category: e.target.value })
            }
          >
            <FormControlLabel value="Money" control={<Radio />} label="Money" />
            <FormControlLabel value="Todos" control={<Radio />} label="Todos" />
            <FormControlLabel value="Work" control={<Radio />} label="Work" />
            <FormControlLabel
              value="Reminders"
              control={<Radio />}
              label="Reminders"
            />
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<KeyboardArrowRight />}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Create;
