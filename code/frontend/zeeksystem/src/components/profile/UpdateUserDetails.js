import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

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
  const [gender, setGender] = React.useState(user.gender);
  // const [dateOfBirth, setDateOfBirth] = React.useState(user.dateOfBirth);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
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
        props.setMessegeToSuccess(!props.messegeToSuccess);
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
    props.fetchUser();
    fetchUserData();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (event) => {
    setGender(event.target.value);
  };
  // const handleChangeBday = (event) => {
  //   setDateOfBirth(event.target.value);
  // };
  // console.log(type(dateOfBirth));
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        direction: "rtl",
        marginRight: 9,
        paddingBottom: 5,
      }}
      noValidate
      autoComplete="off"
    >
      <div
        style={{
          border: "1px solid lightgray",
          borderRadius: "10px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 300,
          marginTop: 10,
        }}
      >
        <TextField id="first-name" label="שם" defaultValue={user.first_name} />
        <TextField
          id="last-name"
          label="שם משפחה"
          defaultValue={user.last_name}
        />
        <TextField
          id="email"
          label="מייל"
          defaultValue={user.email}
          sx={{ direction: "ltr" }}
        />
        <TextField id="city" label="עיר" defaultValue={user.city} />
        <TextField id="street" label="רחוב" defaultValue={user.street} />
        <TextField
          id="house-number"
          label="מס' בית"
          defaultValue={user.houseNumber}
        />
        <TextField
          id="date-of-birth"
          label="תאריך לידה"
          defaultValue={user.dateOfBirth}
          type="date"
          inputProps={{ max: selectedDate }}
        />
        <Select
          variant="outlined"
          sx={{ marginLeft: 9, width: 150, marginTop: 1, marginBottom: 1 }}
          id="gender"
          value={gender}
          onChange={handleChange}
        >
          <MenuItem value={"זכר"}>זכר</MenuItem>
          <MenuItem value={"נקבה"}>נקבה</MenuItem>
          <MenuItem value={"אחר"}>אחר</MenuItem>
        </Select>
        <Button
          variant="contained"
          onClick={handleButtonClick}
          sx={{ marginLeft: 20 }}
        >
          עדכן
        </Button>{" "}
      </div>
    </Box>
  );
}
