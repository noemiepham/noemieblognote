import { Typography, Button } from "@material-ui/core";
import { KeyboardArrowRight } from "@material-ui/icons";
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
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("");
  const [editNote, setEditNote] = useState(false);
  const params = useParams();

  console.log("=====>", params.note);

  useEffect(() => {
    const note = params.note;
    if (note) {
      setTitle(note.title);
      setDetails(note.setDetails);
      setEditNote(true);
    }
  }, [params]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setDetailsError(false);
    setTitleError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (details === "") {
      setDetailsError(true);
    }
    console.log(titleError);
    console.log(detailsError);

    const currentDate = format(new Date(), "do MMMM Y");
    if (title && details && category) {
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, details, category, currentDate }),
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
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Detail"
          variant="outlined"
          color="secondary"
          fullWidth
          multiline
          minRows={4}
          required
          error={detailsError}
        />
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
