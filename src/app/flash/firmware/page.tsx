"use client";

import {Box, Button, Container} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import FirmwareTable from "@/components/FirmwareTable";
import { FirmwareTableRow } from "@/components/FirmwareTable";
import HorizontalLinearStepper from "@/components/Stepper";
import Link from "next/link";

import { invoke } from '@tauri-apps/api/core';

export default function Home() {
  const [activeStep, setActiveStep] = React.useState(1);
  const [rows, setRows] = useState<FirmwareTableRow[]>([
    { id: 0, name: "blink", date: "18.3.2021" },
    { id: 1, name: "fizzbuzz", date: "10.2.2021" },
    { id: 1, name: "control", date: "1.1.2020" },
  ]);
  
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
            <FirmwareTable rows={rows}
              onEditDisabledChange={handleEditDisabledChange} />
          </Box>
          {/* <Button
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
              <Link
                href="/flash/storage"
                passHref
              >
                <Button
                  variant="outlined"
                  sx={{ mt: 4 }}
                >
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
                >
                  Continue
                </Button>
              </Link>
            </Box>}
          <Box></Box>
        </Box>
      </Container>
    </main>
  );
}
