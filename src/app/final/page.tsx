"use client";


import AddStorageDialog from "@/components/AddStorageDialog";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import DonutChart from "@/components/DonutChart";
import EditStorageDialog from "@/components/EditStorageDialog";
import HorizontalLinearStepper from "@/components/Stepper";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";


export default function Home() {
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };



    return (
        <>
        <Box sx={{ mt: 1 }}>
            <HorizontalLinearStepper activeStep={4} />
        </Box>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh'
        }}>
            <DonutChart />
        </div>

        {/*TEST REMOVE LATER*/}
        <Button variant="contained" sx={{ mt: 4 }} onClick={handleClickOpen}>
            Open EditStorage
        </Button>
        <EditStorageDialog handleClose={handleClose} open={openDialog}></EditStorageDialog>
        {/*TEST REMOVE LATER*/}
        </>

    );
}
