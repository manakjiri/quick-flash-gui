import React from "react";
import { BootstrapDialog, BootstrapDialogTitle } from "./shared";
import { Box, Button, DialogActions, DialogContent, TextField, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export interface ObtainingXMLDialogProps {
  handleClose: () => void;
  open: boolean;
  handleAdd: () => void;
}

export default function AddStorageDialog(props: ObtainingXMLDialogProps) {
  const { handleClose, open, handleAdd, ...other } = props;

  const handleAddInternal = () => {
    handleAdd();
    handleClose();
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      open={open}
      aria-labelledby="customized-dialog-title"
      style={{
        minWidth: 400,
      }}
    >
      <BootstrapDialogTitle id={"customized-dialog-title"} onClose={handleClose}>
        <Typography variant="h5" color="primary">
          Add storage{" "}
        </Typography>
      </BootstrapDialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} width={400} mt={2}>
          <TextField id="outlined-basic" label="Storage name(optional)" variant="outlined" />
          <TextField id="outlined-basic" label="Bucket name" variant="outlined" />
          <TextField id="outlined-basic" label="Account ID" variant="outlined" />
          <TextField id="outlined-basic" label="Bucket ID" variant="outlined" />
          <TextField id="outlined-basic" label="Bucket Secret Key" variant="outlined" />
        </Box>
      </DialogContent>
      <DialogActions
        style={{
          justifyContent: "space-between",
          padding: "16px 24px",
        }}
      >
        <Button onClick={handleClose} variant="outlined" color="error" endIcon={<CancelIcon />}>
          Cancel
        </Button>
        <Button
          onClick={handleAddInternal}
          variant="contained"
          color="primary"
          startIcon={<CheckCircleIcon />}
        >
          Save
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
