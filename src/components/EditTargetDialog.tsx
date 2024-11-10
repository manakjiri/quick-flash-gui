import * as React from 'react';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { Box, Button, DialogActions, Stack, TextField } from '@mui/material';
import { BootstrapDialog, BootstrapDialogTitle } from './shared';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


export interface ObtainingXMLDialogProps {
    handleClose: () => void;
    open: boolean;
}

export default function EditTargetDialog(props: ObtainingXMLDialogProps) {
    const { handleClose, open, ...other } = props;

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                <Typography variant="h5" color="primary"> Edit Target </Typography>
            </BootstrapDialogTitle>
            <DialogContent>
                <Box
                    width={400}
                    mt={2}>
                    <TextField id="outlined-basic" label="Target's name"
                        variant="outlined" fullWidth>
                    </TextField>
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        mt={2}>
                        <Box width="45%">
                            <Typography variant="subtitle2" color="primary">
                                Manufacture
                            </Typography>
                        </Box>
                        <Box width="55%">
                            <Typography variant="body2" color="primary">
                                Black magic
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        mt={2}>
                        <Box width="45%">
                            <Typography variant="subtitle2" color="primary">
                                Vendor ID
                            </Typography>
                        </Box>
                        <Box width="55%">
                            <Typography variant="body2" color="primary">
                                VID
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        mt={2}>
                        <Box width="45%">
                            <Typography variant="subtitle2" color="primary">
                                Serial number
                            </Typography>
                        </Box>
                        <Box width="55%">
                            <Typography variant="body2" color="primary">
                                Random serial number
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        mt={2}>
                        <Box width="45%">
                            <Typography variant="subtitle2" color="primary">
                                First time connection
                            </Typography>
                        </Box>
                        <Box width="55%">
                            <Typography variant="body2" color="primary">
                                10.10.2024 15:10
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        mt={2}>
                        <Box width="45%">
                            <Typography variant="subtitle2" color="primary">
                                Connected since
                            </Typography>
                        </Box>
                        <Box width="55%">
                            <Typography variant="body2" color="primary">
                                16.10.2024 13:13
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        mt={2}>
                        <Box width="45%">
                            <Typography variant="subtitle2" color="primary">
                                Last used
                            </Typography>
                        </Box>
                        <Box width="55%">
                            <Typography variant="body2" color="primary">
                                16.10.2024 13:23
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </DialogContent>
            <DialogActions
                style={{
                    justifyContent: 'space-between',
                    padding: '16px 24px',
                }}
            >
                <Button onClick={handleClose} variant="outlined" color="error" endIcon={<CancelIcon />}>
                    Cancel
                </Button>
                <Button onClick={() => { handleClose() }} variant="contained" color="primary" endIcon={<CheckCircleIcon />}>
                    Save
                </Button>
            </DialogActions>
        </BootstrapDialog >
    );
}