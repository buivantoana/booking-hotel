"use client";

import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Paper,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Grid,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  ContentCopy as CopyIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Room as RoomIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import image_room from "../../images/Rectangle 29975.png";
const ProfileView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { text: "Hồ sơ của tôi", icon: <PersonIcon />, active: false },
    { text: "Thiết lập tài khoản", icon: <SettingsIcon />, active: false },
    { text: "Đặt phòng của tôi", icon: <RoomIcon />, active: true },
    { text: "Đăng xuất", icon: <LogoutIcon />, active: false },
  ];

  const Sidebar = () => (
    <Paper
      elevation={0}
      sx={{
        width: 280,
        height: "fit-content",
        borderRadius: "16px",
        bgcolor: "white",
        p: 3,

        position: "sticky",
        top: 16,
      }}>
      <Stack spacing={3}>
        {/* USER INFO */}
        <Stack direction='row' spacing={2} alignItems='center'>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: "#e8f5e8",
            }}>
            <PersonIcon sx={{ color: "#98b720", fontSize: 28 }} />
          </Avatar>
          <Stack>
            <Typography fontWeight={600} fontSize='1rem' color='#333'>
              Thangdv
            </Typography>
            <Typography fontSize='0.8rem' color='#666'>
              +84 123456789
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ bgcolor: "#eee" }} />

        {/* MENU */}
        <List disablePadding>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              disablePadding
              sx={{
                borderRadius: "12px",
                mb: 1,
                bgcolor: item.active ? "#f0f8f0" : "transparent",
                border: item.active ? "1px solid #98b720" : "none",
                px: 1,
                py: 0.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: item.active ? "rgba(152, 183, 32, 1)" : "#999",
                }}>
                {React.cloneElement(item.icon, { fontSize: "small" })}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    fontWeight={item.active ? 600 : 500}
                    fontSize='0.9rem'
                    color={item.active ? "rgba(152, 183, 32, 1)" : "#666"}>
                    {item.text}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Paper>
  );

  const MainContent = () => (
    <Stack spacing={3}>
      {/* HEADER */}
      <Stack direction='row' alignItems='center' spacing={1}>
        <IconButton
          size='small'
          onClick={() => isMobile && setDrawerOpen(true)}>
          {isMobile ? (
            <MenuIcon sx={{ fontSize: 22 }} />
          ) : (
            <ArrowBackIcon sx={{ fontSize: 20 }} />
          )}
        </IconButton>
        <Typography fontWeight={600} fontSize='1.1rem' color='#333'>
          Đặt phòng của tôi
        </Typography>
      </Stack>

      {/* BANNER HOÀN THÀNH */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "16px",
          bgcolor: "white",
          p: 2.5,
        }}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#98b720",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <CheckCircleIcon sx={{ fontSize: 24, color: "white" }} />
            </Box>
            <Stack>
              <Typography fontWeight={700} fontSize='1rem' color='#333'>
                Hoàn thành
              </Typography>
              <Typography fontSize='0.8rem' color='#666' lineHeight={1.4}>
                Cảm ơn bạn đã đặt phòng! đừng quên đánh giá khách sạn nhé.
              </Typography>
            </Stack>
          </Stack>
          <Button
            variant='contained'
            sx={{
              bgcolor: "#98b720",
              color: "white",
              borderRadius: "50px",
              fontWeight: 600,
              textTransform: "none",
              px: 3,
              py: 1,
              fontSize: "0.9rem",
              minWidth: 80,
              "&:hover": { bgcolor: "#7a9a1a" },
            }}>
            Đặt lại
          </Button>
        </Stack>
      </Paper>

      {/* LỰA CHỌN CỦA BẠN */}

      <Paper
        elevation={0}
        sx={{
          borderRadius: "16px",
          bgcolor: "white",
          p: 2.5,
        }}>
        <Typography fontWeight={600} mb={2} fontSize='1rem' color='#333'>
          Lựa chọn của bạn
        </Typography>
        <Stack direction='row' spacing={2} alignItems='flex-start'>
          {/* HÌNH PHÒNG - PLACEHOLDER */}
          <Box
            sx={{
              width: 120,
              height: 120,
              bgcolor: "#f0f0f0",
              borderRadius: "12px",
              overflow: "hidden",
              flexShrink: 0,
            }}>
            <img
              src={image_room}
              width={120}
              height={120}
              style={{ objectFit: "cover" }}
              alt=''
            />
          </Box>

          <Stack spacing={0.5} flex={1}>
            <Typography fontWeight={600} fontSize='0.95rem' color='#333'>
              Hoàng gia Luxury hotel
            </Typography>
            <Typography fontSize='0.9rem' fontWeight={500} color='#333'>
              Deluxe room
            </Typography>
            <Typography fontSize='0.8rem' color='#666'>
              Số 22 Đường Phạm Văn Bạch, Phường Yên Hòa...
            </Typography>
          </Stack>

          {/* BẢNG THEO GIỜ */}
          <Paper
            elevation={0}
            sx={{
              bgcolor: "#f8fcf8",
              borderRadius: "12px",
              p: 1.5,
              border: "1px solid rgba(152, 183, 32, 1)",
              textAlign: "center",
              width: "300px",
            }}>
            <Stack
              direction='row'
              spacing={0.5}
              alignItems='center'
              justifyContent='start'
              mb={1}>
              <CheckCircleIcon sx={{ fontSize: 14, color: "#98b720" }} />
              <Typography fontSize='0.75rem' color='#98b720' fontWeight={600}>
                Theo giờ
              </Typography>
            </Stack>
            <Divider />
            <Grid container spacing={0.5} mt={1} fontSize='0.7rem'>
              <Grid item xs={4}>
                <Typography color='#888' fontSize='0.65rem'>
                  Nhận phòng
                </Typography>
                <Typography fontWeight={600} color='#333' fontSize='0.7rem'>
                  10:00, 4/11
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{ borderLeft: "1px solid #ddd", textAlign: "center" }}>
                <Typography color='#888' fontSize='0.65rem'>
                  Trả phòng
                </Typography>
                <Typography fontWeight={600} color='#333' fontSize='0.7rem'>
                  12:00, 4/11
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{ borderLeft: "1px solid #ddd", textAlign: "center" }}>
                <Typography color='#888' fontSize='0.65rem'>
                  Số giờ
                </Typography>
                <Typography fontWeight={600} color='#333' fontSize='0.7rem'>
                  02
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Stack>
      </Paper>

      {/* THÔNG TIN NHẬN PHÒNG */}

      <Paper
        elevation={0}
        sx={{
          borderRadius: "16px",
          bgcolor: "white",
          p: 2.5,
        }}>
        <Typography fontWeight={600} mb={2} fontSize='1rem' color='#333'>
          Thông tin nhận phòng
        </Typography>
        <Stack spacing={2}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'>
            <Typography fontSize='0.9rem' color='#666'>
              Mã đặt phòng
            </Typography>
            <Stack direction='row' spacing={0.5} alignItems='center'>
              <Typography fontWeight={600} color='#333' fontSize='0.95rem'>
                123456
              </Typography>
              <IconButton size='small' sx={{ color: "#98b720", p: 0.5 }}>
                <CopyIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Stack>
          </Stack>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'>
            <Typography fontSize='0.9rem' color='#666'>
              Số điện thoại
            </Typography>
            <Typography fontWeight={600} color='#333' fontSize='0.95rem'>
              +84 123456789
            </Typography>
          </Stack>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'>
            <Typography fontSize='0.9rem' color='#666'>
              Họ tên
            </Typography>
            <Typography fontWeight={600} color='#333' fontSize='0.95rem'>
              Thangdv
            </Typography>
          </Stack>
        </Stack>
      </Paper>

      {/* CHI TIẾT THANH TOÁN */}

      <Paper
        elevation={0}
        sx={{
          borderRadius: "16px",
          bgcolor: "white",
          p: 2.5,
        }}>
        <Typography fontWeight={600} mb={2} fontSize='1rem' color='#333'>
          Chi tiết thanh toán
        </Typography>
        <Stack spacing={2}>
          <Stack direction='row' justifyContent='space-between'>
            <Typography fontSize='0.9rem' color='#666'>
              Trạng thái
            </Typography>
            <Typography fontWeight={600} color='#98b720' fontSize='0.95rem'>
              Thanh toán trực tiếp
            </Typography>
          </Stack>
          <Stack direction='row' justifyContent='space-between'>
            <Typography fontSize='0.9rem' color='#666'>
              Tiền phòng (2 giờ)
            </Typography>
            <Typography fontWeight={600} color='#333' fontSize='0.95rem'>
              160.000đ
            </Typography>
          </Stack>
          <Divider sx={{ bgcolor: "#eee" }} />
          <Stack direction='row' justifyContent='space-between'>
            <Typography fontSize='1rem' fontWeight={700} color='#333'>
              Tổng tiền thanh toán
            </Typography>
            <Typography fontSize='1.1rem' fontWeight={700} color='#333'>
              160.000đ
            </Typography>
          </Stack>
        </Stack>
      </Paper>

      {/* FOOTER */}
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        mt={3}
        flexDirection={isMobile ? "column" : "row"}
        spacing={2}>
        <Typography
          fontSize='16px'
          color='rgba(43, 47, 56, 1)'
          sx={{ textDecoration: "underline", cursor: "pointer" }}>
          Chính sách hủy phòng
        </Typography>
        <Button
          fullWidth={isMobile}
          variant='contained'
          sx={{
            bgcolor: "#98b720",
            color: "white",
            borderRadius: "50px",
            fontWeight: 600,
            textTransform: "none",
            px: 4,
            py: 1,
            fontSize: "1rem",
            "&:hover": { bgcolor: "#7a9a1a" },
            minWidth: isMobile ? "100%" : "220px",
          }}>
          Đặt lại
        </Button>
      </Stack>
    </Stack>
  );

  return (
    <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh", py: { xs: 2, md: 3 } }}>
      <Container maxWidth='lg'>
        {isMobile ? (
          <>
            <Drawer
              anchor='left'
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}>
              <Box sx={{ width: 280, p: 2 }}>
                <Sidebar />
              </Box>
            </Drawer>
            <MainContent />
          </>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3.5}>
              <Sidebar />
            </Grid>
            <Grid item xs={12} md={8} lg={8.5}>
              <MainContent />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ProfileView;
