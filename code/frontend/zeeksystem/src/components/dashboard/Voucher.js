import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import bin from "../dashboard/bin.png";
import { useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DoneIcon from "@mui/icons-material/Done";
import { useLocation } from "react-router-dom";

export default function InteractiveCard(props) {
  const location = useLocation();

  const { pathname } = location;
  const hendleDelete = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:8000/api/deletVouchers/${props.vID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    props.getWallet();
  };

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        marginTop: 0.5,
        direction: "rtl",
        width: 320,
        gap: 2,
        left: 7,
        "&:hover": {
          boxShadow: "md",
          borderColor: "neutral.outlinedHoverBorder",
        },
      }}
      onClick={props.handleClick}
    >
      <AspectRatio ratio="1" sx={{ width: 90 }}>
        <img src={props.img} alt={props.voucher.storeType} />
      </AspectRatio>
      <div>
        <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
          {props.voucher.storeName}
        </Typography>
        <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
          {props.voucher.dateOfExpiry.slice(0, 10)}
        </Typography>
        <Typography>
          {props.voucher.ammount} ₪
          <Typography>
            {" "}
            {props.voucher.redeemed ? <DoneIcon color="success" /> : ""}
          </Typography>
        </Typography>
      </div>
    </Card>
  );
}
