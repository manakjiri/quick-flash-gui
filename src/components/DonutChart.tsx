"use client";
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Button, Typography } from '@mui/material';
import { invoke } from '@tauri-apps/api/core';

export default function DonutChart() {
  const [progress, setProgress] = React.useState<number>(0);


  React.useEffect(() => {
    const fetchProgress = async () => {
      console.log("Fetching progress...");
      try {
        const newProgress: number = await invoke("get_progress");
        console.log("Progress fetched:", newProgress);
        setProgress(newProgress);
      } catch (error) {
        console.error("Error updating progress:", error);
      }
    };

    fetchProgress();
  }, []);


  return (
    <div style={{ position: 'relative', width: 600, height: 400 }}>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: progress, color: '#1976d2' },
            ],
            innerRadius: 60,
            endAngle: 359,
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
          color: '#1976d2',
        }}
      >
        {progress}%
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
          gap: '8px',
          color: 'black',
        }}
      >
        <div style={{ fontSize: '24px', fontWeight: 'semibold' }}>
          <Typography textAlign="center" variant="h5">Flashing...</Typography>
        </div>
        <Button variant="outlined">Cancel</Button>
      </div>
    </div>
  );
}
