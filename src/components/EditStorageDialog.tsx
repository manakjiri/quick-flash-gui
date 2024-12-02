import React, { useState } from "react";
import { BootstrapDialog, BootstrapDialogTitle } from "./shared";
import { Box, Button, DialogActions, DialogContent, TextField, Typography } from "@mui/material";
import DeleteConfirmation from "./DeleteConfirmation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { StorageTableRow } from "./StorageTable";

export interface ObtainingXMLDialogProps {
  handleClose: () => void;
  open: boolean;
  handleEdit: (updatedData: StorageTableRow) => void;
  handleDelete: () => void;
  data: StorageTableRow;
}

export default function EditStorageDialog(props: ObtainingXMLDialogProps) {
  const { handleClose, open, handleEdit, handleDelete, data } = props;
  const [delConfOpen, setDelConfOpen] = useState(false);

  // State for form inputs
  const [storageName, setStorageName] = useState(data.name || "");
  const [bucketName, setBucketName] = useState(data.bucketName || "");
  const [accountId, setAccountId] = useState(data.accountId || "");
  const [bucketId, setBucketId] = useState(data.bucketId || "");
  const [bucketSecretKey, setBucketSecretKey] = useState(data.bucketSecretKey || "");

  const handleOpenDialog = () => {
    setDelConfOpen(true);
  };

  const handleCloseDialog = () => {
    setDelConfOpen(false);
  };

  const handleEditInternal = () => {
    const updatedData: StorageTableRow = {
      ...data,
      name: storageName,
      bucketName,
      accountId,
      bucketId,
      bucketSecretKey,
    };
    handleEdit(updatedData); // Pass the updated data to the parent
    handleClose(); // Close the dialog
  };

  const handleDeleteInternal = () => {
    handleDelete(); // Call the delete handler
    handleClose(); // Close the dialog
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
          Edit Storage
        </Typography>
      </BootstrapDialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} width={400} mt={2}>
          <TextField
            id="storage-name"
            label="Storage name (optional)"
            variant="outlined"
            value={storageName}
            onChange={(e) => setStorageName(e.target.value)}
          />
          <TextField
            id="bucket-name"
            label="Bucket name"
            variant="outlined"
            value={bucketName}
            onChange={(e) => setBucketName(e.target.value)}
          />
          <TextField
            id="account-id"
            label="Account ID"
            variant="outlined"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />
          <TextField
            id="bucket-id"
            label="Bucket ID"
            variant="outlined"
            value={bucketId}
            onChange={(e) => setBucketId(e.target.value)}
          />
          <TextField
            id="bucket-secret-key"
            label="Bucket Secret Key"
            variant="outlined"
            value={bucketSecretKey}
            onChange={(e) => setBucketSecretKey(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions
        style={{
          justifyContent: "space-between",
          padding: "16px 24px",
        }}
      >
        <Button onClick={handleClose} variant="outlined" color="primary" endIcon={<CancelIcon />}>
          Cancel
        </Button>
        <Button
          onClick={handleOpenDialog}
          variant="outlined"
          color="error"
          endIcon={<DeleteIcon />}
        >
          <Typography
            style={{
              color: "red",
            }}
          >
            Delete Storage
          </Typography>
        </Button>
        <DeleteConfirmation
          handleClose={handleCloseDialog}
          open={delConfOpen}
          handleConfirm={handleDeleteInternal}
        />
        <Button
          onClick={handleEditInternal}
          variant="contained"
          color="primary"
          endIcon={<CheckCircleIcon />}
        >
          <Typography>Save</Typography>
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
