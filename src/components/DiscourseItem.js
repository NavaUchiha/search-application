import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardHeader, IconButton, Typography } from "@mui/material";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

const DiscourseItem = function ({ discourse }) {
  return (
    <Card elevation={6}>
      <CardHeader
        action={
          <IconButton>
            <BookmarkBorderOutlinedIcon color="primary" />
          </IconButton>
        }
        title={discourse.title}
        subheader={discourse.date}
      />
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {discourse.highlights}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DiscourseItem;
