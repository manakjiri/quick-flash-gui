"use client";

import { Box, Button, Container } from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import StorageTable from "@/components/StorageTable";
import { StorageTableRow } from "@/components/StorageTable";
import HorizontalLinearStepper from "@/components/Stepper";
import Link from "next/link";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

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
  const [activeStep, setActiveStep] = React.useState(0);
  const [rows, setRows] = useState<StorageTableRow[]>([
    {
      id: 0,
      name: "quick-flash",
      date: "1.1.1999",
      connectionStatus: "ONLINE",
    },
    {
      id: 1,
      name: "fake_storage",
      date: "25.11.2023",
      connectionStatus: "OFFLINE",
    },
  ]);
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const handleContinueClick = async () => {
    try {
      await invoke("set_progress", { progress: 25 });
      setActiveStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };


  const handleEditDisabledChange = (newState: boolean) => {
    setIsEditDisabled(newState);
  };

  const handleStart = () => {
    console.log("Starting something");
    invoke<StorageCredentials[]>("get_all_storage_credentials").then((res) => {
      setRows(
        res.map<StorageTableRow>((value, index) => {
          return {
            id: index,
            name: value.user_storage_name,
            date: new Date(value.timestamp * 1000).toLocaleString(),
            connectionStatus: "Connected",
          };
        }),
      );
    });
  };

  return (
    <main>
      <Container maxWidth="xl">
        <Box sx={{ ml: 8, mr: 8 }}>
          <Box sx={{ mt: 5 }}>
            <HorizontalLinearStepper activeStep={activeStep} />
          </Box>
          <Box sx={{ mt: 4 }}>
            <StorageTable rows={rows} onEditDisabledChange={handleEditDisabledChange} />
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
            <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
              <Link
                href="/flash/firmware"
                passHref
                style={{ pointerEvents: isEditDisabled ? "none" : "auto" }}
              >
                <Button
                  variant="contained"
                  sx={{ mt: 4 }}
                  disabled={isEditDisabled}
                  endIcon={<ArrowRightIcon />}
                  onClick={handleContinueClick}
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
