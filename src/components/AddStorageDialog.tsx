import React, { useState } from "react";
import { BootstrapDialog, BootstrapDialogTitle } from "./shared";
import { Box, Button, DialogActions, DialogContent, TextField, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { StorageTableRow } from "./StorageTable";

export interface ObtainingXMLDialogProps {
  handleClose: () => void;
  open: boolean;
  handleAdd: (data: StorageTableRow) => void;
}

export default function AddStorageDialog(props: ObtainingXMLDialogProps) {
  const { handleClose, open, handleAdd } = props;

  // State for form inputs
  const [storageName, setStorageName] = useState("");
  const [bucketName, setBucketName] = useState("");
  const [accountId, setAccountId] = useState("");
  const [bucketId, setBucketId] = useState("");
  const [bucketSecretKey, setBucketSecretKey] = useState("");

  const handleAddInternal = () => {
    const newStorage: StorageTableRow = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      connectionStatus: "ONLINE",
      name: storageName,
      bucketName,
      accountId,
      bucketId,
      bucketSecretKey,
    };
    console.log(newStorage);
    handleAdd(newStorage); // Pass new storage data to parent
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
          Add Storage
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
