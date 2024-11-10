import React, { useState } from 'react'
import { BootstrapDialog, BootstrapDialogTitle } from './shared';
import { Box, Button, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import DeleteConfirmation from './DeleteConfirmation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';


export interface ObtainingXMLDialogProps {
    handleClose: () => void;
    open: boolean;
    handleEdit: () => void;
    handleDelete: () => void;
}


export default function EditStorageDialog(props: ObtainingXMLDialogProps) {
    const { handleClose, open, handleEdit, handleDelete, ...other } = props;
    const [delConfOpen, setDelConfOpen] = useState(false);

    const handleOpenDialog = () => {
        setDelConfOpen(true);
    }

    const handleCloseDialog = () => {
        setDelConfOpen(false);
    }

    const handleEditInternal = () => {
        handleEdit();
        handleClose();
    }

    const handleDeleteInternal = () => {
        handleDelete();
        handleClose();
    }

    return (
        <BootstrapDialog
            onClose={handleClose}
            open={open}
            aria-labelledby="customized-dialog-title"
            style={{
                minWidth: 400,

            }}
        >
            <BootstrapDialogTitle id={'customized-dialog-title'} onClose={handleClose}>
                <Typography variant='h5' color='primary'>Edit storage </Typography>
            </BootstrapDialogTitle>
            <DialogContent>
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    width={400}
                    mt={2}>
                    <TextField id="outlined-basic" label="Storage name(optional)"
                        variant="outlined" />
                    <TextField id="outlined-basic" label="Bucket name"
                        variant="outlined" />
                    <TextField id="outlined-basic" label="Account ID"
                        variant="outlined" />
                    <TextField id="outlined-basic" label="Bucket ID"
                        variant="outlined" />
                    <TextField id="outlined-basic" label="Bucket Secret Key"
                        variant="outlined" />
                </Box>
            </DialogContent>
            <DialogActions
                style={{
                    justifyContent: 'space-between',
                    padding: '16px 24px',
                }}
            >
                <Button onClick={handleClose} variant="outlined" color="primary" endIcon={<CancelIcon />}>
                    Cancel
                </Button>
                <Button onClick={handleOpenDialog} variant="outlined" color="error" endIcon={<DeleteIcon />}>
                    <Typography style={{
                        color: "red"
                    }}>Delete Storage</Typography>
                </Button>
                <DeleteConfirmation handleClose={handleCloseDialog} open={delConfOpen} handleConfirm={handleDeleteInternal}></DeleteConfirmation>
                <Button onClick={handleEditInternal} variant="contained" color="primary" endIcon={<CheckCircleIcon />}>
                    <Typography style={{
                        color: ""
                    }}>Save</Typography>
                </Button>
            </DialogActions>
        </BootstrapDialog>
    )
}

