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
  poster: {
    margin: 20,
    color: "#a17056",
  },
});

function NoteCard({ note, handleDelete, handleEdit }) {
  const classes = useStyles(note);
  console.log("sfsqdfdsf", note);
  return (
    <div>
      <Card elevation={1} className={classes.test}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0]?.toUpperCase()}
            </Avatar>
          }
          action={
            <div>
              <IconButton onClick={() => handleEdit(note?.id)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(note?.id)}>
                <DeleteOutline />
              </IconButton>
            </div>
          }
          title={note?.title}
          subheader={note?.category}
        />
        <CardContent>
          <Typography variant="poster" color="primary">
            {note?.currentDate}
          </Typography>
          <Typography variant="body2">{note?.details}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default NoteCard;
