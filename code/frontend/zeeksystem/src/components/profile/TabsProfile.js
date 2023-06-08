import Cloud from "@mui/icons-material/Cloud";
import Sun from "@mui/icons-material/LightMode";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import * as React from "react";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";

import { _Vouchers, _Redirect } from "../../services/atom";
import { useRecoilState } from "recoil";
import AlertDialogModal from "../dashboard/AlertDialogModal";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { _User } from "../../services/atom";

export default function ChipWithDecorators(props) {
  const [redirect, setRedirect] = useRecoilState(_Redirect);
  const [openLogOut, setOpenLogOut] = useState(false);
  const history = useHistory();
  const [user_id, setUserId] = useState();
  const [user, setUser] = useRecoilState(_User);

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
  const DeleteUser = async (user_id) => {
    await fetch(`api/deleteAccount/${user_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then(() => {
      history.push("/login");
    });
  };

  const handleDeleteUser = () => {
    DeleteUser(user_id);
  };
  const logOut = async () => {
    setRedirect(true);
    history.push("/login");
    await fetch("api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  };
  const handlelogout = () => {
    logOut();
  };
  return (
    <div>
      <Box sx={{ gap: 0, marginTop: 3, direction: "rtl", mr: "12%" }}>
        <Chip
          variant="plain"
          startDecorator={<InfoIcon color="#DDE6ED" />}
          onClick={props.handlleShowPersonalDetails}
        >
          פרטים אישיים
        </Chip>
      </Box>
      <Box sx={{ gap: 0, marginTop: 3, direction: "rtl", mr: "12%" }}>
        <Chip
          onClick={props.updateDetails}
          variant="plain"
          startDecorator={<EditIcon />}
        >
          עריכת פרטים אישיים
        </Chip>
      </Box>
      <Box sx={{ gap: 0, marginTop: 3, direction: "rtl", mr: "12%" }}>
        <Chip variant="plain">
          <AlertDialogModal
            function={handleDeleteUser}
            icon={1}
            mainText={"לחיצה על המשך תמחק את כל הזיכויים והנתונים שלך"}
            title={"מחיקת חשבון"}
            variant="plain"
            textButton={"המשך"}
            isOpen={openLogOut}
            setOpenDeleteAlert={setOpenLogOut}
            openDeleteAlert={openLogOut}
          />
          סגירת חשבון
        </Chip>
      </Box>
      <Box
        sx={{
          gap: 0,
          marginTop: 3,
          direction: "rtl",
          mr: "12%",
          color: "#000",
        }}
      >
        <Chip variant="plain">
          <AlertDialogModal
            icon={2}
            function={handlelogout}
            mainText={"האם ברצונך להתנתק מהחשבון?"}
            title={"התנתקות"}
            variant="plain"
            textButton={"התנתק"}
            isOpen={openLogOut}
            setOpenDeleteAlert={setOpenLogOut}
            openDeleteAlert={openLogOut}
          />
          התנתקות
        </Chip>
      </Box>
    </div>
  );
}
