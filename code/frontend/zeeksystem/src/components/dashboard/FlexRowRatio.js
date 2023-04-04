import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import zaraLogo from "../../images/zaraLogo.png";
import ACELogo from "../../images/ACELogo.jpg";
import pAndBLogo from "../../images/pAndBLogo.jpg";
// import { height } from "@mui/system";

const data = [
  {
    src: zaraLogo,
    title: "ZARA",
    description: "200$",
    dueDate: "29.4.23",
  },
  {
    src: ACELogo,
    title: "ACE",
    description: "70$",
    dueDate: "20.5.23",
  },
  {
    src: pAndBLogo,
    title: "PULL&BEAR",
    description: "120$",
    dueDate: "15.6.23",
  },
];

export default function CarouselRatio() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        py: 1,
        overflow: "auto",
        width: 343,
        scrollSnapType: "x mandatory",
        "& > *": {
          scrollSnapAlign: "center",
        },
        "::-webkit-scrollbar": { display: "none" },
      }}
    >
      {data.map((item) => (
        <Card
          orientation="horizontal"
          key={item.title}
          variant="outlined"
          sx={{
            gap: 2,
            "--Card-padding": (theme) => theme.spacing(2),
          }}
        >
          <AspectRatio
            ratio="1"
            sx={{
              minWidth: 60,
            }}
          >
            <img
              style={{
                objectFit: "fill",
              }}
              src={`${item.src}?h=120&fit=crop&auto=format`}
              srcSet={`${item.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
            />
          </AspectRatio>
          <Box sx={{ whiteSpace: "nowrap" }}>
            <Typography fontWeight="md">{item.title}</Typography>
            <Typography level="body2">{item.dueDate}</Typography>
            <Typography level="body1">{item.description}</Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
