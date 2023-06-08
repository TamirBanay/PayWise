import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Badge from "@mui/joy/Badge";

export default function EllipsisList(props) {
  const amount = props.voucher.ammount.toString().split(".00");
  return (
    <Box sx={{ width: "87%", direction: "rtl", position: "static" }}>
      <List
        aria-labelledby="ellipsis-list-demo"
        sx={{ "--ListItemDecorator-size": "56px" }}
      >
        <Avatar
          sx={{
            position: "absolute",
            left: "100%",
            mt: "3%",
            boxShadow: "0px 0px 3px  ",
          }}
          src={props.img}
        />

        <ListItem onClick={props.handleClick}>
          <ListItemContent>
            <Typography level="h6" sx={{ width: "50%" }}>
              {" "}
              {props.voucher.storeName}
            </Typography>
            <Typography
              sx={{ mr: "80%", mt: -3, textAlign: "left" }}
              level="h6"
            >
              {" "}
              ₪{amount}
            </Typography>
            <Typography level="body2" sx={{ mr: 0 }}>
              {props.voucher.dateOfExpiry.slice(0, 10)}
            </Typography>
          </ListItemContent>
        </ListItem>
        <Divider sx={{ borderBottom: "0.5px solid black", right: "3%" }} />
      </List>
    </Box>
  );
}
