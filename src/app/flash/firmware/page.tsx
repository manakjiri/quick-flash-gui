"use client";

import { Box, Button, Container } from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import FirmwareTable from "@/components/FirmwareTable";
import { FirmwareTableRow } from "@/components/FirmwareTable";
import HorizontalLinearStepper from "@/components/Stepper";
import Link from "next/link";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

import { invoke } from "@tauri-apps/api/core";

interface StorageCredentials {
  user_storage_name: string;
  storage_type: string;
  storage_name: string;
  storage_account_id: string;
  storage_access_key: string;
  storage_secret_key: string;
  timestamp: number;
}

export default function Home() {
 

  const [activeStep, setActiveStep] = React.useState(1);
  const [rows, setRows] = useState<FirmwareTableRow[]>([
    { id: 0, name: "blink", date: "18.3.2021" },
    { id: 1, name: "fizzbuzz", date: "10.2.2021" },
    { id: 2, name: "control", date: "1.1.2020" },
  ]);
  //second mock table
  const [rows_B, setRows_B] = useState<FirmwareTableRow[]>([
    { id: 0, name: "calculator", date: "14.12.2020" },
    { id: 1, name: "donner", date: "11.1.2019" },
    { id: 2, name: "creation", date: "1.1.2019" },
    { id: 3, name: "Grrrreetings!", date: "1.12.2018" },
    { id: 4, name: "randomNumber", date: "21.11.2019" },
  ]);
  
  useEffect(() => {
    const storageName = sessionStorage.getItem("storageToDelete");
    if (storageName) {
      console.log("Performing action for saved storage:", storageName);
      invoke<StorageCredentials[]>("remove_storage_credentials", {
        user_storage_name: storageName,
      });
      sessionStorage.removeItem("storageToDelete"); // Clean up
    }      
  }, []);

  const [isEditDisabled, setIsEditDisabled] = useState(true);

  const handleEditDisabledChange = (newState: boolean) => {
    setIsEditDisabled(newState);
  };

  return (
    <main>
      <Container maxWidth="xl">
        <Box sx={{ ml: 8, mr: 8 }}>
          <Box sx={{ mt: 5 }}>
            <HorizontalLinearStepper activeStep={activeStep} />
          </Box>
          <Box sx={{ mt: 4 }}>
            <FirmwareTable rows={(sessionStorage.getItem("selectedStorage") === "quick-flash")? rows : rows_B} onEditDisabledChange={handleEditDisabledChange} />
          </Box>
          {
            /* <Button
            variant="contained"
            sx={{ mt: 4 }}
            disabled={loading}
            onClick={handleStart}
          >
            Start something
          </Button> */
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              gap={1}
            >
              <Link href="/flash/storage" passHref>
                <Button variant="outlined" sx={{ mt: 4 }} startIcon={<ArrowLeftIcon />}>
                  Back
                </Button>
              </Link>
              <Link
                href="/flash/version"
                passHref
                style={{ pointerEvents: isEditDisabled ? "none" : "auto" }}
              >
                <Button
                  variant="contained"
                  sx={{ mt: 4 }}
                  disabled={isEditDisabled}
                  endIcon={<ArrowRightIcon />}
                >
                  Continue
                </Button>
              </Link>
            </Box>
          }
          <Box></Box>
        </Box>
      </Container>
    </main>
  );
}
