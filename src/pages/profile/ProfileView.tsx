"use client";

import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  Close,
} from "@mui/icons-material";
import image_room from "../../images/Rectangle 29975.png";
import logout from "../../images/logout2.png";
import success from "../../images/15. Hotel.png";
import cancel from "../../images/cancel.png";
import pending from "../../images/pending.png";
import pendingpayment from "../../images/pendingpayment.png";
import Account from "./Account";
import AccountSettingsPage from "./AccountSetting";
import MyBookingsPage from "./MyBookingsPage";
import dayjs from "dayjs";
import { cancelBooking } from "../../service/booking";
import { toast } from "react-toastify";
const ProfileView = ({ historyBooking, getHistoryBooking, hastag }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Hồ sơ của tôi");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [detailBooking, setDetailBooking] = useState(null);
  const menuItems = [
    { text: "Hồ sơ của tôi", icon: <PersonIcon />, active: false },
    { text: "Thiết lập tài khoản", icon: <SettingsIcon />, active: false },
    { text: "Đặt phòng của tôi", icon: <RoomIcon />, active: true },
    { text: "Đăng xuất", icon: <LogoutIcon />, active: false },
  ];
  useEffect(() => {
    if (detailBooking) {
      setDetailBooking(
        historyBooking.find(
          (item) => item.booking_id == detailBooking.booking_id
        )
      );
    }
  }, [historyBooking]);
  const handleClickItemMenu = (active) => {
    setActiveMenu(active);
  };
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
        <List disablePadding sx={{ cursor: "pointer" }}>
          {menuItems.map((item) => (
            <>
              {item.text == "Đăng xuất" && <Divider sx={{ my: 2 }} />}
              <ListItem
                onClick={
                  item.text == "Đăng xuất"
                    ? () => setDeleteDialogOpen(true)
                    : () => handleClickItemMenu(item.text)
                }
                key={item.text}
                disablePadding
                sx={{
                  borderRadius: "12px",
                  mb: 1,
                  bgcolor: activeMenu == item.text ? "#f0f8f0" : "transparent",
                  border:
                    activeMenu == item.text ? "1px solid #98b720" : "none",
                  px: 1,
                  py: 1,
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color:
                      activeMenu == item.text
                        ? "rgba(152, 183, 32, 1)"
                        : "#999",
                  }}>
                  {React.cloneElement(item.icon, { fontSize: "small" })}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      fontWeight={activeMenu == item.text ? 600 : 500}
                      fontSize='0.9rem'
                      color={
                        activeMenu == item.text
                          ? "rgba(152, 183, 32, 1)"
                          : "#666"
                      }>
                      {item.text}
                    </Typography>
                  }
                />
              </ListItem>
            </>
          ))}
        </List>
      </Stack>
    </Paper>
  );

  const MainContent = () => {
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
      ? JSON.parse(detailBooking.rooms[0].images)
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

    // Trạng thái thanh toán
    const payment = detailBooking.payments?.[0];
    const paymentStatus = payment
      ? payment.status === "success"
        ? "Đã thanh toán"
        : payment.status === "failed"
        ? "Thanh toán thất bại"
        : "Chưa thanh toán"
      : "Trả tại khách sạn";

    const paymentMethodLabel = payment?.method
      ? payment.method === "momo"
        ? "Ví MoMo"
        : payment.method === "vnpay"
        ? "VNPay"
        : "Trả tại khách sạn"
      : "Trả tại khách sạn";

    const totalPrice = Number(detailBooking.total_price || 0).toLocaleString(
      "vi-VN"
    );

    // Copy mã đặt phòng
    const handleCopyCode = () => {
      navigator.clipboard.writeText(detailBooking.booking_code);
      alert("Đã sao chép mã đặt phòng!");
    };
    const getBookingNameStatus = (detailBooking: any) => {
      const paymentStatus = detailBooking.payments?.[0]?.status;
      const bookingStatus = detailBooking.status;

      if (bookingStatus === "checked_out") {
        return "Đặt lại";
      }
      if (bookingStatus === "cancelled") {
        return "Đặt lại";
      }
      if (bookingStatus === "confirmed" && paymentStatus === "paid") {
        return "Hủy đặt phòng";
      }

      if (
        paymentStatus === "failed" ||
        paymentStatus === "pending" ||
        bookingStatus === "pending"
      ) {
        return "Tiếp tục thành toán";
      }
    };
    const handleSubmit = async () => {
      try {
        if (getBookingNameStatus(detailBooking) == "Hủy đặt phòng") {
          let result = await cancelBooking(detailBooking.booking_id);
          if (result?.code == "OK") {
            toast.success(result?.message);
            getHistoryBooking();
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <Stack spacing={3}>
        {/* HEADER */}
        <Stack direction='row' alignItems='center' spacing={1}>
          <IconButton
            size='small'
            onClick={() =>
              isMobile ? setDrawerOpen(true) : setDetailBooking(false)
            }>
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
          detailBooking?.payments?.[0]?.status == "paid" && (
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
          (detailBooking?.payments?.[0]?.status == "failed" ||
            detailBooking?.payments?.[0]?.status == "pending") && (
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
                  Tiếp tục thành toán
                </Button>
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
                <CheckCircleIcon sx={{ fontSize: 16, color: "#98b720" }} />
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
                <IconButton
                  size='small'
                  onClick={handleCopyCode}
                  sx={{ color: "#98b720", p: 0.5 }}>
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
                color={payment?.status === "success" ? "#98b720" : "#ff4444"}
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
            onClick={() => {
              handleSubmit();
            }}
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
            {getBookingNameStatus(detailBooking)}
          </Button>
        </Stack>
      </Stack>
    );
  };
  console.log("AAAA historyBooking", historyBooking);
  return (
    <Box sx={{ bgcolor: "#f9f9f9", py: { xs: 2, md: 3 } }}>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth='xs'
        fullWidth
        PaperProps={{
          sx: { borderRadius: "16px" },
        }}>
        <DialogTitle sx={{ textAlign: "center", pt: 4, pb: 1 }}>
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                bgcolor: "#ffebee",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}>
              <img src={logout} alt='' />
            </Box>
            <IconButton
              onClick={() => setDeleteDialogOpen(false)}
              sx={{ position: "absolute", top: -40, left: -30 }}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center", px: 4, pb: 3 }}>
          <Typography fontWeight={600} fontSize='18px' mb={1}>
            Đăng xuất tài khoản?
          </Typography>
          <Typography fontSize='14px' color='#666'>
            Bạn có chắc muốn đăng xuất không?
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            pb: 4,
            gap: 2,
            flexDirection: "column",
          }}>
          <Button
            onClick={() => setDeleteDialogOpen(true)}
            variant='contained'
            sx={{
              borderRadius: "24px",
              textTransform: "none",
              bgcolor: "#98b720",
              "&:hover": { bgcolor: "#8ab020" },
              width: "100%",
            }}>
            Đồng ý
          </Button>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            variant='outlined'
            sx={{
              borderRadius: "24px",
              textTransform: "none",
              borderColor: "#ddd",
              color: "#666",
              width: "100%",
              ml: "0px !important",
            }}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </Dialog>
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
              {detailBooking && (
                <MainContent setDetailBooking={setDetailBooking} />
              )}
              {activeMenu == "Hồ sơ của tôi" && <Account />}
              {activeMenu == "Thiết lập tài khoản" && <AccountSettingsPage />}
              {activeMenu == "Đặt phòng của tôi" && !detailBooking && (
                <MyBookingsPage
                  historyBooking={historyBooking}
                  setDetailBooking={setDetailBooking}
                  getHistoryBooking={getHistoryBooking}
                  hastag={hastag}
                />
              )}
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ProfileView;
