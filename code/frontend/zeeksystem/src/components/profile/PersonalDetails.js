import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { _Vouchers, _Redirect, _User } from "../../services/atom";

export default function InsetDividers() {
  const [user_id, setUserId] = useState();
  const [user, setUser] = useRecoilState(_User);
  const [redirect, setRedirect] = useRecoilState(_Redirect);

  const fetchUserData = async () => {
    try {
      const response = await fetch("api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const content = await response.json();
        setUserId(content.id);
        setUser(content);
      } else {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <List
      sx={{
        width: "80%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      <ListItem>
        <ListItemText
          sx={{
            flexDirection: "row",
          }}
        />
        שם מלא: {user.first_name} {user.last_name}
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemText
          sx={{
            flexDirection: "row",
          }}
        />
        {user.email} :Email
      </ListItem>
      <Divider variant="inset" component="li" />

      <ListItem>
        <ListItemText
          sx={{
            flexDirection: "row",
          }}
        />
        תאריך לידה: {user.dateOfBirth}
      </ListItem>

      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemText
          sx={{
            flexDirection: "row",
          }}
        />
        מין: {user.gender}
      </ListItem>
      <Divider variant="inset" component="li" />

      <ListItem>
        <ListItemText
          sx={{
            flexDirection: "row",
          }}
        />
        עיר מגורים: {user.city}
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemText
          sx={{
            flexDirection: "row",
          }}
        />
        רחוב: {user.street}
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemText
          sx={{
            flexDirection: "row",
          }}
        />
        מס' בית: {user.houseNumber}
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemText
          sx={{
            flexDirection: "row",
          }}
        />
      </ListItem>
    </List>
  );
}
