import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { yellow, green, pink, blue } from "@material-ui/core/colors";
import { DeleteOutline } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      console.log(note.category);
      if (note.category === "Work") {
        return yellow[700];
      }
      if (note.category === "Money") {
        return green[500];
      }
      if (note.category === "Todos") {
        return pink[500];
      } else {
        return blue[500];
      }
    },
  },
  style: {
    margin: 20,
  },
});

function NoteCard({ note, handleDelete, handleEdit }) {
  const classes = useStyles(note);
  console.log("sfsqdfdsf", note);
  return <div></div>;
}

export default NoteCard;
