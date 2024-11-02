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
import { StorageTableRow } from "@/components/StorageTable";
import EditTargetDialog from "@/components/EditTargetDialog";
import HorizontalLinearStepper from "@/components/Stepper";

import { invoke } from '@tauri-apps/api/core';

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
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [rows, setRows] = useState<StorageTableRow[]>([]);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  
  const handleStart = () => {
    console.log("Starting something");
    invoke<StorageCredentials[]>('get_all_storage_credentials').then((res) => {
      setRows(res.map<StorageTableRow>((value, index) => {
        return {
          id: index,
          name: value.user_storage_name,
          date: new Date(value.timestamp).toLocaleString(),
          connectionStatus: "Connected",
        };
      }));
    });
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
