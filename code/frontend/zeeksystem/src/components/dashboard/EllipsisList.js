import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Grid from "@mui/material/Grid";

export default function EllipsisList(props) {
  const amount = props.voucher.ammount.toString().split(".00");
  return (
    <Grid>
      <Grid
        container
        direction="column-reverse"
        justifyContent="space-between"
        spacing={-3}
      >
        <Box sx={{ direction: "rtl" }}>
          <List
            aria-labelledby="ellipsis-list-demo"
            sx={{ "--ListItemDecorator-size": "56px", height: "56px" }}
          >
            <Grid container spacing={2}>
              <Grid item alignItems="flex-end">
                <Avatar
                  size="lg"
                  sx={{
                    // position: "absolute",
                    // left: "97%",
                    // mt: "1%",
                    boxShadow: "0px 0px 3px 0px  ",
                    "& .MuiAvatar-circular	": {},
                  }}
                  src={props.img}
                />
              </Grid>
              <Grid item sx={{ width: "55%" }}>
                <Typography
                  level="h6"
                  sx={{
                    textAlign: "right",
                  }}
                >
                  {" "}
                  {props.voucher.storeName}
                </Typography>
                <Grid item>
                  {" "}
                  <Typography level="body2" sx={{ textAlign: "right" }}>
                    {props.voucher.dateOfExpiry.slice(0, 10)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item alignSelf="center" sx={{ width: "20%" }}>
                <Typography
                  sx={{
                    textAlign: "left",
                    width: "100%",
                    "&.MuiTypography-h6	": {},
                  }}
                  level="h6"
                  fontWeight="sm"
                >
                  {" "}
                  ₪{amount}
                </Typography>
              </Grid>
            </Grid>
          </List>
        </Box>
      </Grid>

      <Grid item>
        <div style={{ paddingTop: "10px" }}>
          <Divider sx={{ borderBottom: "0.5px solid black" }} />
        </div>
      </Grid>
    </Grid>
  );
}
