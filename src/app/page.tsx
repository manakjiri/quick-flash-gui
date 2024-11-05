"use client";

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import { Alert, Box, Button, Container, Link, Snackbar } from "@mui/material";
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

export default function Home() {
  const [loading, setLoading] = useState(false);

  const rows: any[] = [{ id: "1" }];
  const handleStart = () => {
    console.log("Starting something");
  };
  return (
    <main>
      <Container maxWidth="xl">
        <Typography
            variant="h4"
            sx={{ mt: 4, mb: 4, textAlign: "center" }}  
            >
            Welcome to quick-flash!
        </Typography>
        <Typography>1.Quick-flash needs access to storage hosting the firmware binaries, set it up according to the <a>tutorial</a> first.</Typography>
        <Typography>2.Once setup, come back here and navigate to Flash -> Storage, where you can add it.</Typography>
        <Typography>3.Now you should be able to browse the storage you just added (Hint: you can double-click instead of clicking Continue).</Typography>
        <Typography>4.Connect your target and flash it!</Typography>
      </Container>
    </main>
  );
}
