"use client";

import {Box, Button, Container} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import TargetTable from "@/components/TargetTable";
import { TargetTableRow } from "@/components/TargetTable";
import HorizontalLinearStepper from "@/components/Stepper";
import Link from "next/link";

import { invoke } from '@tauri-apps/api/core';


export default function Home() {
  const [activeStep, setActiveStep] = React.useState(3);
  const [rows, setRows] = useState<TargetTableRow[]>([
    { id: 0, name: "MainProbe", date: "5.11.2024 6:55", manufacturer: "raspberry", lastUsed: "21.10.2024" },
    { id: 1, name: "FakeProbe", date: "1.1.1999 0:00", manufacturer: "linx", lastUsed: "20.3.2021" },
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
            <TargetTable rows={rows}
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
                href="/flash/version"
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
                href="/final"
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
