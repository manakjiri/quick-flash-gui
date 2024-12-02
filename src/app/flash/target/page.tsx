"use client";

import { Box, Button, Container } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import TargetTable from "@/components/TargetTable";
import { TargetTableRow } from "@/components/TargetTable";
import HorizontalLinearStepper from "@/components/Stepper";
import Link from "next/link";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function Home() {
  const [activeStep, setActiveStep] = React.useState(3);
  const [rows, setRows] = useState<TargetTableRow[]>([
    {
      id: 0,
      name: "MainProbe",
      date: "5.11.2024 6:55",
      manufacturer: "raspberry",
      lastUsed: "21.10.2024",
      connectedSince: "5.11.2024 6:55",
      firstConnection: "5.11.2024 6:55",
      serialNumber: "123456",
      vendorId: "0x1234",
    },
    {
      id: 1,
      name: "FakeProbe",
      date: "1.1.1999 0:00",
      manufacturer: "linx",
      lastUsed: "20.3.2021",
      connectedSince: "1.1.1999 0:00",
      firstConnection: "1.1.1999 0:00",
      serialNumber: "654321",
      vendorId: "XXXXXX",
    },
  ]);

  const [isEditDisabled, setIsEditDisabled] = useState(true);

  const handleEditDisabledChange = (newState: boolean) => {
    setIsEditDisabled(newState);
  };

  const handleEdit = (data: TargetTableRow) => {
    const selectedId = data.id;

    setRows((prevRows) =>
      prevRows.map((row) => (row.id === selectedId ? { ...row, ...data } : row)),
    );

    // Provide feedback to the user
    const editedRow = rows.find((row) => row.id === selectedId);
    if (editedRow) {
      // Show a toast message
    }

    console.log(`Probe with ID ${selectedId} updated with:`, data);

    setIsEditDisabled(true); // Optionally disable further actions
  };

  return (
    <main>
      <Container maxWidth="xl">
        <Box sx={{ ml: 8, mr: 8 }}>
          <Box sx={{ mt: 5 }}>
            <HorizontalLinearStepper activeStep={activeStep} />
          </Box>
          <Box sx={{ mt: 4 }}>
            <TargetTable
              rows={rows}
              onEditDisabledChange={handleEditDisabledChange}
              handleEdit={handleEdit}
            />
          </Box>
          {
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              gap={1}
            >
              <Link href="/flash/version" passHref>
                <Button variant="outlined" sx={{ mt: 4 }} startIcon={<ArrowLeftIcon />}>
                  Back
                </Button>
              </Link>
              <Link
                href="/flash/final"
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
