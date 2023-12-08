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

function NoteCard({ note, handleDelete }) {
  const classes = useStyles(note);
  return (
    <div>
      <Card elevation={1} className={classes.test}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <EditIcon />
              <DeleteOutline />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
          /*   date={note.currentDate} */
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>

          <div>{note.currentDate}</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default NoteCard;
