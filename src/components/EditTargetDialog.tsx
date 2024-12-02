import * as React from "react";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { Box, Button, DialogActions, Stack, TextField } from "@mui/material";
import { BootstrapDialog, BootstrapDialogTitle } from "./shared";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { TargetTableRow } from "./TargetTable";

export interface ObtainingXMLDialogProps {
  handleClose: () => void;
  open: boolean;
  handleEdit: (data: TargetTableRow) => void;
  data: TargetTableRow;
}

export default function EditTargetDialog(props: ObtainingXMLDialogProps) {
  const { handleClose, open, handleEdit, data } = props;

  // State for the input fields
  const [targetName, setTargetName] = React.useState(data.name || "");

  React.useEffect(() => {
    setTargetName(data.name || "");
  }, [data]);

  const handleSave = () => {
    const updatedData = {
      ...data,
      name: targetName,
    };
    console.log(updatedData);
    handleEdit(updatedData); // Pass updated data to the parent component
    handleClose(); // Close the dialog
  };

  return (
    <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Typography variant="h5" color="primary">
          Edit Target
        </Typography>
      </BootstrapDialogTitle>
      <DialogContent>
        <Box width={400} mt={2}>
          <TextField
            id="target-name"
            label="Target's name"
            variant="outlined"
            fullWidth
            value={targetName}
            onChange={(e) => setTargetName(e.target.value)} // Update state on input change
          />
          <Stack direction="row" spacing={2} alignItems="center" mt={2}>
            <Box width="45%">
              <Typography variant="subtitle2" color="primary">
                Manufacturer
              </Typography>
            </Box>
            <Box width="55%">
              <Typography variant="body2" color="primary">
                {data.manufacturer}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center" mt={2}>
            <Box width="45%">
              <Typography variant="subtitle2" color="primary">
                Vendor ID
              </Typography>
            </Box>
            <Box width="55%">
              <Typography variant="body2" color="primary">
                {data.vendorId}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center" mt={2}>
            <Box width="45%">
              <Typography variant="subtitle2" color="primary">
                Serial number
              </Typography>
            </Box>
            <Box width="55%">
              <Typography variant="body2" color="primary">
                {data.serialNumber}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" mt={2}>
            <Box width="45%">
              <Typography variant="subtitle2" color="primary">
                First time connection
              </Typography>
            </Box>
            <Box width="55%">
              <Typography variant="body2" color="primary">
                {data.firstConnection}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" mt={2}>
            <Box width="45%">
              <Typography variant="subtitle2" color="primary">
                Connected since
              </Typography>
            </Box>
            <Box width="55%">
              <Typography variant="body2" color="primary">
                {data.connectedSince}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" mt={2}>
            <Box width="45%">
              <Typography variant="subtitle2" color="primary">
                Last used
              </Typography>
            </Box>
            <Box width="55%">
              <Typography variant="body2" color="primary">
                {data.lastUsed}
              </Typography>
            </Box>
          </Stack>
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
          onClick={handleSave}
          variant="contained"
          color="primary"
          endIcon={<CheckCircleIcon />}
        >
          Save
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
