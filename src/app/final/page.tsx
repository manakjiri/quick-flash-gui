import DonutChart from "@/components/DonutChart";
import HorizontalLinearStepper from "@/components/Stepper";
import Box from "@mui/material/Box";
import styles from "../styles/Home.module.css";

export default function Home() {



    return (
        <>
        <Box sx={{ mt: 1 }}>
            <HorizontalLinearStepper activeStep={4} />
        </Box>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh'
        }}>
            <DonutChart />
        </div>
        </>
    
    );
}
