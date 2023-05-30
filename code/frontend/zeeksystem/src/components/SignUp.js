import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Redirect } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright ©  Tamo&Oz "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [redirect, setRedirect] = React.useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: data.get("firstName"),
          last_name: data.get("lastName"),
          email: data.get("email"),
          password: data.get("password"),
          gender: data.get("row-radio-buttons-group"),
          city: data.get("city"),
          street: data.get("street"),
          dateOfBirth: data.get("date"),
        }),
      });

      if (response.ok) {
        setRedirect(true);
      } else if (response.status === 409) {
        alert("המייל כבר בשימוש");
        throw new Error("המייל כבר בשימוש");
      } else {
        alert("המייל כבר בשימוש");
        throw new Error("המייל כבר בשימוש, לא ניתן להירשם");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const test = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("street"));
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            direction: "rtl",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            הרשמה{" "}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, direction: "rtl" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="שם פרטי"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="שם משפחה"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="כתובת מייל"
                  name="email"
                  autoComplete="email"
                  sx={{ direction: "ltr" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="סיסמא"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="עיר "
                  name="city"
                  autoComplete="city"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="street"
                  label="רחוב"
                  name="street"
                  autoComplete="street"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={selectedDate}
                  helperText="תאריך לידה"
                  inputProps={{ max: selectedDate }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  sx={{ mr: "-7%" }}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="נקבה"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="זכר"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="אחר"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              הירשם{" "}
            </Button>
            <Grid container justifyContent="flex-end" sx={{ direction: "ltr" }}>
              <Grid item>
                <Link href="/#/login" variant="body2">
                  כבר יש לך משתמש? לחץ כדי להתחבר
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
