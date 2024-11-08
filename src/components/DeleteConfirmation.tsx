import React from 'react'
import { BootstrapDialog, BootstrapDialogTitle } from './shared';
import { Button, DialogActions, DialogContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { red } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export interface ObtainingXMLDialogProps {
    handleClose: () => void;
    open: boolean;
    handleConfirm: () => void;
}
export default function DeleteConfirmation(props: ObtainingXMLDialogProps) {
    const { handleClose, open, handleConfirm, ...other } = props;

    const handleConfirmInternal = () => {
        handleConfirm();
        handleClose();
    }

    return (
        <BootstrapDialog
            onClose={handleClose}
            open={open}
            aria-labelledby="customized-dialog-title"
            style={{
                minWidth: 400,

            }}>
            <BootstrapDialogTitle id={''} onClose={handleClose}>
                <Typography variant='h6' color='primary'>Sure you want to delete this storage?</Typography>
            </BootstrapDialogTitle>
            <DialogContent
                style={{
                    textAlign: 'center',  // Center-align content
                }}>
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    width={400}

                >
                    <Typography>This action cannot be undone!</Typography>
                </Box>
            </DialogContent>
            <DialogActions
                style={{
                    justifyContent: 'space-between',
                    padding: '16px 24px',
                }}
            >
                <Button onClick={handleClose} variant="outlined" color="error" endIcon={<CancelIcon />}>
                    No, cancel
                </Button>

                <DeleteConfirmation handleClose={() => { }} open={false} handleConfirm={() => { }}></DeleteConfirmation>
                <Button
                    onClick={handleConfirmInternal}
                    variant="contained"
                    sx={{
                        color: 'white',
                    }}
                    endIcon={<CheckCircleIcon />}
                >
                    <Typography>Yes, confirm</Typography>
                </Button>

            </DialogActions>
        </BootstrapDialog>
    )
}


