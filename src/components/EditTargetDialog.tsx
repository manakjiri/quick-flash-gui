import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { BootstrapDialog, BootstrapDialogTitle } from './shared';


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
                <Box>
                    <Typography variant="subtitle1" color="primary"> Some text </Typography>
                    <Typography variant="body2" color="primary">
                        And some more
                    </Typography>
                </Box>
            </DialogContent>
        </BootstrapDialog>
    );
}