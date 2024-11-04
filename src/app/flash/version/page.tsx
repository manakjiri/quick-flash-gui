"use client";

import {Box, Button, Container} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import VersionTable from "@/components/VersionTable";
import { VersionTableRow } from "@/components/VersionTable";
import HorizontalLinearStepper from "@/components/Stepper";
import Link from "next/link";

//import { invoke } from '@tauri-apps/api/core';


export default function Home() {
  const [activeStep, setActiveStep] = React.useState(2);
  const [rows, setRows] = useState<VersionTableRow[]>([
    { id: 0, name: "68b468c846 ", date: "19.9.2021", chipName: "fintel"},
    { id: 1, name: "24", date: "19.9.2021", chipName: "fintel" },
    { id: 2, name: "21", date: "18.6.2021", chipName: "fintel"},
    { id: 3, name: "20", date: "17.6.2021", chipName: "fintel"},
    { id: 4, name: "18", date: "15.6.2021", chipName: "fintel"},
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
            <VersionTable rows={rows}
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
                href="/flash/firmware"
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
                href="/flash/target"
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
