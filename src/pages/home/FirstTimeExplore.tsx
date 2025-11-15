import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { LocationOn, ArrowForwardIos } from "@mui/icons-material";
import qr from "../../images/image 5.png";
import left from "../../images/Frame 1321317998.png";
// === ICON GIẢM GIÁ (SVG) ===
const DiscountIcon = () => (
  <svg
    width='40'
    height='40'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <circle
      cx='12'
      cy='12'
      r='11'
      fill='#fff'
      stroke='#4caf50'
      strokeWidth='2'
    />
    <path
      d='M8 9L16 15M16 9L8 15'
      stroke='#4caf50'
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
);

// === NGƯỜI ĐANG CẦM ĐIỆN THOẠI ===
const PhonePerson = () => (
  <svg width='100' height='100' viewBox='0 0 100 100' fill='none'>
    <circle cx='50' cy='35' r='15' fill='#4caf50' />
    <path
      d='M35 50 Q50 60 65 50 L65 80 Q65 90 50 90 Q35 90 35 80 Z'
      fill='#81c784'
    />
    <rect x='42' y='55' width='16' height='25' rx='2' fill='#fff' />
    <circle cx='50' cy='65' r='3' fill='#4caf50' />
    <text
      x='50'
      y='30'
      fontSize='12'
      fill='#fff'
      textAnchor='middle'
      fontWeight='bold'>
      !
    </text>
  </svg>
);

const FirstTimeExplore = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
        {/* Tiêu đề + Khu vực */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent='space-between'
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={2}
          mb={4}>
          <Typography
            variant='h4'
            fontWeight='bold'
            color='#333'
            sx={{
              fontSize: { xs: "1.5rem", md: "1.875rem" },
            }}>
            Lần đầu khám phá
          </Typography>

          <Chip
            icon={
              <LocationOn
                sx={{ fontSize: 18, color: "rgba(152, 183, 32, 1) !important" }}
              />
            }
            label='Khu vực: Hà Nội'
            clickable
            deleteIcon={
              <ArrowForwardIos sx={{ fontSize: "14px !important" }} />
            }
            onDelete={() => {}}
            sx={{
              bgcolor: "white",
              color: "rgba(152, 183, 32, 1)",
              fontWeight: 600,
              fontSize: "0.9rem",

              "& .MuiChip-deleteIcon": {
                color: "rgba(152, 183, 32, 1)",
                ml: 0.5,
              },
              "&:hover": { bgcolor: "#f1f8e9" },
            }}
          />
        </Stack>

        {/* 2 Card */}
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems='stretch'>
          {/* Card 1: Thành viên mới */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: "rgba(236, 240, 218, 1)",
                borderRadius: "24px",
                p: { xs: 3, md: 4 },
                height: "70%",
                boxShadow: "0 8px 24px rgba(76, 175, 80, 0.1)",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 32px rgba(76, 175, 80, 0.15)",
                },
              }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                  <Typography
                    variant='h6'
                    fontWeight='bold'
                    color='#2e7d32'
                    gutterBottom
                    sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}>
                    Thành viên mới? Quà chất đang đợi!
                  </Typography>
                  <Typography
                    variant='body2'
                    color='#555'
                    sx={{ mb: 3, fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>
                    Giá phòng hợp lý kèm theo nhiều ưu đãi
                  </Typography>
                  <Button
                    variant='contained'
                    sx={{
                      bgcolor: "rgba(152, 183, 32, 1)",
                      color: "white",
                      borderRadius: "16px",
                      px: 4,
                      py: 1.5,
                      fontWeight: "bold",
                      textTransform: "none",
                      fontSize: "1rem",
                      boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
                      "&:hover": { bgcolor: "#43a047" },
                    }}>
                    Đăng ký ngay
                  </Button>
                </Grid>
                <Grid item xs={12} sm={5} sx={{ textAlign: "center" }}>
                  <Box sx={{ position: "relative" }}>
                    <Box component='img' src={left} alt='QR Code' />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* Card 2: Tải app */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: "#fff8e1",
                borderRadius: "24px",
                p: { xs: 3, md: 4 },
                height: "70%",
                boxShadow: "0 8px 24px rgba(255, 193, 7, 0.1)",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 32px rgba(255, 193, 7, 0.15)",
                },
              }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                  <Typography
                    variant='h6'
                    fontWeight='bold'
                    color='#ff8f00'
                    gutterBottom
                    sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}>
                    Nhận ưu đãi liền tay khi tải app!
                  </Typography>
                  <Typography
                    variant='body2'
                    color='#555'
                    sx={{ mb: 2, fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>
                    Sử dụng ứng dụng để săn deal mới ngay
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={5} sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: "16px",
                      p: 2,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                      display: "inline-block",
                    }}>
                    <Box
                      component='img'
                      src={qr}
                      alt='QR Code'
                      sx={{ width: 120, height: 120 }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FirstTimeExplore;
