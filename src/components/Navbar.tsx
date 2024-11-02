"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SwapCallsIcon from "@mui/icons-material/SwapCalls";
import { useContext, useState } from "react";
import { Grid, Link, Stack, useTheme } from "@mui/material";
import NextLink from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";

function Navbar() {
  const theme = useTheme();
  const smallerThanXs = useMediaQuery(theme.breakpoints.down("xs"));

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link
              component={NextLink}
              href="/"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              align="center"
            >
              <Stack direction="row" spacing={1}>
                <SwapCallsIcon sx={{ display: { xs: "none", md: "flex" } }} />

                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  quick-flash
                </Typography>
              </Stack>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem
                  component={NextLink}
                  href="/"
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">Flash</Typography>
                </MenuItem>

                <MenuItem
                  component={NextLink}
                  href="/about"
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">About</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Link
              component={NextLink}
              href="/"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              align="center"
            >
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  display: { xs: "flex", md: "none" },
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <SwapCallsIcon />
                <Typography
                  variant="h5"
                  noWrap
                  sx={{
                    mr: 2,
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  quick-flash
                </Typography>
              </Stack>
            </Link>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>

            <Button
              color="primary"
              href="/flash"
              sx={{
                my: 2,
                color: "white",
                display: { xs: "none", md: "block" },
              }}
            >
              Flash
            </Button>
            <Button
              color="primary"
              href="/about"
              sx={{
                my: 2,
                color: "white",
                display: { xs: "none", md: "block" },
              }}
            >
              About
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Navbar;
