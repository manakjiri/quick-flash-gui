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
import ToastManager from "@/components/ToastManager";

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

  const toastManagerRef = React.useRef<{ showToast: Function }>(null);

  const handleUndoAction = () => {
    //TODO: Revert the change associated with the toast
    console.log("Undo action triggered.")
  };

  const handleDeleteAction = () => {
    //TODO: handle delete logic here

    toastManagerRef.current?.showToast({
      type: "warning",
      message: "Deleted a storage!",
      duration: 7000,
      action: {
        label: "Undo",
        onClick: () => handleUndoAction,
      },
      onAutoClose: () => {
        console.log('Toast duration ended! Performing auto-close action...');
      },
    });
  }
  const handleEditAction = () => {

  }

  return (
    <main>
      <Container maxWidth="xl">
        <Box sx={{ ml: 8, mr: 8 }}>
          <Box sx={{ mt: 5 }}>
            <HorizontalLinearStepper activeStep={activeStep} />
          </Box>
          <Box sx={{ mt: 4 }}>
            <StorageTable
             rows={rows}
             onEditDisabledChange={handleEditDisabledChange}
             handleClose={() => {}} 
             open={false}
             handleEdit={handleEditAction}
             handleDelete={handleDeleteAction}/>
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
                >
                  Continue
                </Button>
              </Link>
            </Box>
          }
          <Box></Box>
        </Box>
        <ToastManager ref={toastManagerRef} />
      </Container>
    </main>
  );
}
