"use client"

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

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    console.log("Starting something");
  };
  return (
    <div>
      <p>NO</p>
      <>
        <Button
          variant="contained"
          sx={{ mt: 4 }}
          disabled={loading}
          onClick={handleStart}
        >
          Start something
        </Button>
      </>
    </div>
  );
}
