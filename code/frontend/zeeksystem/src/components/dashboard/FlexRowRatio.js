// import * as React from "react";
// import AspectRatio from "@mui/joy/AspectRatio";
// import Typography from "@mui/joy/Typography";
// import Sheet from "@mui/joy/Sheet";
// import List from "@mui/joy/List";
// import ListDivider from "@mui/joy/ListDivider";
// import ListItem from "@mui/joy/ListItem";
// import ListItemContent from "@mui/joy/ListItemContent";
// import ListItemButton from "@mui/joy/ListItemButton";
// import pAndBLogo from "../../images/pAndBLogo.jpg";
// import { useLocation } from "react-router-dom";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import LanguageSharpIcon from "@mui/icons-material/LanguageSharp";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";

// // const data = [
// //   {
// //     src: zaraLogo,
// //     title: "ZARA",
// //     description: "200$",
// //     dueDate: "29.4.23",
// //     link: "https://www.zara.com/il/",
// //   },
// // ];

// export default function FlexRowRatio(props) {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const location = useLocation();
//   const { pathname } = location;
//   const [selectedCardData, setSelectedCardData] = React.useState([]);

//   const handleToggleFavorite = (index) => {
//     if (selectedCardData.includes(data[index])) {
//       setSelectedCardData(
//         selectedCardData.filter((item) => item !== data[index])
//       );
//     } else {
//       setSelectedCardData([...selectedCardData, data[index]]);
//     }
//   };
//   return (
//     <Sheet
//       variant="outlined"
//       sx={{
//         direction: "rtl",
//         display: "flex",
//         flexDirection: "column",
//         gap: 5,
//         width: props.width,
//         borderRadius: "sm",
//         marginLeft: pathname == "/" ? "30px" : "",
//       }}
//     >
//       <List sx={{ py: "var(--ListDivider-gap)" }}>
//         {data.map((item, index) => (
//           <React.Fragment key={item.title}>
//             <ListItem>
//               <ListItemButton
//                 sx={{
//                   gap: 2,
//                   "&:hover": isMobile
//                     ? ""
//                     : {
//                         background: "rgba(0, 0, 0, 0.1)", // Update the background color
//                         borderRadius: "sm", // Update the border radius
//                         transform: "scale(1.05) translateX(-15px)", // Update the transform property
//                       },
//                 }}
//               >
//                 <AspectRatio
//                   sx={{
//                     flexBasis: 120,
//                     borderRadius: "sm",
//                     overflow: "auto",
//                   }}
//                 >
//                   <img
//                     src={`${item.src}?w=120&fit=crop&auto=format`}
//                     srcSet={`${item.src}?w=120&fit=crop&auto=format&dpr=2 2x`}
//                     alt={item.title}
//                   />
//                 </AspectRatio>

//                 <ListItemContent>
//                   <Typography fontWeight="md">{item.title}</Typography>
//                   <Typography level="body2">
//                     {props.voucher.fields.ammount}
//                   </Typography>
//                   <Typography level="body2">{item.dueDate}</Typography>
//                 </ListItemContent>
//               </ListItemButton>
//               <FavoriteIcon
//                 sx={{
//                   position: "fixed",
//                   marginBottom: "30px",
//                   marginRight:
//                     (location.pathname == "/profile") & isMobile
//                       ? "250px"
//                       : (location.pathname == "/profile") & !isMobile
//                       ? "240px"
//                       : (location.pathname == "/") & isMobile
//                       ? "220px"
//                       : "20px",
//                 }}
//                 onClick={() => handleToggleFavorite(index)}
//                 color={
//                   selectedCardData.includes(data[index]) ? "error" : "inherit"
//                 }
//               />
//               <a
//                 href={item.link}
//                 style={{ textDecoration: "none", color: "inherit" }}
//               >
//                 <LanguageSharpIcon
//                   sx={{
//                     position: "relative",
//                     marginTop: "40px",
//                     marginLeft: isMobile ? "" : "10px",
//                   }}
//                 />
//               </a>
//             </ListItem>

//             {index !== data.length - 1 && <ListDivider />}
//           </React.Fragment>
//         ))}
//       </List>
//     </Sheet>
//   );
// }
