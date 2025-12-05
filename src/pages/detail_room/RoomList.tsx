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
  CircularProgress,
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
import vn from "../../images/VN - Vietnam.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useBookingContext } from "../../App";
import { Login, checkUser } from "../../service/admin";
import { toast } from "react-toastify";
import { MuiOtpInput } from "mui-one-time-password-input";
import no_room from "../../images/Calendar.svg";
import { getErrorMessage } from "../../utils/utils";
interface Room {
  id: number;
  name: string;
  type: string;
  images: string[];
  amenities: string[];
  price: number;
  remaining: number | null; // null = hết phòng
}

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
  setSelectedRoom,
  setOpenDetail,
  booking,
  searchParams,
  isNotLogin,
  openModalDetail,
  setOpenModalDetail,
}: {
  room: Room;
  loading: boolean;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const context = useBookingContext();
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

  const isSoldOut = room.remaining === null;
  const isLowStock = room.remaining === 1;
  const handleOpenModal = () => {
    setSelectedRoom(room);
    if (!searchParams.get("checkIn") || !searchParams.get("checkOut")) {
      toast.warning("Vui lòng chọn ngày giờ!");
    } else {
      if (Object.keys(context.state.user).length > 0 || isNotLogin) {
        setOpenDetail(true);
      } else {
        setOpenModal(true);
      }
    }
  };
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
            onClick={() => {
              setSelectedRoom(room);
              setOpenModalDetail(true);
            }}
            fontSize='0.8rem'
            color='#98b720'
            sx={{ cursor: "pointer", textDecoration: "underline" }}>
            Chi tiết phòng
          </Typography>
        </Stack>

        {/* TIỆN ÍCH */}
        <Stack direction='row' gap={1} flexWrap='wrap'>
          {["Wifi", "Điều hòa", "Smart TV", "Ghế tình yêu", "Bồn tắm"].map(
            (amenity) => (
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
            )
          )}
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
                    : `Chỉ còn ${room.remaining || 1} phòng`}
                </Typography>
              )}
              <Typography
                fontWeight={700}
                fontSize='1.1rem'
                color='rgba(234, 106, 0, 1)'>
                {searchParams.get("type") == "hourly" &&
                  room.price_hourly.toLocaleString("vi-VN") + "đ"}
                {searchParams.get("type") == "daily" &&
                  room.price_daily.toLocaleString("vi-VN") + "đ"}
                {searchParams.get("type") == "overnight" &&
                  room.price_overnight.toLocaleString("vi-VN") + "đ"}
              </Typography>
            </Stack>
          )}

          {!isSoldOut && (
            <Button
              variant='contained'
              onClick={handleOpenModal}
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

const RoomList = ({ loading, data, hotel, section1Ref }) => {
  let booking = localStorage.getItem("booking")
    ? JSON.parse(localStorage.getItem("booking"))
    : {};
  const [openModal, setOpenModal] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [lodingLogin, setLoadingLogin] = useState(false);
  const [isNotLogin, setIsNotLogin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [touched, setTouched] = useState(false);
  const [password, setPassword] = useState(false);
  const [searchParams] = useSearchParams();
  console.log("AAAA searchParams", searchParams.get("type"));
  const navigate = useNavigate();
  const normalizePhone = (phone) => {
    if (!phone) return "";
    let p = phone.trim().replace(/\D/g, "");
    if (p.startsWith("84")) p = p.slice(2); // bỏ 84 đầu nếu nhập +84
    if (p.startsWith("0")) p = p.slice(1); // bỏ số 0 đầu nếu người dùng nhập
    return p;
  };
  const isValidVietnamPhone = (phone) => {
    if (!phone) return false;
    if (phone.length > 9) return false;
    const normalized = normalizePhone(phone);
    if (!/^[35789]/.test(normalized)) return false; // đầu số hợp lệ
    if (normalized.length < 9) return false; // độ dài
    return true;
  };
  console.log("AAA data", selectedRoom);
  return (
    <Box ref={section1Ref} sx={{ bgcolor: "#f9f9f9", py: { xs: 2, md: 4 } }}>
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
            {password ? (
              <PinCreation
                setOpenModal={setOpenModal}
                phoneNumber={phoneNumber}
              />
            ) : (
              <>
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
                <Typography
                  my={3}
                  fontSize={"14px"}
                  color='rgba(152, 159, 173, 1)'>
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
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, ""); // chỉ giữ số
                    // loại bỏ 0 đầu tiên
                    if (val.length > 20) val = val.slice(0, 20);
                    if (val.startsWith("0")) val = val.slice(1);
                    setPhoneNumber(val);
                  }}
                  onBlur={() => setTouched(true)} // chỉ validate khi blur
                  error={touched && !isValidVietnamPhone(phoneNumber)}
                  helperText={
                    touched && !isValidVietnamPhone(phoneNumber)
                      ? "Số điện thoại không hợp lệ, vui lòng nhập lại."
                      : ""
                  }
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
                        borderColor: "#98b720",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#98b720",
                        borderWidth: 1.5,
                      },
                    },
                    "& input": {
                      py: 1.5,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <img
                          src={vn}
                          alt='vn'
                          style={{
                            width: 28,
                            height: 20,
                            borderRadius: 4,
                            objectFit: "cover",
                            marginRight: 8,
                          }}
                        />
                        <Typography sx={{ fontSize: 14, marginRight: 1 }}>
                          +84
                        </Typography>
                      </InputAdornment>
                    ),
                    endAdornment:
                      touched && !isValidVietnamPhone(phoneNumber) ? (
                        <InputAdornment position='end'>
                          <Box
                            sx={{
                              cursor: "pointer",
                              fontSize: 22,
                              color: "#999",
                            }}
                            onClick={() => {
                              setPhoneNumber("");
                              setTouched(false); // reset error khi xóa
                            }}>
                            ✕
                          </Box>
                        </InputAdornment>
                      ) : null,
                  }}
                />
                <Button
                  fullWidth
                  onClick={async () => {
                    setLoadingLogin(true);
                    try {
                      let result = await checkUser({
                        type: "phone",
                        value: "0" + phoneNumber,
                      });
                      if (result.code == "OK") {
                        setPassword(true);
                      } else {
                        // toast.error(result.message)
                        console.log("AAAA toan");

                        setOpenDetail(true);
                        setIsNotLogin(true);
                        setOpenModal(false);
                      }
                    } catch (error) {
                      console.log(error);
                    }
                    setLoadingLogin(false);
                  }}
                  variant='outlined'
                  disabled={!phoneNumber || !isValidVietnamPhone(phoneNumber)}
                  sx={{
                    mt: 2,
                    borderColor: "#98b720",
                    color: "white",
                    borderRadius: "50px",
                    py: 1.5,
                    textTransform: "none",
                    background: "rgba(152, 183, 32, 1)",
                  }}>
                  {loading ? (
                    <>
                      <CircularProgress
                        size={20}
                        sx={{ color: "#fff", mr: 1 }}
                      />
                      Đăng nhập...
                    </>
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>
                <Typography
                  my={2}
                  fontSize={"14px"}
                  color='rgba(152, 159, 173, 1)'>
                  Bạn chưa có tài khoản Booking Hotel?{" "}
                  <Typography
                    onClick={() => {
                      navigate("/register");
                    }}
                    fontSize={"14px"}
                    variant='span'
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                    color='#ff7a00'>
                    {" "}
                    Đăng ký ngay
                  </Typography>
                </Typography>
              </>
            )}
          </Box>
        </Modal>
        <RoomDetailModal
          setOpenModalDetail={setOpenModalDetail}
          openModalDetail={openModalDetail}
          phoneNumber={phoneNumber}
          open={openDetail}
          hotel={hotel}
          booking={booking}
          onClose={() => setOpenDetail(false)}
          searchParams={searchParams}
          room={selectedRoom}
        />

        {loading ? (
          <>
            <Box display={"flex"} justifyContent={"space-between"} gap={3}>
              {[1, 2, 3].map((item) => {
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
                      <Skeleton
                        width='50%'
                        height={40}
                        sx={{ borderRadius: "50px" }}
                      />
                    </Stack>
                  </Paper>
                );
              })}
            </Box>
          </>
        ) : (
          <>
            {data.length == 0 ? (
              <>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  gap={2}
                  alignItems={"center"}
                  justifyContent={"center"}>
                  <img src={no_room} alt='' />
                  <Typography color='#2B2F38' fontWeight={600}>
                    Không còn phòng trống
                  </Typography>
                  <Typography color='#2B2F38'>
                    Rất tiệc, khách sạn đã hết phòng vào thời này. hãy trọn thời
                    khác để đặt phòng
                  </Typography>
                </Box>
              </>
            ) : (
              <Grid
                container
                justifyContent={data.length >= 3 ? "space-between" : "start"}
                gap={data.length <= 3 ? 3 : 0}>
                {data?.map((room) => (
                  <Grid item xs={12} md={3.8} key={room.id}>
                    <RoomCard
                      room={room}
                      setOpenModal={setOpenModal}
                      loading={loading}
                      setOpenDetail={setOpenDetail}
                      setSelectedRoom={setSelectedRoom}
                      booking={booking}
                      searchParams={searchParams}
                      isNotLogin={isNotLogin}
                      setOpenModalDetail={setOpenModalDetail}
                      openModalDetail={openModalDetail}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default RoomList;

const RoomDetailModal = ({
  open,
  onClose,
  room,
  hotel,
  booking,
  searchParams,
  phoneNumber,
  openModalDetail,
  setOpenModalDetail,
}) => {
  const sliderRef = useRef<any>(null);
  const thumbRef = useRef<any>(null);
  const navigate = useNavigate();

  const [navMain, setNavMain] = useState(null);
  const [navThumb, setNavThumb] = useState(null);

  const sliderMain = useRef();
  const sliderThumb = useRef();

  const settingsMain = {
    asNavFor: navThumb,
    arrows: false,
    infinite: true,
  };

  const settingsThumb = {
    asNavFor: navMain,
    slidesToShow: 4,
    swipeToSlide: true,
    focusOnSelect: true,
    centerMode: false,
  };

  if (!room) return null;

  const handleBooking = () => {
    if (localStorage.getItem("booking")) {
      localStorage.setItem(
        "booking",
        JSON.stringify({
          hotel_id: hotel.id,
          rooms: [
            {
              quantity: 1,
              room_type_id: room.room_type_id,
            },
          ],
          price: room.price_daily,
          address: hotel?.address?.en || hotel?.address?.vi,
          name: hotel?.name?.en || hotel?.name?.vi,
          image: hotel?.images?.[0],
          ...Object.fromEntries([...searchParams]),
          phone: "+84" + phoneNumber,
        })
      );
      setTimeout(() => {
        navigate("/check-out");
      }, 300);
    }
  };
  return (
    <Modal
      open={open || openModalDetail}
      onClose={openModalDetail ? () => setOpenModalDetail(false) : onClose}>
      <Box
        className='hidden-add-voice'
        sx={{
          width: { xs: "95%", md: "1000px" },

          position: "absolute",
          top: "50%",
          left: "50%",
          bgcolor: "white",
          borderRadius: "18px",
          transform: "translate(-50%, -50%)",
          p: { xs: 2, md: 3 },

          height: "max-content",
        }}>
        {/* HEADER */}
        <Stack direction='row' justifyContent='space-between' mb={2}>
          <Typography fontSize='1.4rem' fontWeight={700}>
            {room.name}
          </Typography>

          <IconButton
            onClick={
              openModalDetail ? () => setOpenModalDetail(false) : onClose
            }>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} gap={3}>
          {/* LEFT: SLIDER */}
          <Box width={"60%"} position='relative'>
            <Box mb={1}>
              <Slider
                {...settingsMain}
                ref={(slider) => {
                  sliderMain.current = slider;
                  setNavMain(slider);
                }}>
                {room.images.map((img, i) => (
                  <Box height={"360px !important"}>
                    <img
                      key={i}
                      src={img}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 12,
                      }}
                    />
                  </Box>
                ))}
              </Slider>

              {/* CUSTOM ARROWS */}
              <IconButton
                onClick={() => sliderMain.current?.slickPrev()}
                sx={{
                  position: "absolute",
                  top: "40%",
                  left: 10,
                  bgcolor: "white",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  transform: "translateY(-50%)",
                  boxShadow: 2,
                  transition: "all 0.3s ease", // mượt khi hover

                  // Hover effect
                  "&:hover": {
                    bgcolor: "#98b720", // nền chuyển xanh
                    boxShadow: 6, // bóng đậm hơn tí

                    "& .MuiSvgIcon-root": {
                      // đổi màu icon khi hover
                      color: "white !important",
                    },
                  },

                  // Icon mặc định
                  "& .MuiSvgIcon-root": {
                    fontSize: 16,
                    color: "#333",
                    transition: "color 0.3s ease",
                  },
                }}>
                <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
              </IconButton>

              <IconButton
                onClick={() => sliderMain.current?.slickNext()}
                sx={{
                  position: "absolute",
                  top: "40%",
                  right: 10,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  bgcolor: "white",
                  boxShadow: 2,
                  transform: "translateY(-50%)",
                  transition: "all 0.3s ease", // mượt khi hover

                  // Hover effect
                  "&:hover": {
                    bgcolor: "#98b720", // nền chuyển xanh
                    boxShadow: 6, // bóng đậm hơn tí

                    "& .MuiSvgIcon-root": {
                      // đổi màu icon khi hover
                      color: "white !important",
                    },
                  },

                  // Icon mặc định
                  "& .MuiSvgIcon-root": {
                    fontSize: 16,
                    color: "#333",
                    transition: "color 0.3s ease",
                  },
                }}>
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>

            {/* Thumbnail */}
            <Box
              sx={{
                ".slick-current img": {
                  outline: "2px solid #98b720",
                  outlineOffset: "-2px", // kéo viền vào trong đúng 2px → trông như border trong
                  opacity: 1,
                  // optional: thêm viền ngoài nếu muốn đậm hơn
                },
                // Đảm bảo tất cả ảnh đều có kích thước cố định và không bị co giãn do border/outline
                img: {
                  display: "block",
                  width: "100%",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: 1,
                  opacity: 0.6,
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                },
              }}>
              <Slider
                {...settingsThumb}
                ref={(slider) => {
                  sliderThumb.current = slider;
                  setNavThumb(slider);
                }}>
                {room.images.map((img, i) => (
                  <Box width={"95% !important"} height={"100px"}>
                    <img key={i} src={img} />
                  </Box>
                ))}
              </Slider>
            </Box>
          </Box>
          {/* RIGHT: ROOM INFO */}
          <Box width={"37%"}>
            <Typography fontWeight={600} fontSize='1.1rem' mb={1}>
              Thông tin phòng
            </Typography>
            <Typography color='gray' fontSize='0.9rem' mb={2}>
              Giường king-size (1m8 × 2m) – 25m² – hướng vườn
            </Typography>

            <Typography fontWeight={600} mb={1}>
              Quyền lợi đặt phòng
            </Typography>
            <Typography color='gray' fontSize='0.9rem' mb={2}>
              Tất cả phương thức thanh toán
            </Typography>

            <Typography fontWeight={600} mb={1}>
              Tiện ích
            </Typography>

            <Stack direction='row' gap={1} flexWrap='wrap'>
              {["Wifi", "Điều hòa", "Smart TV", "Ghế tình yêu", "Bồn tắm"].map(
                (amenity) => (
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
                )
              )}
            </Stack>

            <Typography fontWeight={600} my={2}>
              Mô tả phòng
            </Typography>
            <Typography color='gray' fontSize='0.9rem' mb={3}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page…
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {/* PRICE + BUTTON */}
            <Stack
              direction='row'
              alignItems='center'
              justifyContent={"space-between"}
              gap={2}>
              <Typography
                fontWeight={700}
                color='rgba(234, 106, 0, 1)'
                fontSize='1.3rem'>
                {searchParams.get("type") == "hourly" &&
                  room.price_hourly.toLocaleString("vi-VN") + "đ"}
                {searchParams.get("type") == "daily" &&
                  room.price_daily.toLocaleString("vi-VN") + "đ"}
                {searchParams.get("type") == "overnight" &&
                  room.price_overnight.toLocaleString("vi-VN") + "đ"}
              </Typography>

              {!openModalDetail && (
                <Button
                  onClick={handleBooking}
                  variant='contained'
                  sx={{
                    bgcolor: "#98b720",
                    color: "white",
                    borderRadius: "50px",
                    px: 3,
                    py: 1.2,
                    textTransform: "none",
                  }}>
                  Đặt phòng
                </Button>
              )}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

const PinCreation = ({ phoneNumber, setOpenModal }) => {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const context = useBookingContext();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (pin.length === 6) {
      let result = await Login({
        platform: "ios",
        type: "phone",
        value: "+84" + phoneNumber,
        password: pin,
      });
      if (result.access_token) {
        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("refresh_token", result.refresh_token);
        localStorage.setItem("user", JSON.stringify(result.user));
        context.dispatch({
          type: "LOGIN",
          payload: {
            ...context.state,
            user: { ...result.user },
          },
        });

        toast.success("Login success");
        setOpenModal(false);
      } else {
        toast.error(getErrorMessage(result.code) || result.message);
      }
    }
    setLoading(false);
  };

  const toggleShowPin = () => setShowPin(!showPin);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: { xs: "100%", sm: "400px", md: "486px" },
      }}>
      {/* TITLE */}

      <Box>
        <Typography
          sx={{
            fontSize: { xs: "26px", md: "30px" },
            fontWeight: 700,
            mb: 1,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}>
          <ArrowBackIosNewIcon />
          Hi,+84{phoneNumber}
        </Typography>
      </Box>

      {/* DESCRIPTION */}

      {/* PIN INPUT FORM */}
      <Box component='form' onSubmit={handleSubmit}>
        {/* NHẬP MÃ PIN */}
        <Box display={"flex"} mb={2} justifyContent={"space-between"}>
          <Typography fontSize={14} color='#5D6679' fontWeight={500} mb={1.5}>
            Mã PIN của sẽ được dùng để đăng nhập
          </Typography>
          <Typography
            color='#5D6679'
            onClick={toggleShowPin}
            fontSize={14}
            sx={{
              cursor: "pointer",
              mb: 1,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}>
            {showPin ? "Ẩn" : "Hiện"}
          </Typography>
        </Box>

        <Box
          sx={{
            mb: 3,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <MuiOtpInput
            value={pin}
            onChange={setPin}
            length={6}
            TextFieldsProps={{
              type: showPin ? "text" : "password",
              inputProps: { maxLength: 1 },
            }}
            sx={{
              gap: 1.5,
              width: "100%",
              justifyContent: "space-between",
              "& .MuiOtpInput-TextField": {
                "& .MuiOutlinedInput-root": {
                  width: { xs: 50, sm: 60 },
                  height: { xs: 50, sm: 60 },
                  borderRadius: "16px",
                  backgroundColor: "#fff",
                  "& fieldset": {
                    borderColor: "#9AC700",
                    borderWidth: "1px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#7cb400",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#9AC700",
                    borderWidth: "1px",
                  },
                },
                "& input": {
                  textAlign: "center",
                  fontSize: { xs: "20px", sm: "24px" },
                  fontWeight: 700,
                  color: "#9AC700",
                  "&::placeholder": {
                    color: "#9AC700",
                    opacity: 0.6,
                  },
                },
              },
            }}
          />
        </Box>

        <Typography
          variant='body2'
          sx={{
            mb: 4,
            color: "#FF7A00",
            fontSize: "14px",
            fontWeight: 500,
          }}>
          <Link
            href='/forgot-password'
            sx={{
              cursor: "pointer",
              color: "#FF7A00",
              textDecoration: "underline",
            }}>
            Quên mã PIN?
          </Link>
        </Typography>

        <Button
          type='submit'
          fullWidth
          disabled={pin.length !== 6}
          sx={{
            py: 1.6,
            borderRadius: "30px",
            backgroundColor: pin.length === 6 ? "#9AC700" : "#e0e0e0",
            color: pin.length === 6 ? "#fff" : "#888",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "18px",
            height: "56px",
            "&:hover": {
              backgroundColor: pin.length === 6 ? "#7cb400" : "#e0e0e0",
            },
          }}>
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ color: "#fff", mr: 1 }} />
              Đang xác thực...
            </>
          ) : (
            "Tiếp tục"
          )}
        </Button>
      </Box>
    </Box>
  );
};
