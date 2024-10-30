"use client";

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import NextLink from "next/link";
const inter = Inter({ subsets: ["latin"] });

import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import { join } from "path";
import { useState } from "react";
import StorageTable from "@/components/StorageTable";
import EditTargetDialog from "@/components/EditTargetDialog";
import HorizontalLinearStepper from "@/components/Stepper";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  const rows: any[] = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
  const handleStart = () => {
    console.log("Starting something");
  };
  return (
    <main>
      <Container maxWidth="xl">
        <Box sx={{ ml: 8, mr: 8 }}>
          <Typography variant="h5" sx={{ mt: 5 }}>
            {" "}
            First page title {" "}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <HorizontalLinearStepper activeStep={activeStep} />
          </Box>
          <Box sx={{ mt: 4 }}>
            <StorageTable rows={rows} />
          </Box>
          <Button
            variant="contained"
            sx={{ mt: 4 }}
            disabled={loading}
            onClick={handleStart}
          >
            Start something
          </Button>
          <Box></Box>
          <Button variant="contained" sx={{ mt: 4 }} onClick={handleClickOpen}>
            Open Dialog
          </Button>
        </Box>
        <EditTargetDialog handleClose={handleClose} open={openDialog} />
      </Container>
    </main>
  );
}
