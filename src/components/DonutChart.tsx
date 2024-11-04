"use client";

import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Button, Typography} from '@mui/material';
import { useTheme } from '@mui/material/styles'


function DonutChart() {
    const theme = useTheme(); // Access the theme
    const primaryColor = theme.palette.primary.main;


    return (
        <>
        <div style={{ position: 'relative', width: 600, height: 400 }}>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 99, color: primaryColor },
                  ],
                  innerRadius: 60,
                  endAngle: 359
                },
              ]}
              width={600}
              height={300}
            />
            <div
              style={{
                position: 'absolute',
                top: '38%',
                left: '42%',
                transform: 'translate(-50%, -50%)',
                fontSize: '32px',
                fontWeight: 'bold',
                color: primaryColor,
              }}
            >
              99%
            </div>
            <div
              style={{
                position: 'absolute',
                top: '88%',
                left: '43%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px', // Space between the text and button
                color: 'black',
              }}
            >
                <div style={{ fontSize: '24px', fontWeight: 'semibold' }}>
                <Typography textAlign="center" variant='h5'>Flashing...</Typography>
                </div>
                <Button variant="outlined" href='/flash/target'>Cancel</Button>
            </div>
        </div>
        </>
    );
}

export default DonutChart;