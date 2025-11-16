"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Stack,
  Typography,
  Grid,
  Paper,
  Skeleton,
  useTheme,
  useMediaQuery,
  Chip,
  Button,
  IconButton,
  Divider,
  Modal,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Wifi as WifiIcon,
  AcUnit as AcIcon,
  Tv as TvIcon,
  Favorite as HeartIcon,
  Bathtub as BathIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// Mock ảnh
import img1 from "../../images/Rectangle 13.png";
import img2 from "../../images/Rectangle 14.png";
import img3 from "../../images/Rectangle 7.png";
import vn from "../../images/VN - Vietnam.png";
interface Room {
  id: number;
  name: string;
  type: string;
  images: string[];
  amenities: string[];
  price: number;
  remaining: number | null; // null = hết phòng
}

const rooms: Room[] = [
  {
    id: 1,
    name: "Deluxe room",
    type: "1 Giường đôi",
    images: [img1, img2, img3, img1],
    amenities: ["Wifi", "Điều hòa", "Smart TV", "Ghế tình yêu", "Bồn tắm"],
    price: 160000,
    remaining: 3,
  },
  {
    id: 2,
    name: "Deluxe room",
    type: "1 Giường đôi",
    images: [img2, img3, img1, img2],
    amenities: ["Wifi", "Điều hòa", "Smart TV", "Ghế tình yêu", "Bồn tắm"],
    price: 160000,
    remaining: 1,
  },
  {
    id: 3,
    name: "Deluxe room",
    type: "1 Giường đôi",
    images: [img3, img1, img2, img3],
    amenities: ["Wifi", "Điều hòa", "Smart TV", "Ghế tình yêu", "Bồn tắm"],
    price: 160000,
    remaining: null,
  },
];

const amenityIcons: Record<string, React.ReactNode> = {
  Wifi: <WifiIcon sx={{ fontSize: 16 }} />,
  "Điều hòa": <AcIcon sx={{ fontSize: 16 }} />,
  "Smart TV": <TvIcon sx={{ fontSize: 16 }} />,
  "Ghế tình yêu": <HeartIcon sx={{ fontSize: 16 }} />,
  "Bồn tắm": <BathIcon sx={{ fontSize: 16 }} />,
};

const RoomCard = ({
  room,
  loading,
  setOpenModal,
}: {
  room: Room;
  loading: boolean;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const sliderRef = useRef<any>(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <></>, // ẩn arrow mặc định
    nextArrow: <></>,
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          position: "absolute",
          bottom: 12,
          width: "100%",
          textAlign: "center",
        }}>
        <ul
          style={{
            margin: 0,
            padding: 0,
            display: "flex",
            justifyContent: "center",
            gap: 3,
          }}>
          {dots}
        </ul>
      </div>
    ),
    customPaging: () => (
      <div
        style={{
          width: 6,
          height: 6,
          background: "rgba(255,255,255,0.7)",
          borderRadius: "50%",
        }}
      />
    ),
  };

  if (loading) {
    return (
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          overflow: "hidden",
          bgcolor: "white",
          p: 2,
        }}>
        <Skeleton
          variant='rectangular'
          height={200}
          sx={{ borderRadius: "16px" }}
        />
        <Stack spacing={1.5} mt={2}>
          <Skeleton width='60%' height={24} />
          <Skeleton width='40%' height={20} />
          <Stack direction='row' gap={1} flexWrap='wrap'>
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                width={80}
                height={32}
                sx={{ borderRadius: "50px" }}
              />
            ))}
          </Stack>
          <Skeleton width='50%' height={40} sx={{ borderRadius: "50px" }} />
        </Stack>
      </Paper>
    );
  }

  const isSoldOut = room.remaining === null;
  const isLowStock = room.remaining === 1;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        bgcolor: "white",
        transition: "0.2s",
        "&:hover": { boxShadow: 6 },
        opacity: isSoldOut ? 0.7 : 1,
        position: "relative",
      }}>
      {/* HẾT PHÒNG BADGE */}
      {isSoldOut && (
        <Box
          sx={{
            position: "absolute",
            top: 30,
            right: 30,
            bgcolor: "rgba(0,0,0,0.7)",
            color: "white",
            px: 2,
            py: 0.8,
            borderRadius: "50px",
            fontSize: "0.8rem",

            zIndex: 10,
          }}>
          Hết phòng
        </Box>
      )}

      {/* SLIDER ẢNH - react-slick */}
      {/* SLIDER + CUSTOM ARROWS HOẠT ĐỘNG 100% */}
      <Box
        sx={{ position: "relative", borderRadius: "16px", overflow: "hidden" }}>
        <Slider ref={sliderRef} {...settings}>
          {room.images.map((img, i) => (
            <div key={i}>
              <img
                src={img}
                alt={`room ${i + 1}`}
                style={{
                  width: "100%",
                  height: isMobile ? "180px" : "220px",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Slider>

        {/* NÚT PREV - HOẠT ĐỘNG */}
        <IconButton
          onClick={() => sliderRef.current?.slickPrev()}
          sx={{
            position: "absolute",
            top: "50%",
            left: 12,
            transform: "translateY(-50%)",
            width: 36,
            height: 36,
            bgcolor: "white",
            borderRadius: "50%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 10,
            "&:hover": {
              bgcolor: "#f8f8f8",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            },
          }}>
          <ArrowBackIosNewIcon sx={{ fontSize: 16, color: "#666", ml: -0.5 }} />
        </IconButton>

        {/* NÚT NEXT - HOẠT ĐỘNG */}
        <IconButton
          onClick={() => sliderRef.current?.slickNext()}
          sx={{
            position: "absolute",
            top: "50%",
            right: 12,
            transform: "translateY(-50%)",
            width: 36,
            height: 36,
            bgcolor: "white",
            borderRadius: "50%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 10,
            "&:hover": {
              bgcolor: "#f8f8f8",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            },
          }}>
          <ArrowForwardIosIcon sx={{ fontSize: 16, color: "#666", ml: 0.5 }} />
        </IconButton>
      </Box>

      {/* NỘI DUNG */}
      <Stack p={2} spacing={1.5}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'>
          <Box>
            <Typography fontWeight={600} fontSize='1rem' color='#333'>
              {room.name}
            </Typography>
            <Typography fontSize='0.85rem' color='#666'>
              {room.type}
            </Typography>
          </Box>
          <Typography
            fontSize='0.8rem'
            color='#98b720'
            sx={{ cursor: "pointer", textDecoration: "underline" }}>
            Chi tiết phòng
          </Typography>
        </Stack>

        {/* TIỆN ÍCH */}
        <Stack direction='row' gap={1} flexWrap='wrap'>
          {room.amenities.map((amenity) => (
            <Chip
              key={amenity}
              icon={amenityIcons[amenity]}
              label={amenity}
              size='small'
              sx={{
                bgcolor: "#f0f8f0",
                color: "#98b720",
                fontSize: "0.75rem",
                height: 32,
                "& .MuiChip-icon": { color: "#98b720", fontSize: 16 },
              }}
            />
          ))}
        </Stack>
        <Divider />
        {/* GIÁ + NÚT */}
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          mt={1}>
          {!isSoldOut && (
            <Stack>
              {room.remaining !== null && (
                <Typography
                  fontSize='0.8rem'
                  color={isLowStock ? "#d32f2f" : "#666"}>
                  {isLowStock
                    ? "Chỉ còn 1 phòng"
                    : `Chỉ còn ${room.remaining} phòng`}
                </Typography>
              )}
              <Typography
                fontWeight={700}
                fontSize='1.1rem'
                color='rgba(234, 106, 0, 1)'>
                {room.price.toLocaleString("vi-VN")}đ
              </Typography>
            </Stack>
          )}

          {!isSoldOut && (
            <Button
              variant='contained'
              onClick={() => setOpenModal(true)}
              sx={{
                bgcolor: "#98b720",
                color: "white",
                borderRadius: "50px",
                fontWeight: 600,
                textTransform: "none",
                px: 3,
                py: 1.5,
                minWidth: 120,
                "&:hover": { bgcolor: "#7a9a1a" },
              }}>
              Đặt phòng
            </Button>
          )}
        </Stack>

        {/* THÔNG BÁO HẾT PHÒNG */}
        {isSoldOut && (
          <Typography fontSize='0.8rem' color='#d32f2f' mt={1}>
            Rất tiếc, khách sạn đã hết phòng vào thời gian này. Hãy chọn thời
            gian khác để đặt phòng
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};

const RoomList = () => {
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("123456789");
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ bgcolor: "#f9f9f9", py: { xs: 2, md: 4 } }}>
      <Stack spacing={3} sx={{}}>
        <Typography
          fontWeight={700}
          fontSize={{ xs: "1.25rem", md: "1.5rem" }}
          color='#333'>
          Danh sách phòng
        </Typography>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            className='hidden-add-voice'
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "95%", sm: 500 },
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
              alignItems='center'>
              <Typography fontWeight={700} fontSize='1.25rem' color='#333'>
                Xác minh số điện thoại
              </Typography>
              <IconButton onClick={() => setOpenModal(false)}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <Typography my={3} fontSize={"14px"} color='rgba(152, 159, 173, 1)'>
              Vui lòng nhập số điện thoại để tiếp tục đặt phòng
            </Typography>
            <Typography fontSize={14} fontWeight={500} mb={0.5}>
              Số điện thoại
            </Typography>
            <TextField
              fullWidth
              placeholder='Nhập số điện thoại'
              variant='outlined'
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/\D/g, ""))
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}>
                      <img
                        src={vn}
                        alt='VN'
                        style={{
                          width: 32,
                          borderRadius: 3,
                          objectFit: "cover",
                        }}
                      />
                      <Typography variant='body2' color='text.primary'>
                        +84
                      </Typography>
                    </Box>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  height: "60px",
                  backgroundColor: "#fff",
                  "& fieldset": {
                    borderColor: "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#bdbdbd",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ff7a00",
                    borderWidth: 1.5,
                  },
                },
                "& input": {
                  py: 1.5,
                },
              }}
            />
            <Button
              fullWidth
              variant='outlined'
              sx={{
                mt: 2,
                borderColor: "#98b720",
                color: "white",
                borderRadius: "50px",
                py: 1.5,
                textTransform: "none",
                background: "rgba(152, 183, 32, 1)",
              }}>
              Đăng nhập
            </Button>
            <Typography my={2} fontSize={"14px"} color='rgba(152, 159, 173, 1)'>
              Bạn chưa có tài khoản Booking Hotel?{" "}
              <Typography
                fontSize={"14px"}
                variant='span'
                sx={{ textDecoration: "underline" }}
                color='#ff7a00'>
                {" "}
                Đăng ký ngay
              </Typography>
            </Typography>
          </Box>
        </Modal>
        <Grid container justifyContent={"space-between"}>
          {rooms.map((room) => (
            <Grid item xs={12} md={3.8} key={room.id}>
              <RoomCard
                room={room}
                setOpenModal={setOpenModal}
                loading={loading}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default RoomList;
