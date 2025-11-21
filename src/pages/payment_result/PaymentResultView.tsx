"use client";

import React from "react";
import {
  Box,
  Stack,
  Typography,
  Paper,
  Button,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Home as HomeIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import success from "../../images/Frame 1321317962.png";
import { useNavigate } from "react-router-dom";
const PaymentResultView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        bgcolor: "#f9f9f9",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}>
      <Container maxWidth='sm'>
        <Paper
          elevation={0}
          sx={{
            borderRadius: "24px",
            bgcolor: "white",
            p: { xs: 3, sm: 4 },
            textAlign: "center",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          }}>
          <Stack spacing={3} alignItems='center'>
            {/* ICON CHECK XANH */}
            <Box>
              <img src={success} alt='' />
            </Box>

            {/* TIÊU ĐỀ */}
            <Typography
              fontWeight={700}
              fontSize={{ xs: "1.25rem", sm: "1.5rem" }}
              color='rgba(152, 183, 32, 1)'>
              Đặt phòng thành công
            </Typography>

            {/* MÔ TẢ */}
            <Typography fontSize='0.9rem' color='#666' lineHeight={1.5}>
              Chúc mừng bạn đã đặt thành công phòng tại{" "}
              <strong>Hoàng gia Luxury hotel</strong>
            </Typography>

            {/* THÔNG TIN CHI TIẾT */}
            <Paper
              elevation={0}
              sx={{
                bgcolor: "#f5f5f5",
                borderRadius: "16px",
                p: 2.5,
                width: "100%",
                textAlign: "left",
              }}>
              <Stack spacing={1}>
                {/* PHÒNG */}
                <Stack direction='row' spacing={2} alignItems='center'>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,

                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <HomeIcon sx={{ fontSize: 20, color: "#666" }} />
                  </Box>
                  <Typography fontSize='0.95rem' color='#666' fontWeight={600}>
                    Deluxe room
                  </Typography>
                </Stack>

                {/* THỜI GIAN */}
                <Stack direction='row' spacing={2} alignItems='center'>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,

                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <TimeIcon sx={{ fontSize: 20, color: "#666" }} />
                  </Box>
                  <Typography fontSize='0.9rem' color='#333'>
                    10:00 – 12:00, 04/11/2025
                  </Typography>
                </Stack>

                {/* THANH TOÁN */}
                <Stack direction='row' spacing={2} alignItems='center'>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,

                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <LocationIcon sx={{ fontSize: 20, color: "#666" }} />
                  </Box>
                  <Typography fontSize='0.9rem' color='#333'>
                    Trả tại khách sạn
                  </Typography>
                </Stack>

                {/* HỦY PHÒNG */}
                <Stack direction='row' spacing={2} alignItems='center'>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,

                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <InfoIcon sx={{ fontSize: 20, color: "#666" }} />
                  </Box>
                  <Typography fontSize='0.9rem' color='#333'>
                    Hủy miễn phí trước 10:05, 4/11/2025
                  </Typography>
                </Stack>
              </Stack>
            </Paper>

            {/* NÚT HÀNH ĐỘNG */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              width='100%'
              mt={2}>
              <Button
                fullWidth
                onClick={()=>{
                  navigate("/")
                }}
                variant='text'
                sx={{
                  color: "#666",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "0.95rem",
                }}>
                Về trang chủ
              </Button>
              <Button
              onClick={()=>{
                navigate("/profile?type=booking")
              }}
                fullWidth
                variant='contained'
                sx={{
                  bgcolor: "#98b720",
                  color: "white",
                  borderRadius: "50px",
                  fontWeight: 600,
                  textTransform: "none",
                  py: 1.5,
                  fontSize: "0.95rem",
                  boxShadow: "0 4px 12px rgba(152, 183, 32, 0.3)",
                  "&:hover": {
                    bgcolor: "#7a9a1a",
                  },
                }}>
                Xem thông tin đặt phòng
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default PaymentResultView;
