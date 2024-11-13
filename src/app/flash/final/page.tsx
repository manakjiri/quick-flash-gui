"use client";

import DonutChart from "@/components/DonutChart";
import HorizontalLinearStepper from "@/components/Stepper";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  setTimeout(() => {
    router.push("/flash/final/success");
  }, 1000);

  return (
    <>
      <Box sx={{ mt: 1 }}>
        <HorizontalLinearStepper activeStep={4} />
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <DonutChart />
      </div>
    </>
  );
}
