"use client";

import { Box, Button, Container } from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { useState, useRef } from "react";
import StorageTable from "@/components/StorageTable";
import { StorageTableRow } from "@/components/StorageTable";
import HorizontalLinearStepper from "@/components/Stepper";
import Link from "next/link";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ToastManager from "@/components/ToastManager";

import { invoke } from "@tauri-apps/api/core";
import { GridRowParams } from "@mui/x-data-grid";

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
  const selectedStorage = useRef<GridRowParams | null>(null);

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
  const [hideRows, setHideRows] = useState<number[]>([]);

  const toggleRowVisibility = (id: number) => {
    setHideRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  // Filter rows based on `hideRows` state
  const filteredRows = rows.filter((row) => !hideRows.includes(row.id));

  const [isEditDisabled, setIsEditDisabled] = useState(true);

  const handleEditDisabledChange = (newState: boolean, newRow: GridRowParams) => {
    sessionStorage.setItem("selectedStorage", newRow.row.name);
    setIsEditDisabled(newState);
    selectedStorage.current = newRow;
  };

  const handleStart = () => {
    console.log("Starting something");
  /*  invoke<StorageCredentials[]>("get_all_storage_credentials").then((res) => {
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
    });*/
  };

  const toastManagerRef = React.useRef<{ showToast: Function }>(null);

  const handleUndoAction = () => {
    if (!selectedStorage.current) {
      console.error("No storage selected for Undo");
      return;
    }
    const curr_id = selectedStorage.current.row.id;
    toggleRowVisibility(curr_id);
    sessionStorage.removeItem("storageToDelete"); // Clean up
    setIsEditDisabled(false);
    console.log("Undo action triggered.");
  };

  const handleDeleteAction = () => {
    if (!selectedStorage.current) {
      console.error("No storage selected for deletion");
      return;
    }
    const s_Name = selectedStorage.current.row.name;
    // Toggle visibility using the latest selected_storage
    toggleRowVisibility(selectedStorage.current.row.id);
    sessionStorage.setItem("storageToDelete", s_Name);
    setIsEditDisabled(true);
    // Show toast notification with undo action
    toastManagerRef.current?.showToast({
      type: "warning",
      message: `Deleted ${s_Name}!`,
      duration: 7000,
      action: {
        label: "Undo",
        onClick: handleUndoAction,
      },
      onAutoClose: () => {
        console.log("Toast duration ended! Performing auto-close action...");
        invoke<StorageCredentials[]>("remove_storage_credentials", {
          user_storage_name: s_Name,
        });
        selectedStorage.current = null;
      },
    });
  }; 

  const handleEditAction = () => {};


 /* useEffect(() => {
    const handleBeforeUnload = () => {
      console.log("Page is about to be refreshed or closed");
      // Perform any necessary cleanup or save data here
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);*/

  return (
    <main>
      <Container maxWidth="xl">
        <Box sx={{ ml: 8, mr: 8 }}>
          <Box sx={{ mt: 5 }}>
            <HorizontalLinearStepper activeStep={activeStep} />
          </Box>
          <Box sx={{ mt: 4 }}>
            <StorageTable
              rows={filteredRows}
              onEditDisabledChange={handleEditDisabledChange}
              isEditDisabled={isEditDisabled}
              handleClose={() => {}}
              open={false}
              handleEdit={handleEditAction}
              handleDelete={handleDeleteAction}
            />
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
