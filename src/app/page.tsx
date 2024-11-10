"use client";

import {Container } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Home() {
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
        <Typography>2.Once setup, come back here and navigate to Flash &rarr; Storage, where you can add it.</Typography>
        <Typography>3.Now you should be able to browse the storage you just added (Hint: you can double-click instead of clicking Continue).</Typography>
        <Typography>4.Connect your target and flash it!</Typography>
      </Container>
    </main>
  );
}
