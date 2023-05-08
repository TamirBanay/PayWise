import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import {
  _Vouchers,
  first_name,
  last_name,
  user_email,
  _User,
} from "../../services/atom";

export default function FormPropsTextFields(props) {
  const [user, setUser] = useRecoilState(_User);
  const [user_id, setUserId] = useState();
  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user", {
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

  const updateUserDetails = async (user_id, data) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/changeDetails/${user_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const user = await response.json();
        console.log("User details updated successfully");
        return user;
      } else {
        console.error("Failed to update user details", error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateDetails = () => {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const gender = document.getElementById("gender").value;
    const city = document.getElementById("city").value;
    const street = document.getElementById("street").value;
    const houseNumber = document.getElementById("house-number").value;
    const dateOfBirth = document.getElementById("date-of-birth").value;

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      gender: gender,
      city: city,
      street: street,
      houseNumber: houseNumber,
      dateOfBirth: dateOfBirth,
    };

    updateUserDetails(user_id, data).then((user) => {
      console.log("User details updated:", user);
    });
  };
  const handlleChangeDetailsUser = () => {
    props.setEditProfileDetails(!props.editProfileDetails);
  };
  const handleButtonClick = () => {
    handleUpdateDetails();
    props.handlleChangeDetailsUser();
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        direction: "rtl",
        marginRight: 13,
        paddingBottom: 5,
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField id="first-name" label="שם" defaultValue={user.first_name} />
        <TextField
          id="last-name"
          label="שם משפחה"
          defaultValue={user.last_name}
        />
        <TextField id="email" label="מייל" defaultValue={user.email} />
        <TextField id="gender" label="מין" defaultValue={user.gender} />
        <TextField id="city" label="עיר" defaultValue={user.city} />
        <TextField id="street" label="רחוב" defaultValue={user.street} />
        <TextField
          id="house-number"
          label="מס' בית"
          defaultValue={user.houseNumber}
        />
        <TextField
          id="date-of-birth"
          label="תאריך לידה "
          defaultValue={user.dateOfBirth}
          type="date"
        />
      </div>
      <Button
        variant="contained"
        onClick={handleButtonClick}
        sx={{ marginRight: 1 }}
      >
        עדכן
      </Button>{" "}
    </Box>
  );
}
