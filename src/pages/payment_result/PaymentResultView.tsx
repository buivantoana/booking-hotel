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
  Divider,
  Grid,
  IconButton,
  Menu,
} from "@mui/material";
import {
  Home as HomeIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Info as InfoIcon,
  CheckCircle,
  Close as CloseIcon,
  ArrowBack,
} from "@mui/icons-material";
import success from "../../images/Frame 1321317962.png";
import { useNavigate, useLocation } from "react-router-dom";
import { getStatusPayment } from "../../service/payment";
import failed from "../../images/Frame 1321317963.png";
import dayjs from "dayjs";
import { useBookingContext } from "../../App";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const PaymentResultView = ({ getDetail, loadingDetail,detailBooking }) => {
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
  const context = useBookingContext()
  // 👉 format time
  let startTime = "";
  let endTime = "";
  let checkInDate = "";
  let checkOutDate = "";

  if (data.type === "hourly") {
    // đảm bảo có checkInTime và duration
    const inTime =
      data.checkInTime && data.checkInTime !== "null"
        ? data.checkInTime
        : "00:00";
    const duration = Number(data.duration || 0);

    // tạo datetime bắt đầu từ checkIn (FE lưu kiểu "YYYY-MM-DD")
    const start = dayjs(`${data.checkIn} ${inTime}`, "YYYY-MM-DD HH:mm");

    // tính end bằng dayjs (tự xử lý vượt ngày)
    const end = start.add(duration, "hour");

    startTime = start.format("HH:mm");
    endTime = end.format("HH:mm");

    // ngày hiển thị
    checkInDate = start.format("YYYY-MM-DD");

    // nếu kết thúc khác ngày bắt đầu → hiển thị ngày kết thúc
    if (!end.isSame(start, "day")) {
      checkOutDate = end.format("YYYY-MM-DD");
    } else {
      checkOutDate = checkInDate;
    }
  } else {
    // daily / overnight: lấy trực tiếp check_in & check_out do backend đã tính
    // nếu backend lưu "YYYY-MM-DD HH:mm:ss" thì dùng dayjs(data.check_in)
    const start = dayjs(data.check_in); // note: ensure data.check_in tồn tại
    const end = dayjs(data.check_out);

    startTime = start.format("HH:mm");
    endTime = end.format("HH:mm");

    checkInDate = start.format("YYYY-MM-DD");
    checkOutDate = end.format("YYYY-MM-DD");
  }

  // chuỗi hiển thị
  const timeDisplay =
    data.type === "hourly"
      ? `${startTime} – ${endTime}, ${checkInDate}${checkOutDate !== checkInDate ? ` → ${checkOutDate}` : ""
      }`
      : `${startTime} – ${endTime}, ${checkInDate} → ${checkOutDate}`;

  // cancelBefore (ví dụ)
  const cancelBefore = `${startTime}, ${checkInDate}`;

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
  console.log("AAAAA detail booking",detailBooking)
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
       {detailBooking&& <Container maxWidth='lg'>
           <MainContent navigate={navigate} detailBooking={detailBooking} />
        </Container>}
      {!detailBooking&&<Container maxWidth='sm'>
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
                        {startTime} – {endTime}, {checkInDate}
                        {data.type !== "hourly" ? ` → ${checkOutDate}` : ""}
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
                  onClick={() => {

                    if (context?.state?.user?.id) {
                      navigate("/profile?type=booking", {
                        state: { booking: data },
                      })

                    } else {
                      getDetail(data?.booking_id)
                    }
                  }

                  }
                  fullWidth
                  disabled={loadingDetail}
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
                  {loadingDetail ? (
                    <CircularProgress size={20} sx={{ color: "#fff", mr: 1 }} />
                  ) : (
                    "Xem thông tin đặt phòng"
                  )}
                  
                </Button>
              </Stack>
            )}
          </Stack>
        </Paper>
      </Container>}
    </Box>
  );
};

export default PaymentResultView;
import image_room from "../../images/Rectangle 29975.png";
import logout from "../../images/logout2.png";

import cancel from "../../images/cancel.png";
import pending from "../../images/pending.png";
import pendingpayment from "../../images/pendingpayment.png";
const MainContent = ({ detailBooking,navigate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  if (!detailBooking) return null;

  // Parse JSON string fields
  const hotelName =
    JSON.parse(detailBooking.hotel_name)?.vi ||
    JSON.parse(detailBooking.hotel_name)?.en ||
    "Khách sạn";
  const hotelAddress =
    JSON.parse(detailBooking.hotel_address)?.vi ||
    JSON.parse(detailBooking.hotel_address)?.en ||
    "Chưa có địa chỉ";

  // Xử lý ảnh phòng
  const roomImages = detailBooking.rooms[0]?.images
    ? detailBooking.rooms[0].images
    : [];
  const roomThumbnail =
    roomImages[0] || detailBooking.thumbnail_url || image_room;

  // Format ngày giờ
  const formatDateTime = (isoString) => {
    return dayjs(isoString).format("HH:mm, D/M");
  };

  const checkInTime = formatDateTime(detailBooking.check_in);
  const checkOutTime = formatDateTime(detailBooking.check_out);

  // Tính số giờ / đêm
  const getDurationLabel = () => {
    if (detailBooking.rent_type === "hourly") {
      const hours = dayjs(detailBooking.check_out).diff(
        dayjs(detailBooking.check_in),
        "hour"
      );
      return `${hours < 10 ? "0" + hours : hours} giờ`;
    }
    if (detailBooking.rent_type === "overnight") return "01 đêm";
    if (detailBooking.rent_type === "daily") {
      const days = dayjs(detailBooking.check_out).diff(
        dayjs(detailBooking.check_in),
        "day"
      );
      return `${days} đêm`;
    }
    return "01";
  };

  // Loại đặt phòng
  const getRentTypeLabel = () => {
    switch (detailBooking.rent_type) {
      case "hourly":
        return "Theo giờ";
      case "overnight":
        return "Qua đêm";
      case "daily":
        return "Qua ngày";
      default:
        return "Theo giờ";
    }
  };
  const getBestPayment = (payments = []) => {
    if (!payments.length) return null;

    const priority = ["paid", "pending", "failed", "cancelled", "refunded"];

    for (const st of priority) {
      const found = payments.find((p) => p.status === st);
      if (found) return found;
    }
    return null;
  };
  const getPaymentTextStatus = (payments = []) => {
    if (!payments || payments.length === 0) {
      return "Trả tại khách sạn"; // không có thông tin thanh toán
    }

    // Thứ tự ưu tiên
    const priority = ["paid", "pending", "failed", "cancelled", "refunded"];

    let status: string | null = null;

    for (const st of priority) {
      const found = payments.find((p) => p.status === st);
      if (found) {
        status = found.status;
        break;
      }
    }

    // Map sang text tiếng Việt
    switch (status) {
      case "paid":
        return "Đã thanh toán";
      case "pending":
        return "Đang chờ thanh toán";
      case "failed":
        return "Thanh toán thất bại";
      case "cancelled":
        return "Thanh toán bị hủy";
      case "refunded":
        return "Đã hoàn tiền";
      default:
        return "Chưa thanh toán";
    }
  };
  // Trạng thái thanh toán
  const payments = detailBooking.payments || [];

  // Lấy payment "quan trọng nhất"
  const bestPayment = getBestPayment(payments);

  // Lấy text status
  const paymentStatus = getPaymentTextStatus(payments);

  // Lấy label method đúng
  const paymentMethodLabel = bestPayment?.method
    ? bestPayment.method === "momo"
      ? "Ví MoMo"
      : bestPayment.method === "vnpay"
        ? "VNPay"
        : "Trả tại khách sạn"
    : "Trả tại khách sạn";
  const totalPrice = Number(detailBooking.total_price || 0).toLocaleString(
    "vi-VN"
  );





  return (
    <Stack spacing={3}>
      {/* HEADER */}
      <Stack direction='row' alignItems='center' spacing={1}>

        <Typography display={"flex"} alignItems={"center"} gap={2} fontWeight={600} fontSize='1.1rem' color='#333'>
         <ArrowBackIcon onClick={()=>navigate('/')} sx={{cursor:"pointer"}}/>  Đặt phòng của tôi
        </Typography>
      </Stack>
      {/* BANNER HOÀN THÀNH */}
      {detailBooking.status === "checked_out" && (
        <Paper
          elevation={0}
          sx={{ borderRadius: "16px", bgcolor: "white", p: 2.5 }}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'>
            <Stack direction='row' spacing={2} alignItems='center'>
              <img src={success} alt='Thành công' width={48} />
              <Stack>
                <Typography fontWeight={700} fontSize='1rem' color='#98b720'>
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
                minWidth: 120,
                "&:hover": { bgcolor: "#7a9a1a" },
              }}>
              Đặt lại
            </Button>
          </Stack>
        </Paper>
      )}
      {detailBooking.status === "confirmed" &&
        bestPayment?.status === "paid" && (
          <Paper
            elevation={0}
            sx={{ borderRadius: "16px", bgcolor: "white", p: 2.5 }}>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'>
              <Stack direction='row' spacing={2} alignItems='center'>
                <img src={pending} alt='Thành công' width={48} />
                <Stack>
                  <Typography
                    fontWeight={700}
                    fontSize='1rem'
                    color='#98b720'>
                    Chờ nhận phòng
                  </Typography>
                  <Typography fontSize='0.8rem' color='#666' lineHeight={1.4}>
                    Hoàn tất đặt phòng! đừng quên đến nhận phòng đúng giờ nhé
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        )}

      {detailBooking.status === "pending" &&
        (bestPayment?.status == "failed" ||
          bestPayment?.status == "pending") && (
          <Paper
            elevation={0}
            sx={{ borderRadius: "16px", bgcolor: "white", p: 2.5 }}>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'>
              <Stack direction='row' spacing={2} alignItems='center'>
                <img src={pendingpayment} alt='Thành công' width={48} />
                <Stack>
                  <Typography
                    fontWeight={700}
                    fontSize='1rem'
                    color='#98b720'>
                    Chờ thanh toán
                  </Typography>
                  <Typography fontSize='0.8rem' color='#666' lineHeight={1.4}>
                    Phòng đang được giữ trong 00:14:59
                  </Typography>
                </Stack>
              </Stack>

            </Stack>
          </Paper>
        )}
      {detailBooking.status === "cancelled" && (
        <Paper
          elevation={0}
          sx={{ borderRadius: "16px", bgcolor: "white", p: 2.5 }}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'>
            <Stack direction='row' spacing={2} alignItems='center'>
              <img src={cancel} alt='Thành công' width={48} />
              <Stack>
                <Typography fontWeight={700} fontSize='1rem' color='red'>
                  Không nhận phòng
                </Typography>
                <Typography fontSize='0.8rem' color='#666' lineHeight={1.4}>
                  Bạn đã không nhận phòng đặt vào 10:00, 04/11/2025
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
                minWidth: 120,
                "&:hover": { bgcolor: "#7a9a1a" },
              }}>
              Đặt lại
            </Button>
          </Stack>
        </Paper>
      )}

      {/* LỰA CHỌN CỦA BẠN */}
      <Paper
        elevation={0}
        sx={{ borderRadius: "16px", bgcolor: "white", p: 2.5 }}>
        <Typography fontWeight={600} mb={2} fontSize='1rem' color='#333'>
          Lựa chọn của bạn
        </Typography>
        <Stack direction='row' spacing={2} alignItems='flex-start'>
          {/* HÌNH ẢNH PHÒNG */}
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
              src={roomThumbnail}
              width={120}
              height={120}
              style={{ objectFit: "cover" }}
              alt='Phòng'
            />
          </Box>

          <Stack spacing={0.5} flex={1}>
            <Typography fontWeight={600} fontSize='0.95rem' color='#333'>
              {hotelName}
            </Typography>
            <Typography fontSize='0.9rem' fontWeight={500} color='#333'>
              Phòng tiêu chuẩn
            </Typography>
            <Typography fontSize='0.8rem' color='#666'>
              {hotelAddress}
            </Typography>
          </Stack>

          {/* BẢNG THỜI GIAN */}
          <Paper
            elevation={0}
            sx={{
              bgcolor: "#f8fcf8",
              borderRadius: "12px",
              p: 1.5,
              border: "1px solid #98b720",
              textAlign: "center",
              width: "300px",
            }}>
            <Stack
              direction='row'
              spacing={0.5}
              alignItems='center'
              justifyContent='start'
              mb={1}>
              <CheckCircle sx={{ fontSize: 16, color: "#98b720" }} />
              <Typography fontSize='0.75rem' color='#98b720' fontWeight={600}>
                {getRentTypeLabel()}
              </Typography>
            </Stack>
            <Divider />
            <Grid container spacing={0.5} mt={1} fontSize='0.7rem'>
              <Grid item xs={4}>
                <Typography color='#888' fontSize='0.75rem'>
                  Nhận phòng
                </Typography>
                <Typography fontWeight={600} color='#333' fontSize='0.8rem'>
                  {checkInTime}
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{ borderLeft: "1px solid #ddd", textAlign: "center" }}>
                <Typography color='#888' fontSize='0.75rem'>
                  Trả phòng
                </Typography>
                <Typography fontWeight={600} color='#333' fontSize='0.8rem'>
                  {checkOutTime}
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{ borderLeft: "1px solid #ddd", textAlign: "center" }}>
                <Typography color='#888' fontSize='0.75rem'>
                  {detailBooking.rent_type === "daily" ? "Số đêm" : "Số giờ"}
                </Typography>
                <Typography fontWeight={600} color='#333' fontSize='0.8rem'>
                  {getDurationLabel()}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Stack>
      </Paper>

      {/* THÔNG TIN NHẬN PHÒNG */}
      <Paper
        elevation={0}
        sx={{ borderRadius: "16px", bgcolor: "white", p: 2.5 }}>
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
                {detailBooking.booking_code}
              </Typography>

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
              +84 {detailBooking?.contact_phone?.slice(3)}
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
              {detailBooking?.contact_name}
            </Typography>
          </Stack>
        </Stack>
      </Paper>

      {/* CHI TIẾT THANH TOÁN */}
      <Paper
        elevation={0}
        sx={{ borderRadius: "16px", bgcolor: "white", p: 2.5 }}>
        <Typography fontWeight={600} mb={2} fontSize='1rem' color='#333'>
          Chi tiết thanh toán
        </Typography>
        <Stack spacing={2}>
          <Stack direction='row' justifyContent='space-between'>
            <Typography fontSize='0.9rem' color='#666'>
              Trạng thái
            </Typography>
            <Typography
              fontWeight={600}
              color={bestPayment?.status === "paid" ? "#98b720" : "#ff4444"}
              fontSize='0.95rem'>
              {paymentStatus}
            </Typography>
          </Stack>
          <Stack direction='row' justifyContent='space-between'>
            <Typography fontSize='0.9rem' color='#666'>
              Phương thức thanh toán
            </Typography>
            <Typography fontWeight={600} color='#333' fontSize='0.95rem'>
              {paymentMethodLabel}
            </Typography>
          </Stack>
          <Stack direction='row' justifyContent='space-between'>
            <Typography fontSize='0.9rem' color='#666'>
              Tiền phòng
            </Typography>
            <Typography fontWeight={600} color='#333' fontSize='0.95rem'>
              {totalPrice}đ
            </Typography>
          </Stack>
          <Divider sx={{ bgcolor: "#eee" }} />
          <Stack direction='row' justifyContent='space-between'>
            <Typography fontSize='1rem' fontWeight={700} color='#333'>
              Tổng tiền thanh toán
            </Typography>
            <Typography fontSize='1.1rem' fontWeight={700} color='#333'>
              {totalPrice}đ
            </Typography>
          </Stack>
        </Stack>
      </Paper>

      {/* FOOTER */}

    </Stack>
  );
};