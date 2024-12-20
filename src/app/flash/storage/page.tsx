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
      bucketName: "quick-flash",
      accountId: "749782798",
      bucketId: "quick-flash",
      bucketSecretKey: "JSkjlssjo53IHjhkjfh",
    },
    {
      id: 1,
      name: "fake_storage",
      date: "25.11.2023",
      connectionStatus: "OFFLINE",
      bucketName: "fake-storage",
      accountId: "749782798",
      bucketId: "quick-flash",
      bucketSecretKey: "JSkjlssjo53IHjhkjfh",
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
    sessionStorage?.setItem("selectedStorage", newRow.row.name);
    setIsEditDisabled(newState);
    selectedStorage.current = newRow;
  };

  const handleStart = () => {
    console.log("Starting something");
  };

  const toastManagerRef = React.useRef<{ showToast: Function }>(null);

  const handleUndoAction = () => {
    if (!selectedStorage.current) {
      console.error("No storage selected for Undo");
      return;
    }
    const curr_id = selectedStorage.current.row.id;
    toggleRowVisibility(curr_id);
    sessionStorage?.removeItem("storageToDelete"); // Clean up
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
    sessionStorage?.setItem("storageToDelete", s_Name);
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

  const handleEditAction = (updatedFields: Partial<StorageTableRow>) => {
    if (!selectedStorage.current) {
      console.error("No storage selected for editing");
      return;
    }

    const selectedId = selectedStorage.current.row.id;

    if (!updatedFields) {
      console.error("No updated fields provided for save action");
      return;
    }

    // Update the rows state with the edited data
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === selectedId ? { ...row, ...updatedFields } : row)),
    );

    // Provide feedback to the user
    const editedRow = rows.find((row) => row.id === selectedId);
    if (editedRow) {
      toastManagerRef.current?.showToast({
        type: "success",
        message: `Successfully updated ${editedRow.name}!`,
        duration: 5000,
      });
    }

    console.log(`Storage with ID ${selectedId} updated with:`, updatedFields);

    // Clear the selection
    selectedStorage.current = null;
    setIsEditDisabled(true); // Optionally disable further actions
  };

  const handleAddAction = (data: StorageTableRow) => {
    setRows([...rows, { ...data, id: rows.length }]);

    toastManagerRef.current?.showToast({
      type: "success",
      message: `Successfully added ${data.name}!`,
      duration: 5000,
    });

    console.log(`Storage with ID ${data.id} created with:`, data);

    // Clear the selection
    selectedStorage.current = null;
    setIsEditDisabled(true);
  };

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
              handleAdd={handleAddAction}
              handleClose={() => { }}
              open={false}
              handleEdit={handleEditAction}
              handleDelete={handleDeleteAction}
              data={selectedStorage.current?.row}
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
