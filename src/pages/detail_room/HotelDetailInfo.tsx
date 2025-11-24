"use client";

import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Grid,
  Paper,
  Button,
  Modal,
  IconButton,
  LinearProgress,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  AcUnit as AcIcon,
  Wifi as WifiIcon,
  Bathtub as BathIcon,
  Weekend as SofaIcon,
  Pool as PoolIcon,
  Star as StarIcon,
  Close as CloseIcon,
  Bathtub,
} from "@mui/icons-material";
import start from "../../images/star.svg"
interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  content: string;
}



const HotelDetailInfo = ({ info, reviews }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openModal, setOpenModal] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedReviews((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        sx={{
          fontSize: 14,
          color: i < Math.floor(rating) ? "#98b720" : "#e0e0e0",
        }}
      />
    ));
  };
  const avgRate =
  reviews.reduce((acc, r) => acc + r.rate, 0) / (reviews.length || 1);
  const starCounts = [5, 4, 3, 2, 1].map((star) =>
  reviews.filter((r) => r.rate === star).length
);
  return (
    <Box sx={{ py: { xs: 2, md: 4 } }}>
      <Stack spacing={5} sx={{ mx: "auto" }}>
        {/* === 1. GIỚI THIỆU KHÁCH SẠN === */}
        <Stack spacing={2}>
          <Typography fontWeight={600} fontSize='1.1rem' color='#333'>
            Giới thiệu khách sạn
          </Typography>
          <Typography fontSize='0.95rem' color='#666' lineHeight={1.7}>
            {info?.description?.vi}
            <Typography
              component='span'
              color='#98b720'
              sx={{ cursor: "pointer", textDecoration: "underline" }}>
              Xem thêm
            </Typography>
          </Typography>
        </Stack>

        {/* === 2. TIỆN ÍCH KHÁCH SẠN === */}
        <Stack spacing={3}>
          <Typography fontWeight={600} fontSize='1.1rem' color='#333'>
            Tiện ích khách sạn
          </Typography>
          <Grid container spacing={2}>
            {[
              { icon: <AcIcon />, label: "Điều hòa" },
              { icon: <WifiIcon />, label: "Wifi" },
              { icon: <Bathtub />, label: "Bồn tắm" },
              { icon: <SofaIcon />, label: "Thang máy" },
              { icon: <PoolIcon />, label: "Bể bơi" },
            ].map((item, i) => (
              <Box display={"flex"} key={i}>
                <Stack
                  direction='row'
                  alignItems='center'
                  flexDirection={"column"}
                  justifyContent={"center"}
                  gap={"8px"}
                  sx={{
                    bgcolor: "#f9f9f9",
                    borderRadius: "12px",
                    p: i == 0 ? 0 : 2,
                    pr: i == 0 ? 2 : 2,
                  }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      bgcolor: "white",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                    }}>
                    {React.cloneElement(item.icon as React.ReactElement, {
                      sx: { fontSize: 25, color: "#98b720" },
                    })}
                  </Box>
                  <Typography fontSize='0.9rem' color='#666'>
                    {item.label}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Grid>
        </Stack>

        {/* === 3. ĐÁNH GIÁ === */}
        <Stack spacing={4}>
          <Typography fontWeight={600} fontSize='1.1rem' color='#333'>
            Đánh giá
          </Typography>

          {/* TỔNG ĐIỂM */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px",
              py: 3,
              bgcolor: "#f9f9f9",
              px: 0,
            }}>
            <Grid container alignItems="start">
              {/* Tổng điểm */}
              <Grid item xs={12} md={6}>
                <Box display={"flex"} gap={2}>
                  <Box
                    sx={{
                      bgcolor: "#98b720",
                      color: "white",
                      borderRadius: "12px",
                      px: 3,
                      py: 1.5,
                      fontSize: "2rem",
                      fontWeight: 700,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h2">{avgRate.toFixed(1)}</Typography>
                  </Box>
                  <Box>
                    <Typography
                      fontWeight={600}
                      fontSize="1.4rem"
                      color="rgba(152, 183, 32, 1)"
                    >
                      Xuất sắc
                    </Typography>
                    <Typography fontSize="0.85rem" color="rgba(43, 47, 56, 1)">
                      Từ {reviews.length} đánh giá
                    </Typography>
                    <Typography fontSize="0.8rem" color="#999">
                      Bởi người dùng trong Booking Hotel
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Biểu đồ rating */}
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  {[5, 4, 3, 2, 1].map((star, idx) => (
                    <Stack
                      key={star}
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <Typography width={40} fontSize="0.9rem" display={"flex"} alignItems={"center"} gap={1} color="#666">
                        {star}  <img src={start} alt="" />
                      </Typography>
                      <Box sx={{ flex: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={starCounts[idx]}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: "#e0e0e0",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: "#98b720",
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>
                      <Typography fontWeight={600} fontSize="0.9rem" color="#98b720">
                        {starCounts[idx]}/100
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Paper>

          {/* DANH SÁCH REVIEW */}
          <Grid container justifyContent={"space-between"}>
            {reviews.map((review) => {
              const isExpanded = expandedReviews.includes(review.created_at);
              const shortContent = review.comment.slice(0, 120) + "...";
              return (
                <Grid item xs={12} md={3.8} key={review.id}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: "16px",
                      p: 2.5,
                      border: "1px solid #eee",
                      bgcolor: "white",
                    }}>
                    <Stack spacing={1.5}>
                      <Stack
                        direction='row'
                        spacing={1.5}
                        justifyContent={"space-between"}
                        alignItems='center'>
                        <img src={review?.avatar} width={40} height={40} style={{ borderRadius: "50%" }} alt="" />
                        <Box
                          display={"flex"}
                          width={"90%"}
                          justifyContent={"space-between"}>
                          <Box>
                            <Typography
                              fontWeight={600}
                              fontSize='0.95rem'
                              color='#333'>
                              {review.user_name}
                            </Typography>
                            <Stack direction='row' spacing={0.5}>
                              {renderStars(review.rate)}
                            </Stack>
                          </Box>

                          <Typography fontSize='0.75rem' color='#999'>
                            {review.created_at}
                          </Typography>
                        </Box>
                      </Stack>

                      <Typography
                        fontSize='0.9rem'
                        color='#666'
                        lineHeight={1.6}
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: isExpanded ? "unset" : 3,
                          WebkitBoxOrient: "vertical",
                        }}>
                        {review.comment}
                      </Typography>


                    </Stack>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
            {reviews.length &&
          <Button
            variant='outlined'
            sx={{
              borderColor: "#98b720",
              color: "#98b720",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              mt: 3,
              px: 2,
              py: 1,
              alignSelf: "flex-start",
              "&:hover": { borderColor: "#7a9a1a", bgcolor: "#f0f8f0" },
            }}
            onClick={() => setOpenModal(true)}>
            Show All 100 Reviews
          </Button>}
        </Stack>

        {/* === 4. CHÍNH SÁCH NHẬN - TRẢ PHÒNG === */}
        <Stack spacing={3}>
          <Typography fontWeight={600} fontSize='1.1rem' color='#333'>
            Chính sách nhận - trả phòng
          </Typography>
          <Grid container>
            {[
              info?.rent_types?.hourly && { label: "Theo giờ", time: `${info?.rent_types?.hourly.from} - ${info?.rent_types?.hourly.to}` },
              info?.rent_types?.overnight && { label: "Qua đêm", time: `${info?.rent_types?.overnight.from} - ${info?.rent_types?.overnight.to}` },
              info?.rent_types?.daily && { label: "Theo ngày", time: `${info?.rent_types?.daily.from} - ${info?.rent_types?.daily.to}` },
            ].filter(Boolean).map((item) => (
              <Grid item xs={12} sm={2} key={item.label}>
                <Stack>
                  <Typography fontWeight={600} color='#333'>
                    {item.label}
                  </Typography>
                  <Typography fontSize='0.9rem' color='#666' mt={0.5}>
                    {item.time}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
          <Typography fontSize='0.85rem' color='#999'>
            Lưu ý: việc hủy phòng sẽ tuân theo quy định riêng của từng loại
            phòng
          </Typography>
        </Stack>

        {/* === 5. CHÍNH SÁCH KHÁCH SẠN === */}
        <Stack spacing={2}>
          <Typography fontWeight={600} fontSize='1.1rem' color='#333'>
            Chính sách khách sạn
          </Typography>
          <Typography fontSize='0.9rem' color='#666' lineHeight={1.7}>
            <strong>Check-in/out :</strong> Check-in: từ 14:00 - Check-out:
            12:00 - Nhận phòng sớm: tùy thuộc vào tình trạng phòng. <br />
            <strong>Chính sách trả phòng muộn:</strong> Trả phòng trễ tùy thuộc
            vào tình trạng phòng - Quý khách vui lòng liên hệ lễ tân khi có nhu
            cầu trả phòng trễ - Sau 17:00 trả phòng: Phụ phí giá phòng 100%
          </Typography>
        </Stack>

        {/* === MODAL ĐÁNH GIÁ === */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            className='hidden-add-voice'
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "95%", sm: 700 },
              maxHeight: "90vh",
              bgcolor: "white",
              borderRadius: "16px",
              boxShadow: 24,
              p: 4,
              overflow: "auto",
            }}>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              mb={3}>
              <Typography fontWeight={700} fontSize='1.25rem' color='#333'>
                Đánh giá
              </Typography>
              <IconButton onClick={() => setOpenModal(false)}>
                <CloseIcon />
              </IconButton>
            </Stack>

            {/* TỔNG ĐIỂM */}
            <Paper elevation={0} sx={{ borderRadius: "12px", p: 3, mb: 3 }}>
              <Grid container spacing={3}>
                <Grid container alignItems='start' justifyContent={"space-between"}>
                <Grid item xs={12} md={5}>
                <Box display={"flex"} gap={2}>
                  <Box
                    sx={{
                      bgcolor: "#98b720",
                      color: "white",
                      borderRadius: "12px",
                      px: 3,
                      py: 1.5,
                      fontSize: "2rem",
                      fontWeight: 700,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h2">{avgRate.toFixed(1)}</Typography>
                  </Box>
                  <Box>
                    <Typography
                      fontWeight={600}
                      fontSize="1.4rem"
                      color="rgba(152, 183, 32, 1)"
                    >
                      Xuất sắc
                    </Typography>
                    <Typography fontSize="0.85rem" color="rgba(43, 47, 56, 1)">
                      Từ {reviews.length} đánh giá
                    </Typography>
                    <Typography fontSize="0.8rem" color="#999">
                      Bởi người dùng trong Booking Hotel
                    </Typography>
                  </Box>
                </Box>
              </Grid>

                  <Grid item xs={12} md={7}>
                <Stack spacing={2}>
                  {[5, 4, 3, 2, 1].map((star, idx) => (
                    <Stack
                      key={star}
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <Typography width={40} fontSize="0.9rem" display={"flex"} alignItems={"center"} gap={1} color="#666">
                        {star}  <img src={start} alt="" />
                      </Typography>
                      <Box sx={{ flex: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={starCounts[idx]}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: "#e0e0e0",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: "#98b720",
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>
                      <Typography fontWeight={600} fontSize="0.9rem" color="#98b720">
                        {starCounts[idx]}/100
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
                </Grid>
              </Grid>
            </Paper>

            {/* DANH SÁCH REVIEW */}
            <Stack spacing={3}>
              {reviews.map((review) => (
                <Paper
                  key={review.id}
                  elevation={0}
                  sx={{ p: 3, borderRadius: "12px", border: "1px solid #eee" }}>
                  <Stack direction='row' spacing={2} alignItems='center' mb={1}>
                    <img src={review?.avatar} width={40} height={40} style={{ borderRadius: "50%" }} alt="" />
                    <Box>
                      <Typography fontWeight={600}>{review.user_name}</Typography>
                      <Typography fontSize='0.8rem' color='#999'>
                        {review.date}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }} />
                    <Stack direction='row' spacing={0.3}>
                      {renderStars(review.rate)}
                    </Stack>
                  </Stack>
                  <Typography fontSize='0.9rem' color='#666' lineHeight={1.6}>
                    {review.comment}
                  </Typography>
                </Paper>
              ))}
            </Stack>

            <Button
              fullWidth
              variant='outlined'
              sx={{
                mt: 3,
                borderColor: "#98b720",
                color: "#98b720",
                borderRadius: "50px",
                py: 1.5,
                textTransform: "none",
              }}>
              Show All 100 Reviews
            </Button>
          </Box>
        </Modal>
      </Stack>
    </Box>
  );
};

export default HotelDetailInfo;
