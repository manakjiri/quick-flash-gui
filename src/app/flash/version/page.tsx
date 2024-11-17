"use client";

import { Box, Button, Container } from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import VersionTable from "@/components/VersionTable";
import { VersionTableRow } from "@/components/VersionTable";
import HorizontalLinearStepper from "@/components/Stepper";
import Link from "next/link";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

//import { invoke } from '@tauri-apps/api/core';

export default function Home() {
  const [activeStep, setActiveStep] = React.useState(2);
  const [rows, setRows] = useState<VersionTableRow[]>([
    { id: 0, name: "26 ", date: "19.9.2021", chipName: "fintel" },
    { id: 1, name: "24", date: "19.9.2021", chipName: "fintel" },
    { id: 2, name: "21", date: "18.6.2021", chipName: "fintel" },
    { id: 3, name: "20", date: "17.6.2021", chipName: "fintel" },
    { id: 4, name: "18", date: "15.6.2021", chipName: "fintel" },
  ]);
  //second mock table
  const [rows_B, setRows_B] = useState<VersionTableRow[]>([
    { id: 0, name: "6ef8 ", date: "13.10.2020", chipName: "raspberry" },
    { id: 1, name: "2b1a", date: "19.6.2020", chipName: "raspberry" },
    { id: 2, name: "ff68", date: "17.6.2020", chipName: "raspberry" },
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
            <VersionTable rows={(sessionStorage.getItem("selectedStorage") === "quick-flash")? rows : rows_B} onEditDisabledChange={handleEditDisabledChange} />
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
              <Link href="/flash/firmware" passHref>
                <Button variant="outlined" sx={{ mt: 4 }} startIcon={<ArrowLeftIcon />}>
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
