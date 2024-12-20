import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata, Viewport } from "next";

import { Roboto } from "next/font/google";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "../styles/theme/lightTheme";
import { CssBaseline } from "@mui/material";
import Navbar from "@/components/Navbar";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  icons: ["/favicon.ico"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout(props: any) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Navbar />
            {props.children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

/* eslint-disable @next/next/no-document-import-in-page 


      <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          {children}
      </ThemeProvider>
    </CacheProvider>
  );

*/
