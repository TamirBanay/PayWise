import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import bin from "../dashboard/bin.png";

export default function InteractiveCard(props) {
  const hendleDelete = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:8000/api/deletVouchers/${props.vID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        direction: "rtl",
        width: 320,
        gap: 2,
        "&:hover": {
          boxShadow: "md",
          borderColor: "neutral.outlinedHoverBorder",
        },
      }}
    >
      <AspectRatio ratio="1" sx={{ width: 90 }}>
        <img
          src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
          srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <div>
        <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
          {props.voucher.storeType}
        </Typography>
        <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
          {props.voucher.dateOfExpiry.slice(0, 10)}
        </Typography>
        <Typography> {props.voucher.ammount}</Typography>
        <img src={bin} width="10" height="10" onClick={hendleDelete} />
      </div>
    </Card>
  );
}
