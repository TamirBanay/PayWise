import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemButton from "@mui/joy/ListItemButton";
import zaraLogo from "../../images/zaraLogo.png";
import ACELogo from "../../images/ACELogo.jpg";
import pAndBLogo from "../../images/pAndBLogo.jpg";
import { useLocation } from "react-router-dom";

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

export default function FlexRowRatio() {
  const location = useLocation();
  const { pathname, search, hash } = location;
  return (
    <Sheet
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        width: 270,
        borderRadius: "sm",
        marginLeft: pathname == "/" ? "30px" : "",
      }}
    >
      <List sx={{ py: "var(--ListDivider-gap)" }}>
        {data.map((item, index) => (
          <React.Fragment key={item.title}>
            <ListItem>
              <ListItemButton sx={{ gap: 2 }}>
                <AspectRatio
                  sx={{ flexBasis: 120, borderRadius: "sm", overflow: "auto" }}
                >
                  <img
                    src={`${item.src}?w=120&fit=crop&auto=format`}
                    srcSet={`${item.src}?w=120&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                  />
                </AspectRatio>
                <ListItemContent>
                  <Typography fontWeight="md">{item.title}</Typography>
                  <Typography level="body2">{item.description}</Typography>
                  <Typography level="body2">{item.dueDate}</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
            {index !== data.length - 1 && <ListDivider />}
          </React.Fragment>
        ))}
      </List>
    </Sheet>
  );
}
