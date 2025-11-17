"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Divider,
  Container,
} from "@mui/material";
import { Menu as MenuIcon, Person as PersonIcon } from "@mui/icons-material";
import SearchBarWithDropdownHeader from "./SearchBarWithDropdownHeader";
import { useLocation } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box bgcolor={"white"} p={0}>
      <Container maxWidth='lg'>
        <AppBar
          position='static'
          elevation={0}
          sx={{
            bgcolor: "white",
            borderBottom: "1px solid #eee",
            py: 1,
            px:0
          }}>
          <Toolbar
            sx={{
              
              px:"0px !important",
              justifyContent: "space-between",
            }}>
            {/* LEFT: LOGO + TEXT */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2,width:"200px" }}>
              {isMobile ? (
                <IconButton edge='start' onClick={handleMenuOpen}>
                  <MenuIcon sx={{ color: "#333" }} />
                </IconButton>
              ) : (
                <>
                  <Typography
                    variant='h5'
                    fontWeight={700}
                    color='#333'
                    sx={{ fontSize: "1.5rem" }}>
                    Logo
                  </Typography>
                  <Typography
                    variant='body2'
                    color='#666'
                    sx={{
                      fontSize: "0.875rem",
                      letterSpacing: "0.5px",
                    }}>
                    Dành cho đối tác
                  </Typography>
                </>
              )}
            </Box>
             {location.pathname == "/rooms"&& <SearchBarWithDropdownHeader/>}
            {/* RIGHT: AVATAR */}
            <Box>
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  p: 0,
                  "&:hover": { bgcolor: "transparent" },
                }}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "#f0f8f0",
                    border: "2px solid #98b720",
                  }}>
                  <PersonIcon sx={{ color: "#98b720", fontSize: 22 }} />
                </Avatar>
              </IconButton>
            </Box>

            {/* MOBILE MENU */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              PaperProps={{
                sx: {
                  mt: 1,
                  width: 220,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                },
              }}>
              <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
                <Typography fontWeight={700} fontSize='1.1rem' color='#333'>
                  Logo
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Typography color='#666' fontSize='0.9rem'>
                  Dành cho đối tác
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleMenuClose}>Hồ sơ</MenuItem>
              <MenuItem onClick={handleMenuClose}>Đăng xuất</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Container>
    </Box>
  );
};

export default Header;
