"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Paper,
  Button,
  Container,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Home as HomeIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import success from "../../images/Frame 1321317962.png";
import { useNavigate, useLocation } from "react-router-dom";
import { getStatusPayment } from "../../service/payment";
import failed from "../../images/Frame 1321317963.png";
import dayjs from "dayjs";

const PaymentResultView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  const data =
    location.state?.data || JSON.parse(localStorage.getItem("booking"));

  const paymentId = data?.payment?.payment_id;
  console.log("aaa paymentId", paymentId);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("pending"); // success | fail | pending

  // 👉 format time
  const checkIn = dayjs(data.check_in).format("YYYY-MM-DD");
  const checkOut = dayjs(data.check_out).format("YYYY-MM-DD");

  const startTime = dayjs(data.check_in).format("HH:mm");
  const endTime = dayjs(data.check_out).format("HH:mm");

  // Hủy miễn phí trước giờ check-in
  const cancelBefore = `${startTime}, ${checkIn}`;

  // 🔥 AUTO CHECK PAYMENT STATUS
  useEffect(() => {
    if (!paymentId) {
      setPaymentStatus("fail");
      setLoading(false);
      return;
    }

    let count = 0;

    const checkPayment = async () => {
      try {
        let result = await getStatusPayment(paymentId);
        const status = result?.status;
        if (status === "failed") {
          clearInterval(interval);
          setPaymentStatus("failed");
          setLoading(false);
          return;
        }

        // 🟩 STOP LOOP WHEN SUCCESS
        if (status === "paid") {
          clearInterval(interval);
          setPaymentStatus("paid");
          setLoading(false);

          return;
        }
        // chưa có kết quả → retry
        count++;
        if (count >= 30) {
          setPaymentStatus("failed");
          setLoading(false);
          return;
        }
      } catch (e) {
        console.log("ERR", e);
      }
    };

    // call ngay khi vào
    checkPayment();

    // call liên tục mỗi 2s
    const interval = setInterval(checkPayment, 2000);

    return () => clearInterval(interval);
  }, [paymentId]);

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
            {/* LOAD PAYMENT */}
            {loading ? (
              <>
                <CircularProgress sx={{ color: "#98b720" }} />
                <Typography fontSize='0.9rem' color='#666'>
                  Đang xác thực thanh toán...
                </Typography>
              </>
            ) : paymentStatus === "fail" ? (
              <>
                <Typography color='red' fontSize='1.2rem' fontWeight={600}>
                  Thanh toán thất bại!
                </Typography>
                <Typography color='#666'>
                  Vui lòng thử lại hoặc chọn phương thức thanh toán khác.
                </Typography>
              </>
            ) : (
              <>
                {/* Success */}
                <Box>
                  <img
                    src={paymentStatus == "failed" ? failed : success}
                    alt=''
                    style={{ width: 90 }}
                  />
                </Box>

                <Typography
                  fontWeight={700}
                  fontSize={{ xs: "1.25rem", sm: "1.5rem" }}
                  color={
                    paymentStatus == "failed"
                      ? "#FF3030"
                      : "rgba(152, 183, 32, 1)"
                  }>
                  {paymentStatus == "failed"
                    ? "Đặt phòng không thành công"
                    : "Đặt phòng thành công"}
                </Typography>

                <Typography fontSize='0.9rem' color='#666' lineHeight={1.5}>
                  {paymentStatus == "failed"
                    ? "Đã có lỗi xảy ra trong lúc thanh toán phòng tại"
                    : "Chúc mừng bạn đã đặt thành công phòng tại"}{" "}
                  <strong>{data.name}</strong>
                </Typography>

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
                    {/* ROOM */}
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <Box sx={{ width: 36, height: 36 }}>
                        <HomeIcon sx={{ fontSize: 20, color: "#666" }} />
                      </Box>
                      <Typography
                        fontSize='0.95rem'
                        color='#666'
                        fontWeight={600}>
                        Room × {data.rooms[0].quantity}
                      </Typography>
                    </Stack>

                    {/* TIME */}
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <Box sx={{ width: 36, height: 36 }}>
                        <TimeIcon sx={{ fontSize: 20, color: "#666" }} />
                      </Box>
                      <Typography fontSize='0.9rem' color='#333'>
                        {startTime} – {endTime}, {checkIn} → {checkOut}
                      </Typography>
                    </Stack>

                    {/* PAYMENT METHOD */}
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <Box sx={{ width: 36, height: 36 }}>
                        <LocationIcon sx={{ fontSize: 20, color: "#666" }} />
                      </Box>
                      <Typography fontSize='0.9rem' color='#333'>
                        Thanh toán: {data.payment.method.toUpperCase()}
                      </Typography>
                    </Stack>

                    {/* CANCEL */}
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <Box sx={{ width: 36, height: 36 }}>
                        <InfoIcon sx={{ fontSize: 20, color: "#666" }} />
                      </Box>
                      <Typography fontSize='0.9rem' color='#333'>
                        Hủy miễn phí trước {cancelBefore}
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              </>
            )}

            {/* ACTION */}
            {!loading && (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                width='100%'
                mt={2}>
                <Button
                  fullWidth
                  onClick={() => navigate("/")}
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
                  onClick={() =>
                    navigate("/profile?type=booking", {
                      state: { booking: data },
                    })
                  }
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
            )}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default PaymentResultView;
