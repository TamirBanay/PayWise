import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Redirect } from "react-router-dom";
import { _Redirect } from "../services/atom";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import payWiseLogo from "../images/payWiseLogo.png";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © Tamo&Oz "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const [redirect, setRedirect] = useRecoilState(_Redirect);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: data.get("email"),
          password: data.get("password"),
        }),
      });

      if (response.ok) {
        setRedirect(false);
        history.push("/");
      } else {
        alert("Incorrect username or password, please try again");
        throw new Error("Incorrect username or password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://c1.wallpaperflare.com/preview/95/532/937/under-the-roof-shopping-inside-sale.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={payWiseLogo} style={{ height: 100 }} />

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, direction: "rtl" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="מייל"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{ direction: "ltr" }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="סיסמה"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{
                  // direction: "ltr",
                  "&.MuiTextField-root": {
                    dir: "rtl",
                  },
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="זכור אותי"
                sx={{ mr: "-2%" }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                התחבר{" "}
              </Button>
              <Grid container sx={{ direction: "ltr" }}>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/#/Registration" variant="body2">
                    {"אין לך משתמש עדיין? לחץ להרשמה"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
