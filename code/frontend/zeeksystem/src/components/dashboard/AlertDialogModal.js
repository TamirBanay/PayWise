import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Typography from "@mui/joy/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AlertDialogModal(props) {
  const [open, setOpen] = React.useState(props.isOpen);

  const handleCancel = () => {
    props.setOpenDeleteAlert(!props.openDeleteAlert);
    setOpen(false);
  };
  return (
    <React.Fragment>
      {props.icon == 1 ? (
        <DeleteIcon onClick={() => setOpen(true)} sx={{ marginLeft: 1 }} />
      ) : props.icon == 2 ? (
        <LogoutIcon onClick={() => setOpen(true)} sx={{ marginLeft: 1 }} />
      ) : (
        ""
      )}

      <Modal open={open} onClose={handleCancel} sx={{ direction: "rtl" }}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography
            id="alert-dialog-modal-title"
            component="h2"
            startDecorator={<WarningRoundedIcon />}
          >
            {props.title}
          </Typography>
          <Divider />
          <Typography
            id="alert-dialog-modal-description"
            textColor="text.tertiary"
          >
            {props.mainText}
          </Typography>
          <Box
            sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 2 }}
          >
            <Button variant="plain" color="neutral" onClick={handleCancel}>
              ביטול
            </Button>
            <Button variant="solid" color="danger" onClick={props.function}>
              {props.textButton}
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
