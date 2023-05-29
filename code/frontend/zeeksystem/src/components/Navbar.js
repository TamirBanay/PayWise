import * as React from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import Person2Icon from "@mui/icons-material/Person2";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { BrowserRouter as NavLink, Redirect } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import payWiseLogo from "../images/payWiseLogo.png";
import Link from "@mui/material/Link";
import { createTheme } from "@mui/material/styles";
import { useRecoilState } from "recoil";
import { _Vouchers, _Redirect } from "../services/atom";
import BasicPopover2 from "./scans/BasicPopover2";
import { useHistory } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AlertDialogModal from "./dashboard/AlertDialogModal";
import { useLocation } from "react-router-dom";
import ScanComponent from "./scans/ScanComponent";
import { Reddit } from "@mui/icons-material";
const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const drawerWidth = 240;
// const location = useLocation();

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);
  const menuId = "primary-search-account-menu";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorAddRedundMenu, setAnchorAddRedundMenu] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const mobileMenuId = "primary-search-account-menu-mobile";
  const AddRefundisMenuOpen = Boolean(anchorAddRedundMenu);
  const [walletID, setWalletID] = React.useState();
  const [vouchers, setVouchers] = useRecoilState(_Vouchers);
  let location = useLocation();
  const [openScan, setOpenScans] = React.useState(false);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1)

  const fetchUserData = async () => {
    try {
      const response = await fetch("api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const content = await response.json();
        setWalletID(content.id + 1000); // Update walletID based on fetched user data
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const getWallet = async () => {
    try {
      const response = await fetch(
        `api/getVouchers/${walletID}`
      );
      const data = await response.json();

      const vouchersArray = JSON.parse(data.vouchers);
      const matchingVouchers = vouchersArray.filter(
        (voucher) => voucher.fields.walletID === walletID
      );

      setVouchers(matchingVouchers);
    } catch (error) {
      console.error("Error retrieving vouchers:", error);
    }
  };
  React.useEffect(() => {
    fetchUserData();
  }, []);
  React.useEffect(() => {
    if (walletID) {
      // Only call getVoucher if walletID is truthy
      getWallet();
    }
  }, [walletID]); // Add walletID as a dependency

  const history = useHistory();
  const [redirect, setRedirect] = useRecoilState(_Redirect);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleOpenScan = () => {
    setOpenScans(!openScan);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAddRedundMenuOpen = (event) => {
    setAnchorAddRedundMenu(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleAddRefundMenuClose = () => {
    setAnchorAddRedundMenu(null);
  };

  //add refund menu rander plus button
  const renderAddRefundMenu = (
    <Menu
      dir="rtl"
      anchorEl={anchorAddRedundMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={AddRefundisMenuOpen}
      onClose={handleAddRefundMenuClose}
    >
      <MenuItem onClick={(handleMenuClose, handleOpenScan)} href="/scanVoucher">
        הוספה ע"י סריקה
      </MenuItem>
      <Divider
        sx={{
          borderBottom: "0.5px solid black",
          height: 1,
          mr: "10%",
          width: "80%",
        }}
      />
      <MenuItem onClick={handleMenuClose}>
        <BasicPopover2
          getWallet={getWallet}
          handleAddRefundMenuClose={handleAddRefundMenuClose}
        />
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        direction: "rtl",
        height:
          location.pathname == "/profile"
            ? 50
            : location.pathname == "/"
            ? 100
            : location.pathname == "/wallet"
            ? 70
            : "",
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginLeft: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"></Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleAddRedundMenuOpen}
              color="inherit"
            >
              <AddRoundedIcon />
            </IconButton>

            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                <AccountBalanceWalletOutlinedIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleAddRedundMenuOpen}
              color="inherit"
            >
              <AddRoundedIcon size="large" />
            </IconButton>
          </Box>

          <Link href="/#/" variant="body2">
            <img src={payWiseLogo} alt="PayWise Logo" style={{ height: 50 }} />
          </Link>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" variant="permanent" open={open}>
        <DrawerHeader onClick={handleDrawerClose}>
          <IconButton>
            {theme.direction === "ltr" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["בית", "פרופיל", "הארנק שלי"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  direction: "ltr",
                  "& .MuiListItemIcon-root": {
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  },
                  "& .MuiListItemText-root": {
                    textAlign: "right",
                    opacity: open ? 1 : 0,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 ? (
                    <Link href="/#/" color="#1C74BC">
                      <HomeIcon />
                    </Link>
                  ) : (
                    ""
                  )}
                  {index === 1 ? (
                    <Link href="/#/profile" color="#1C74BC">
                      <Person2Icon />
                    </Link>
                  ) : (
                    ""
                  )}
                  {index === 2 ? (
                    <Link href="/#/wallet" color="#1C74BC">
                      <Badge
                        badgeContent={
                          vouchers.filter(
                            (voucher) => voucher.fields.redeemed === false && currentDate < new Date(voucher.fields.dateOfExpiry)
                          ).length 
                        }
                        color="error"
                      >
                        <AccountBalanceWalletIcon />
                      </Badge>
                    </Link>
                  ) : (
                    ""
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {renderAddRefundMenu}
      {openScan ? <Redirect to="/ScanVoucher" /> : ""}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
