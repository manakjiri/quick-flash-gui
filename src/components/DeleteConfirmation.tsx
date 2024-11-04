import React from 'react'
import { BootstrapDialog, BootstrapDialogTitle } from './shared';
import { Button, DialogActions, DialogContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { red } from '@mui/material/colors';

export interface ObtainingXMLDialogProps {
    handleClose: () => void;
    open: boolean;
}
export default function DeleteConfirmation(props: ObtainingXMLDialogProps)  {
    const { handleClose, open, ...other } = props;
    return (
        <BootstrapDialog 
        onClose={handleClose}
        open= {open}
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
                <Button onClick ={() => {/*handle Cancel action*/}} variant="outlined" color="primary">
                <Typography style={{
                        color: "primary"
                    }}>No, cancel</Typography>
                </Button>
                
                <DeleteConfirmation handleClose={function (): void {
                    throw new Error('Function not implemented.');
                } } open={false}></DeleteConfirmation>
                <Button 
                    onClick={() => {/* handle Confirm action */}} 
                    variant="contained"
                    sx={{
                        backgroundColor: 'red', 
                        '&:hover': {
                        backgroundColor: '#b71c1c', // Darker shade on hover
                        },
                        color: 'white',
                    }}
                    >
                    <Typography>Yes, confirm</Typography>
                </Button>

            </DialogActions>
        </BootstrapDialog>
    )
}


