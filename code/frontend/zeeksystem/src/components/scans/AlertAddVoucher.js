import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { useRecoilState } from "recoil";
import { _addVoucherSucceeded } from "../../services/atom";
import Alert from "@mui/material/Alert";

export default function CustomizedSnackbars(props) {
  const [open, setOpen] = React.useState(true);
  const [transition, setTransition] = React.useState(undefined);
  const [addVoucherSucceeded, setAddVoucherSucceeded] =
    useRecoilState(_addVoucherSucceeded);

  const handleClose = () => {
    setOpen(false);
    setAddVoucherSucceeded(!addVoucherSucceeded);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          sx={{ width: "100%" }}
          icon={false}
          variant="filled"
          severity="success"
        >
          השובר נוסף בהצלחה
        </Alert>
      </Snackbar>
    </div>
  );
}
