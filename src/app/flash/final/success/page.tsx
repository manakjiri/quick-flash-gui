import React from 'react'
import SuccessMessage from '@/components/SuccessMessage'
import { Box } from '@mui/system'
import HorizontalLinearStepper from '@/components/Stepper'

export default function Home() {
  return (
    <>
    <Box sx={{ mt: 1 }}>
    <HorizontalLinearStepper activeStep={4} />
    </Box>
    <SuccessMessage></SuccessMessage>
    </>

  )
}
