"use client";

import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  Button,
  Divider,
  Grid,
  useTheme,
  useMediaQuery,
  IconButton,
  Container,
  Modal,
  TextField,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  LocalOffer as OfferIcon,
  Close as CloseIcon,
  CheckCircle as CheckIcon,
  Edit as EditIcon,
  AccessTime,
  Nightlight,
  CalendarToday,
} from "@mui/icons-material";
import dayjs from "dayjs";
import imgMain from "../../images/Rectangle 12.png";
import vnpay from "../../images/Frame 1321317955.png";
import momo from "../../images/Rectangle 30024.png";
import building from "../../images/building.png";
import { createBooking } from "../../service/booking";
import { useNavigate } from "react-router-dom";

const CheckOutView = ({ dataCheckout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [openCancelPolicyModal, setOpenCancelPolicyModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(JSON.parse(localStorage.getItem("user"))?.phone||JSON.parse(localStorage.getItem("booking"))?.phone);
  const [name, setName] = useState(JSON.parse(localStorage.getItem("user"))?.name);
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  
  // Dữ liệu từ props
  const {
    type = "hourly",
    checkIn,
    checkOut,
    checkInTime = "10:00",
    duration = 2,
    name: hotelName = "Khách sạn",
    address = "Chưa có địa chỉ",
    image = imgMain, // fallback nếu không có ảnh
    price = 0,
  } = dataCheckout || {};

  // Format tiền
  const formattedPrice = Number(price).toLocaleString("vi-VN");

  // Xử lý hiển thị loại phòng + thời gian
  const getBookingTypeLabel = () => {
    if (type === "hourly") return "Theo giờ";
    if (type === "overnight") return "Qua đêm";
    if (type === "daily") return "Qua ngày";
    return "Theo giờ";
  };

  const getBookingTypeIcon = () => {
    if (type === "hourly") return <AccessTime sx={{ fontSize: 18 ,color:"#98b720" }} />;
    if (type === "overnight") return <Nightlight sx={{ fontSize: 18 ,color:"#98b720" }} />;
    if (type === "daily") return <CalendarToday sx={{ fontSize: 18 ,color:"#98b720" }} />;
    return <AccessTime sx={{ fontSize: 18 ,color:"#98b720" }} />;
  };

  // Format ngày + giờ
  const formatCheckIn = () => {
    if (!checkIn) return "Chưa chọn";
    const date = dayjs(checkIn);
    if (type === "hourly" || type === "overnight") {
      return `${checkInTime}, ${date.format("D/M")}`;
    }
    return date.format("D/M");
  };

  const formatCheckOut = () => {
    if (type === "hourly" && checkIn) {
      const start = dayjs(checkIn).hour(parseInt(checkInTime.split(":")[0])).minute(0);
      const end = start.add(duration, "hour");
      return `${end.format("HH:mm")}, ${end.format("D/M")}`;
    }
    if (type === "overnight" && checkIn) {
      const end = dayjs(checkIn).add(1, "day");
      return `12:00, ${end.format("D/M")}`;
    }
    if (type === "daily" && checkOut) {
      return dayjs(checkOut).format("D/M");
    }
    return "Chưa chọn";
  };

  const formatDuration = () => {
    if (type === "hourly") return `${duration < 10 ? "0" + duration : duration}`;
    if (type === "overnight") return "01 đêm";
    if (type === "daily" && checkIn && checkOut) {
      const nights = dayjs(checkOut).diff(dayjs(checkIn), "day");
      return nights < 10 ? `0${nights}` : nights;
    }
    return "01";
  };

  const offers = [
    { id: "1", discount: "15K", title: "Super sale - quà 50% cho thành viên mới đăng ký", desc: "Giảm tới 50% 50k" },
    { id: "2", discount: "15K", title: "Super sale - quà 50% cho thành viên mới đăng ký", desc: "Giảm tới 50% 50k" },
    { id: "3", discount: "15K", title: "Super sale - quà 50% cho thành viên mới đăng ký", desc: "Giảm tới 50% 50k" },
  ];
  const handleCreateBooking = async () => {
    setLoading(true)
    if (!dataCheckout) {
      alert("Thiếu thông tin đặt phòng!");
      return;
    }
  
    try {
      // Format ngày giờ theo chuẩn API: YYYY-MM-DD HH:mm:ss
      const formatDateTime = (dateStr: string, time?: string) => {
        if (!dateStr) return null;
        const date = dayjs(dateStr);
        if (time) {
          const [h, m] = time.split(":");
          return date.hour(+h).minute(+m).second(0).format("YYYY-MM-DD HH:mm:ss");
        }
        return date.format("YYYY-MM-DD HH:mm:ss");
      };
  
      // Tính check_out nếu là hourly
      let checkInDateTime = formatDateTime(dataCheckout.checkIn, dataCheckout.checkInTime);
      let checkOutDateTime = null;
  
      if (dataCheckout.type === "hourly" && checkInDateTime) {
        const start = dayjs(checkInDateTime);
        checkOutDateTime = start.add(dataCheckout.duration, "hour").format("YYYY-MM-DD HH:mm:ss");
      } else if (dataCheckout.type === "overnight" && checkInDateTime) {
        const start = dayjs(checkInDateTime);
        checkOutDateTime = start.add(1, "day").hour(12).minute(0).second(0).format("YYYY-MM-DD HH:mm:ss");
      } else if (dataCheckout.type === "daily" && dataCheckout.checkOut) {
        checkOutDateTime = formatDateTime(dataCheckout.checkOut);
      }
  
      const body = {
        hotel_id: dataCheckout.hotel_id,
        check_in: checkInDateTime,
        check_out: checkOutDateTime,
        rent_type: dataCheckout.type, // hourly | overnight | daily
        payment_method: paymentMethod, // momo | vnpay | hotel
        contact_info: {
          full_name:(name&& name.trim() )|| "Khách lẻ",
          phone: phone.replace(/[^0-9]/g, ""), // chỉ lấy số
          email: "khachle@gmail.com", // nếu có thì thêm sau
        },
        rooms: dataCheckout.rooms || [], // ví dụ: [{ room_type_id: "...", quantity: 1 }]
        note: "ghi chú", // bạn có thể thêm TextField để nhập ghi chú
      };
  
      console.log("Gửi booking:", body); // để check trước khi gọi API
  
      const result = await createBooking(body); // gọi API thật
      console.log("AAA result",result)
      navigate("/payment-result")
      // if (result.success) {
      //   alert("Đặt phòng thành công!");
      //   // Chuyển hướng sang trang xác nhận hoặc thanh toán
      //   // router.push(`/booking-success/${result.booking_id}`);
      // }
    } catch (error: any) {
      console.error("Lỗi đặt phòng:", error);
      alert(error.message || "Đặt phòng thất bại, vui lòng thử lại!");
    }
    setLoading(false)
  };
  return (
    <Box sx={{ bgcolor: "#f9f9f9", py: { xs: 2, md: 3 } }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          {/* HEADER */}
          <Stack direction="row" sx={{cursor:"pointer"}} onClick={()=>navigate(-1)} alignItems="center" spacing={1}>
            <IconButton size="small">
              <ArrowBackIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <Typography fontWeight={600} fontSize="1.1rem" color="#333">
              Xác nhận thanh toán
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            {/* CỘT TRÁI */}
            <Grid item xs={12} md={6}>
              {/* BOOKING SUMMARY */}
              <Paper elevation={0} sx={{ borderRadius: "16px", bgcolor: "white", p: 2.5, border: "1px solid #e0e0e0", height: "max-content" }}>
                <Stack spacing={2.5}>
                  {/* LOẠI PHÒNG */}
                  <Box sx={{ bgcolor: "#f0f8f0", borderRadius: "12px", p: 2, border: "1px solid #98b720" }}>
                    <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
                      
                      {getBookingTypeIcon()}
                      <Typography fontSize="0.9rem" color="#98b720" fontWeight={600}>
                        {getBookingTypeLabel()}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Grid container mt={1} spacing={1}>
                      <Grid item xs={4}>
                        <Typography fontSize="0.75rem" color="#666">Nhận phòng</Typography>
                        <Typography fontWeight={600} fontSize="0.85rem" color="#333">
                          {formatCheckIn()}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ borderLeft: "1px solid #ccc", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Typography fontSize="0.75rem" color="#666">Trả phòng</Typography>
                        <Typography fontWeight={600} fontSize="0.85rem" color="#333">
                          {formatCheckOut()}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ borderLeft: "1px solid #ccc", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Typography fontSize="0.75rem" color="#666">
                          {type === "daily" ? "Số đêm" : "Số giờ"}
                        </Typography>
                        <Typography fontWeight={600} fontSize="0.85rem" color="#333">
                          {formatDuration()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* LỰA CHỌN CỦA BẠN */}
                  <Stack spacing={2}>
                    <Typography fontWeight={600} fontSize="1rem" color="#333">
                      Lựa chọn của bạn
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Box
                        component="img"
                        src={image || imgMain}
                        alt="room"
                        sx={{ width: 80, height: 80, borderRadius: "12px", objectFit: "cover" }}
                      />
                      <Stack spacing={0.2}>
                        <Typography fontWeight={600} fontSize="16px" color="rgba(93, 102, 121, 1)">
                          {hotelName}
                        </Typography>
                        <Typography fontSize="18px" fontWeight={500} color="rgba(43, 47, 56, 1)">
                          Deluxe room
                        </Typography>
                        <Typography fontSize="0.8rem" color="rgba(152, 159, 173, 1)">
                          {address}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>

              {/* NGƯỜI ĐẶT PHÒNG */}
              <Paper elevation={0} sx={{ borderRadius: "16px", bgcolor: "white", p: 2.5, border: "1px solid #e0e0e0", mt: 2 }}>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight={600} fontSize="1rem" color="#333">
                      Người đặt phòng
                    </Typography>
                    <IconButton size="small" onClick={() => setIsEditing(!isEditing)} sx={{ color: "#98b720" }}>
                      {isEditing ? <CheckIcon /> : <EditIcon />}
                    </IconButton>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontSize="0.9rem" color="#666" sx={{ minWidth: 80 }}>Số điện thoại</Typography>
                    <Typography fontWeight={600} color="#333">{phone}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontSize="0.9rem" color="#666" sx={{ minWidth: 80 }}>Họ tên</Typography>
                    <Box sx={{ position: "relative", width: 180 }}>
                      <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                        size="small"
                        disabled={!isEditing}
                        sx={{
                          width: "100%",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            border: isEditing ? "1px solid #98b720" : "none !important",
                            bgcolor: isEditing ? "#f0f8f0" : "transparent",
                            pr: 5,
                          },
                          "& .Mui-disabled": { bgcolor: "transparent", color: "#333", WebkitTextFillColor: "#333", border: "none" },
                        }}
                      />
                      {isEditing && (
                        <CheckIcon sx={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", color: "#98b720", fontSize: 20 }} />
                      )}
                    </Box>
                  </Stack>
                </Stack>
              </Paper>

              {/* ƯU ĐÃI */}
              <Paper elevation={0} sx={{ borderRadius: "16px", bgcolor: "white", p: 2.5, border: "1px solid #e0e0e0", mt: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <OfferIcon sx={{ fontSize: 20, color: "#98b720" }} />
                    <Typography fontWeight={600} color="#333">Ưu đãi</Typography>
                  </Stack>
                  <Typography fontSize="0.9rem" color="#98b720" sx={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => setOpenOfferModal(true)}>
                    Chọn ưu đãi
                  </Typography>
                </Stack>
              </Paper>
            </Grid>

            {/* CỘT PHẢI */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                {/* CHI TIẾT THANH TOÁN */}
                <Paper elevation={0} sx={{ borderRadius: "16px", bgcolor: "white", p: 2.5, border: "1px solid #e0e0e0" }}>
                  <Stack spacing={2}>
                    <Typography fontWeight={600} fontSize="1rem" color="#333">Chi tiết thanh toán</Typography>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography fontSize="0.9rem" color="#666">Tiền phòng</Typography>
                      <Typography color="#666">{formattedPrice}đ</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography fontSize="0.9rem" fontWeight={700} color="rgba(43, 47, 56, 1)">Tổng tiền thanh toán</Typography>
                      <Typography fontWeight={700} color="rgba(43, 47, 56, 1)" fontSize="1.1rem">
                        {formattedPrice}đ
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>

                {/* PHƯƠNG THỨC THANH TOÁN */}
                <Paper elevation={0} sx={{ borderRadius: "16px", bgcolor: "white", p: 2.5, border: "1px solid #e0e0e0" }}>
                  <Stack spacing={3}>
                    <Typography fontWeight={600} fontSize="1rem" color="#333">
                      Chọn phương thức thanh toán
                    </Typography>
                    <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1, px: 1 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box component="img" src={momo} alt="Momo" sx={{ width: 32, height: 32 }} />
                          <Typography fontWeight={600}>Ví Momo</Typography>
                        </Stack>
                        <Radio value="momo" size="small" />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1, px: 1 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box component="img" src={vnpay} alt="VN Pay" sx={{ width: 32, height: 32 }} />
                          <Typography fontWeight={600}>VN pay</Typography>
                        </Stack>
                        <Radio value="vnpay" size="small" />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ py: 1, px: 1 }}>
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                          <Box component="img" src={building} alt="Hotel" sx={{ width: 32, height: 32 }} />
                          <Stack spacing={0.5}>
                            <Typography fontWeight={600}>Trả tại khách sạn</Typography>
                            <Typography fontSize="0.8rem" color="#999" lineHeight={1.4}>
                              Khách sạn có thể hủy phòng tùy theo tình trạng phòng
                            </Typography>
                          </Stack>
                        </Stack>
                        <Radio value="hotel" size="small" />
                      </Stack>
                    </RadioGroup>
                  </Stack>
                </Paper>

                {/* CHÍNH SÁCH + NÚT THANH TOÁN */}
                <Stack direction="row" pt={3} justifyContent="space-between" alignItems="center">
                  <Typography
                    fontSize="16px"
                    fontWeight={600}
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                    color="rgba(43, 47, 56, 1)"
                    onClick={() => setOpenCancelPolicyModal(true)}
                  >
                    Chính sách hủy phòng
                  </Typography>
                  <Button
                    onClick={handleCreateBooking}
                    disabled={loading}
                    variant="contained"
                    sx={{
                      bgcolor: "#98b720",
                      color: "white",
                      borderRadius: "50px",
                      fontWeight: 600,
                      textTransform: "none",
                      py: 1.8,
                      fontSize: "1rem",
                      "&:hover": { bgcolor: "#7a9a1a" },
                      width: isMobile ? "100%" : "282px",
                    }}
                  >
                     {loading ? (
                  <>
                    <CircularProgress size={20} sx={{ color: "#fff", mr: 1 }} />
                    Thanh toán...
                  </>
                ) : (
                  "Thanh toán"
                )}
                   
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>

      {/* MODAL ƯU ĐÃI & CHÍNH SÁCH HỦY - GIỮ NGUYÊN 100% */}
      {/* (Không thay đổi gì, copy nguyên từ code cũ của bạn) */}
      <Modal open={openOfferModal} onClose={() => setOpenOfferModal(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: "90%", sm: 400 }, bgcolor: "white", borderRadius: "16px", boxShadow: 24, p: 3, maxHeight: "80vh", overflow: "auto" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography fontWeight={600} fontSize="1.1rem" color="#333">Chọn mã ưu đãi</Typography>
            <IconButton onClick={() => setOpenOfferModal(false)} size="small"><CloseIcon /></IconButton>
          </Stack>
          <Typography fontSize="0.85rem" color="#666" mb={3}>Mã ưu đãi sẵn có</Typography>
          <RadioGroup value={selectedOffer} onChange={(e) => setSelectedOffer(e.target.value)}>
            {offers.map((offer) => (
              <Paper key={offer.id} elevation={0} sx={{ borderRadius: "12px", border: "1px solid #e0e0e0", p: 2, mb: 2, bgcolor: selectedOffer === offer.id ? "#f0f8f0" : "white" }}>
                <FormControlLabel
                  value={offer.id}
                  control={<Radio size="small" />}
                  label={
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
                      <Box sx={{ bgcolor: "#98b720", color: "white", borderRadius: "8px", px: 1.5, py: 0.5, fontSize: "0.85rem", fontWeight: 600 }}>
                        {offer.discount}
                      </Box>
                      <Stack>
                        <Typography fontWeight={600} fontSize="0.9rem" color="#333">{offer.title}</Typography>
                        <Typography fontSize="0.8rem" color="#666">{offer.desc}</Typography>
                      </Stack>
                    </Stack>
                  }
                  sx={{ mx: -1.5, "& .MuiFormControlLabel-label": { flex: 1 } }}
                />
              </Paper>
            ))}
          </RadioGroup>
          <Button fullWidth variant="contained" sx={{ bgcolor: "#f5f5f5", color: "#666", borderRadius: "50px", fontWeight: 600, textTransform: "none", py: 1.5, mt: 2, "&:hover": { bgcolor: "#e0e0e0" } }} onClick={() => setOpenOfferModal(false)}>
            Áp dụng mã
          </Button>
        </Box>
      </Modal>

      <Modal open={openCancelPolicyModal} onClose={() => setOpenCancelPolicyModal(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: "90%", sm: 750 }, bgcolor: "white", borderRadius: "16px", boxShadow: 24, p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography fontWeight={600} fontSize="1.1rem" color="#333">Chính sách hủy phòng</Typography>
            <IconButton onClick={() => setOpenCancelPolicyModal(false)} size="small"><CloseIcon /></IconButton>
          </Stack>
          <Stack spacing={2} sx={{ fontSize: "0.9rem", color: "#666", lineHeight: 1.6 }}>
            <Typography>Hủy miễn phí trước <strong>10:05, {checkIn ? dayjs(checkIn).format("D/M/YYYY") : "ngày nhận phòng"}</strong> đối với tất cả các phương thức thanh toán</Typography>
            <Typography>Gợi ý nhỏ: hãy lựa chọn phương thức thanh toán để xem chi tiết chính sách nhé</Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography fontSize="14px">
                Xem thêm <Typography component="span" color="#98b720" sx={{ textDecoration: "underline", cursor: "pointer" }}>Điều khoản và chính sách đặt phòng</Typography>
              </Typography>
              <Typography fontSize="14px">
                Dịch vụ hỗ trợ khách hàng - <Typography component="span" color="#98b720" sx={{ textDecoration: "underline", cursor: "pointer" }}>Liên hệ ngay</Typography>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default CheckOutView;