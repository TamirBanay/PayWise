import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import card from "../dashboard/card.css";

export default function ActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea>
        <CardMedia component="img" image={props.logo} alt="green iguana" />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="nameAndPrice"
          >
            <div>{props.name}</div>
            <div>{props.price + "$"}</div>
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {"Expiry Date - " + props.date}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "right" }}
          ></Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
