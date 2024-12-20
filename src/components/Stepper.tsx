"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useRouter } from "next/navigation";

export default function HorizontalLinearStepper({ activeStep }: { activeStep: number }) {
  const steps = ["Storage", "Firmware", "Version", "Target"];
  const router = useRouter();

  // Define paths for each step
  const stepPaths = ["/storage", "/firmware", "/version", "/target"];

  // Handler for step clicks
  const handleStepClick = (index: number) => {
    if (index <= activeStep) {
      // If clicked step is before or at the current active step, navigate to it
      router.push("/flash" + stepPaths[index]);
    } else {
      // If clicked step is after the current active step, do nothing (or handle as needed)
      console.log("Cannot navigate to future steps");
    }
  };

  return (
    <Box sx={{ p: 3, boxShadow: 1 }}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel
                  {...labelProps}
                  onClick={() => handleStepClick(index)} // Add click handler
                  sx={{ cursor: "pointer" }} // Add cursor style for better UX
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    </Box>
  );
}
