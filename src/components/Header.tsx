"use client";

import React, { useEffect, useState } from "react";
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
  const [locationAddress, setLocationAddress] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (location.pathname == "/rooms") {
          let result = await getLocation();
          console.log("AAA location", result);
          if (result?.locations) {
            setLocationAddress(result?.locations);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box bgcolor={"white"} sx={{}} p={0}>
      <Container maxWidth='lg'>
        <AppBar
          position='static'
          elevation={0}
          sx={{
            bgcolor: "white",
            py: 1,
            px: 0,
          }}>
          <Toolbar
            sx={{
              px: "0px !important",
              justifyContent: "space-between",
            }}>
            {/* LEFT: LOGO + TEXT */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: "200px",
              }}>
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
            {location.pathname == "/rooms" && (
              <SearchBarWithDropdownHeader locationAddress={locationAddress} />
            )}
            {/* RIGHT: AVATAR */}
            <Box>
              <UserDropdownMenuV2 />
            </Box>

            {/* MOBILE MENU */}
            {/* <Menu
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
            </Menu> */}
          </Toolbar>
        </AppBar>
      </Container>
    </Box>
  );
};

export default Header;
("use client");

import { ListItemIcon, ListItemText, Stack } from "@mui/material";
import {
  RoomPreferencesOutlined as BookingIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { getLocation } from "../service/hotel";

function UserDropdownMenuV2() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    handleClose();
  };

  const handleLogout = () => {
    // TODO: xử lý logout thật
    alert("Đã đăng xuất!");

    handleClose();
  };

  return (
    <>
      {/* Nút kích hoạt dropdown */}
      <IconButton
        onClick={handleClick}
        sx={{
          p: 0,
          borderRadius: "50%",
          width: 44,
          height: 44,
          bgcolor: "transparent",
          "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
        }}>
        <Avatar
          sx={{
            width: 44,
            height: 44,
            bgcolor: "#e8f5e8",
            border: "3px solid white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}>
          <PersonIcon sx={{ color: "#98b720", fontSize: 26 }} />
        </Avatar>
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: "20px",
            width: 280,
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            bgcolor: "white",
          },
        }}>
        {/* Header: Avatar + Tên + SĐT */}
        <Box sx={{}}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: "rgba(152, 183, 32, 1)",
              }}>
              <PersonIcon sx={{ color: "#98b b720", fontSize: 32 }} />
            </Avatar>
            <Box>
              <Typography fontWeight={700} fontSize='16px' color='#333'>
                Thangdv
              </Typography>
              <Typography fontSize='14px' color='#666' mt={0.5}>
                +(84) 123456789
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Menu Items */}
        <Box sx={{ py: 1 }}>
          <MenuItem
            onClick={() => handleNavigate("/profile")}
            sx={{
              py: 2,
              px: 3,
              borderRadius: "0 0 12px 12px",
              "&:hover": { bgcolor: "#f8f8f8" },
            }}>
            <ListItemIcon sx={{ minWidth: 40, color: "#666" }}>
              <PersonIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>
              <Typography fontWeight={500} fontSize='15px'>
                Hồ sơ của tôi
              </Typography>
            </ListItemText>
          </MenuItem>

          <MenuItem
            onClick={() => handleNavigate("/my-bookings")}
            sx={{
              py: 2,
              px: 3,
              "&:hover": { bgcolor: "#f8f8f8" },
            }}>
            <ListItemIcon sx={{ minWidth: 40, color: "#666" }}>
              <BookingIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>
              <Typography fontWeight={500} fontSize='15px'>
                Đặt phòng của tôi
              </Typography>
            </ListItemText>
          </MenuItem>

          <Divider sx={{ mx: 3, my: 1 }} />

          <MenuItem
            onClick={handleLogout}
            sx={{
              py: 2,
              px: 3,
              color: "#e91e63",
              "&:hover": { bgcolor: "#ffebee" },
            }}>
            <ListItemIcon sx={{ minWidth: 40, color: "#e91e63" }}>
              <LogoutIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>
              <Typography fontWeight={500} fontSize='15px'>
                Đăng xuất
              </Typography>
            </ListItemText>
          </MenuItem>
        </Box>
      </Menu>
    </>
  );
}
