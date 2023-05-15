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
  const hendleDelete = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:8000/api/deletVouchers/${props.vID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    props.getWallet();
  };
  const amount = props.voucher.ammount.toString().split(".00");
  const color = "#00E396";
  return (
    <Box sx={{ width: 320, direction: "rtl" }}>
      <List
        aria-labelledby="ellipsis-list-demo"
        sx={{ "--ListItemDecorator-size": "56px" }}
      >
        <ListItem onClick={props.handleClick}>
          <ListItemContent>
            <Typography level="h6" sx={{ width: "50%" }}>
              {" "}
              <Badge
                size="sm"
                sx={{ ml: 2 }}
                color={
                  props.voucher.storeType === "קמעונאות"
                    ? "success"
                    : props.voucher.storeType === "אופנה"
                    ? "warning"
                    : props.voucher.storeType === "אלקטרוניקה"
                    ? "primary"
                    : ""
                }
              />
              {props.voucher.storeName}
            </Typography>
            <Typography sx={{ mr: 30, mt: -3 }} level="h6">
              {" "}
              ₪{amount}
            </Typography>
            <Typography level="body2" sx={{ mr: 2 }}>
              {props.voucher.dateOfExpiry.slice(0, 10)}
            </Typography>
          </ListItemContent>
        </ListItem>
        <Divider
          sx={{ borderBottom: "0.5px solid black", height: 1, left: 6 }}
        />
      </List>
    </Box>
  );
}
