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
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  LocalOffer as OfferIcon,
  Close as CloseIcon,
  CheckCircle as CheckIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import imgMain from "../../images/Rectangle 12.png";
import vnpay from "../../images/Frame 1321317955.png";
import momo from "../../images/Rectangle 30024.png";
import building from "../../images/building.png";

const CheckOutView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [openCancelPolicyModal, setOpenCancelPolicyModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

  // Edit user state
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState("+84 123456789");
  const [name, setName] = useState("Thangdv");

  const offers = [
    {
      id: "1",
      discount: "15K",
      title: "Super sale - quà 50% cho thành viên mới đăng ký",
      desc: "Giảm tới 50% 50k",
    },
    {
      id: "2",
      discount: "15K",
      title: "Super sale - quà 50% cho thành viên mới đăng ký",
      desc: "Giảm tới 50% 50k",
    },
    {
      id: "3",
      discount: "15K",
      title: "Super sale - quà 50% cho thành viên mới đăng ký",
      desc: "Giảm tới 50% 50k",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f9f9f9",  py: { xs: 2, md: 6 } }}>
      <Container maxWidth='lg'>
        <Stack spacing={3}>
          {/* HEADER */}
          <Stack direction='row' alignItems='center' spacing={1}>
            <IconButton size='small'>
              <ArrowBackIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <Typography fontWeight={600} fontSize='1.1rem' color='#333'>
              Xác nhận thanh toán
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            {/* CỘT TRÁI */}
            <Grid item xs={12} md={6}>
              {/* BOOKING SUMMARY */}
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "16px",
                  bgcolor: "white",
                  p: 2.5,
                  border: "1px solid #e0e0e0",
                  height: "max-content",
                }}>
                <Stack spacing={2.5}>
                  {/* LOẠI PHÒNG */}
                  <Box
                    sx={{
                      bgcolor: "#f0f8f0",
                      borderRadius: "12px",
                      p: 2,
                      border: "1px solid #98b720",
                    }}>
                    <Stack
                      direction='row'
                      alignItems='center'
                      spacing={1}
                      mb={1.5}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          bgcolor: "#98b720",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                        <Typography
                          fontSize='0.7rem'
                          color='white'
                          fontWeight={600}>
                          S
                        </Typography>
                      </Box>
                      <Typography
                        fontSize='0.9rem'
                        color='#98b720'
                        fontWeight={600}>
                        Theo giờ
                      </Typography>
                    </Stack>
                    <Divider />
                    <Grid container mt={1} spacing={1}>
                      <Grid item xs={4}>
                        <Typography fontSize='0.75rem' color='#666'>
                          Nhận phòng
                        </Typography>
                        <Typography
                          fontWeight={600}
                          fontSize='0.85rem'
                          color='#333'>
                          10:00, 4/11
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        sx={{
                          borderLeft: "1px solid #ccc",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        xs={4}>
                        <Typography fontSize='0.75rem' color='#666'>
                          Trả phòng
                        </Typography>
                        <Typography
                          fontWeight={600}
                          fontSize='0.85rem'
                          color='#333'>
                          12:00, 4/11
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        sx={{
                          borderLeft: "1px solid #ccc",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        xs={4}>
                        <Typography fontSize='0.75rem' color='#666'>
                          Số giờ
                        </Typography>
                        <Typography
                          fontWeight={600}
                          fontSize='0.85rem'
                          color='#333'>
                          02
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* LỰA CHỌN CỦA BẠN */}
                  <Stack spacing={2}>
                    <Typography fontWeight={600} fontSize='1rem' color='#333'>
                      Lựa chọn của bạn
                    </Typography>
                    <Stack direction='row' spacing={2} alignItems='flex-start'>
                      <Box
                        component='img'
                        src={imgMain}
                        alt='room'
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: "12px",
                          objectFit: "cover",
                        }}
                      />
                      <Stack spacing={0.2}>
                        <Typography
                          fontWeight={600}
                          fontSize='16px'
                          color='rgba(93, 102, 121, 1)'>
                          Hoàng gia Luxury hotel
                        </Typography>
                        <Typography
                          fontSize='18px'
                          fontWeight={500}
                          color='rgba(43, 47, 56, 1)'>
                          Deluxe room
                        </Typography>
                        <Typography
                          fontSize='0.8rem'
                          color='rgba(152, 159, 173, 1)'>
                          Số 22 Đường Phạm Văn Bạch, Phường Yên Hòa, Cầu...
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>

              {/* NGƯỜI ĐẶT PHÒNG - INLINE EDIT */}
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "16px",
                  bgcolor: "white",
                  p: 2.5,
                  border: "1px solid #e0e0e0",
                  mt: 2,
                }}>
                <Stack spacing={2}>
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'>
                    <Typography fontWeight={600} fontSize='1rem' color='#333'>
                      Người đặt phòng
                    </Typography>
                    <IconButton
                      size='small'
                      onClick={() => setIsEditing(!isEditing)}
                      sx={{ color: "#98b720" }}>
                      {isEditing ? <CheckIcon /> : <EditIcon />}
                    </IconButton>
                  </Stack>

                  {/* SỐ ĐIỆN THOẠI */}
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'>
                    <Typography
                      fontSize='0.9rem'
                      color='#666'
                      sx={{ minWidth: 80 }}>
                      Số điện thoại
                    </Typography>
                    {false ? (
                      <TextField
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        variant='outlined'
                        size='small'
                        sx={{
                          width: 180,
                          "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                        }}
                      />
                    ) : (
                      <Typography fontWeight={600} color='#333'>
                        {phone}
                      </Typography>
                    )}
                  </Stack>

                  {/* HỌ TÊN */}
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'>
                    <Typography
                      fontSize='0.9rem'
                      color='#666'
                      sx={{ minWidth: 80 }}>
                      Họ tên
                    </Typography>
                    <Box sx={{ position: "relative", width: 180 }}>
                      <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant='outlined'
                        size='small'
                        disabled={!isEditing}
                        sx={{
                          width: "100%",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            border: isEditing
                              ? "1px solid #98b720"
                              : "none !important",
                            bgcolor: isEditing ? "#f0f8f0" : "transparent",
                            pr: 5,
                          },
                          "& .Mui-disabled": {
                            bgcolor: "transparent",
                            color: "#333",
                            WebkitTextFillColor: "#333",
                            border: "none",
                          },
                        }}
                      />
                      {isEditing && (
                        <CheckIcon
                          sx={{
                            position: "absolute",
                            right: 8,
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#98b720",
                            fontSize: 20,
                          }}
                        />
                      )}
                    </Box>
                  </Stack>
                </Stack>
              </Paper>

              {/* ƯU ĐÃI */}
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "16px",
                  bgcolor: "white",
                  p: 2.5,
                  border: "1px solid #e0e0e0",
                  mt: 2,
                }}>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <OfferIcon sx={{ fontSize: 20, color: "#98b720" }} />
                    <Typography fontWeight={600} color='#333'>
                      Ưu đãi
                    </Typography>
                  </Stack>
                  <Typography
                    fontSize='0.9rem'
                    color='#98b720'
                    sx={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => setOpenOfferModal(true)}>
                    Chọn ưu đãi
                  </Typography>
                </Stack>
              </Paper>
            </Grid>

            {/* CỘT PHẢI */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                {/* CHI TIẾT THANH TOÁN */}
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: "16px",
                    bgcolor: "white",
                    p: 2.5,
                    border: "1px solid #e0e0e0",
                  }}>
                  <Stack spacing={2}>
                    <Typography fontWeight={600} fontSize='1rem' color='#333'>
                      Chi tiết thanh toán
                    </Typography>
                    <Stack direction='row' justifyContent='space-between'>
                      <Typography fontSize='0.9rem' color='#666'>
                        Tiền phòng
                      </Typography>
                      <Typography color='#666'>160.000đ</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction='row' justifyContent='space-between'>
                      <Typography
                        fontSize='0.9rem'
                        fontWeight={700}
                        color='rgba(43, 47, 56, 1)'>
                        Tổng tiền thanh toán
                      </Typography>
                      <Typography
                        fontWeight={700}
                        color='rgba(43, 47, 56, 1)'
                        fontSize='1.1rem'>
                        160.000đ
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>

                {/* PHƯƠNG THỨC THANH TOÁN */}
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: "16px",
                    bgcolor: "white",
                    p: 2.5,
                    border: "1px solid #e0e0e0",
                  }}>
                  <Stack spacing={3}>
                    <Typography fontWeight={600} fontSize='1rem' color='#333'>
                      Chọn phương thức thanh toán
                    </Typography>
                    <RadioGroup
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}>
                      <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={{ py: 1, px: 1 }}>
                        <Stack direction='row' spacing={2} alignItems='center'>
                          <Box
                            component='img'
                            src={momo}
                            alt='Momo'
                            sx={{ width: 32, height: 32 }}
                          />
                          <Typography fontWeight={600}>Ví Momo</Typography>
                        </Stack>
                        <Radio value='momo' size='small' />
                      </Stack>
                      <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={{ py: 1, px: 1 }}>
                        <Stack direction='row' spacing={2} alignItems='center'>
                          <Box
                            component='img'
                            src={vnpay}
                            alt='VN Pay'
                            sx={{ width: 32, height: 32 }}
                          />
                          <Typography fontWeight={600}>VN pay</Typography>
                        </Stack>
                        <Radio value='vnpay' size='small' />
                      </Stack>
                      <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='flex-start'
                        sx={{ py: 1, px: 1 }}>
                        <Stack
                          direction='row'
                          spacing={2}
                          alignItems='flex-start'>
                          <Box
                            component='img'
                            src={building}
                            alt='Hotel'
                            sx={{ width: 32, height: 32 }}
                          />
                          <Stack spacing={0.5}>
                            <Typography fontWeight={600}>
                              Trả tại khách sạn
                            </Typography>
                            <Typography
                              fontSize='0.8rem'
                              color='#999'
                              lineHeight={1.4}>
                              Khách sạn có thể hủy phòng tùy theo tình trạng
                              phòng
                            </Typography>
                          </Stack>
                        </Stack>
                        <Radio value='hotel' size='small' />
                      </Stack>
                    </RadioGroup>
                  </Stack>
                </Paper>

                {/* CHÍNH SÁCH + NÚT THANH TOÁN */}
                <Stack
                  direction='row'
                  pt={3}
                  justifyContent='space-between'
                  alignItems='center'>
                  <Typography
                    fontSize='16px'
                    fontWeight={600}
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                    color='rgba(43, 47, 56, 1)'
                    onClick={() => setOpenCancelPolicyModal(true)}>
                    Chính sách hủy phòng
                  </Typography>
                  <Button
                    variant='contained'
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
                    }}>
                    Thanh toán
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>

      {/* MODAL ƯU ĐÃI */}
      <Modal open={openOfferModal} onClose={() => setOpenOfferModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "white",
            borderRadius: "16px",
            boxShadow: 24,
            p: 3,
            maxHeight: "80vh",
            overflow: "auto",
          }}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            mb={2}>
            <Typography fontWeight={600} fontSize='1.1rem' color='#333'>
              Chọn mã ưu đãi
            </Typography>
            <IconButton onClick={() => setOpenOfferModal(false)} size='small'>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Typography fontSize='0.85rem' color='#666' mb={3}>
            Mã ưu đãi sẵn có
          </Typography>
          <RadioGroup
            value={selectedOffer}
            onChange={(e) => setSelectedOffer(e.target.value)}>
            {offers.map((offer) => (
              <Paper
                key={offer.id}
                elevation={0}
                sx={{
                  borderRadius: "12px",
                  border: "1px solid #e0e0e0",
                  p: 2,
                  mb: 2,
                  bgcolor: selectedOffer === offer.id ? "#f0f8f0" : "white",
                }}>
                <FormControlLabel
                  value={offer.id}
                  control={<Radio size='small' />}
                  label={
                    <Stack
                      direction='row'
                      spacing={2}
                      alignItems='center'
                      sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          bgcolor: "#98b720",
                          color: "white",
                          borderRadius: "8px",
                          px: 1.5,
                          py: 0.5,
                          fontSize: "0.85rem",
                          fontWeight: 600,
                        }}>
                        {offer.discount}
                      </Box>
                      <Stack>
                        <Typography
                          fontWeight={600}
                          fontSize='0.9rem'
                          color='#333'>
                          {offer.title}
                        </Typography>
                        <Typography fontSize='0.8rem' color='#666'>
                          {offer.desc}
                        </Typography>
                      </Stack>
                    </Stack>
                  }
                  sx={{ mx: -1.5, "& .MuiFormControlLabel-label": { flex: 1 } }}
                />
              </Paper>
            ))}
          </RadioGroup>
          <Button
            fullWidth
            variant='contained'
            sx={{
              bgcolor: "#f5f5f5",
              color: "#666",
              borderRadius: "50px",
              fontWeight: 600,
              textTransform: "none",
              py: 1.5,
              mt: 2,
              "&:hover": { bgcolor: "#e0e0e0" },
            }}
            onClick={() => setOpenOfferModal(false)}>
            Áp dụng mã
          </Button>
        </Box>
      </Modal>

      {/* MODAL CHÍNH SÁCH HỦY PHÒNG */}
      <Modal
        open={openCancelPolicyModal}
        onClose={() => setOpenCancelPolicyModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 750 },
            bgcolor: "white",
            borderRadius: "16px",
            boxShadow: 24,
            p: 3,
          }}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            mb={2}>
            <Typography fontWeight={600} fontSize='1.1rem' color='#333'>
              Chính sách hủy phòng
            </Typography>
            <IconButton
              onClick={() => setOpenCancelPolicyModal(false)}
              size='small'>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack
            spacing={2}
            sx={{ fontSize: "0.9rem", color: "#666", lineHeight: 1.6 }}>
            <Typography>
              Hủy miễn phí trước <strong>10:05, 4/11/2025</strong> đối với tất
              cả các phương thức thanh toán
            </Typography>
            <Typography>
              Gợi ý nhỏ: hãy lựa chọn phương thức thanh toán để xem chi tiết
              chính sách nhé
            </Typography>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography fontSize={"14px"}>
                Xem thêm{" "}
                <Typography
                  component='span'
                  color='#98b720'
                  sx={{ textDecoration: "underline", cursor: "pointer" }}>
                  Điều khoản và chính sách đặt phòng
                </Typography>
              </Typography>
              <Typography fontSize={"14px"}>
                Dịch vụ hỗ trợ khách hàng -
                <Typography
                  component='span'
                  color='#98b720'
                  sx={{ textDecoration: "underline", cursor: "pointer" }}>
                  Liên hệ ngay
                </Typography>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default CheckOutView;
