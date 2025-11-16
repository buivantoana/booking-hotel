"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Chip,
  Grid,
  Paper,
  Skeleton,
  useTheme,
  useMediaQuery,
  Slider,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// === ICONS (giữ nguyên) ===
import iconBaggage from "../../images/double shopping bag 1.png";
import iconBaggageActive from "../../images/double shopping bag.png";
import iconElevator from "../../images/Frame.png";
import iconElevatorActive from "../../images/Frame (1).png";
import iconLock from "../../images/Frame 1321317930.png";
import iconLockActive from "../../images/Frame 1321317930 (1).png";
import iconParking from "../../images/Frame 1321317935.png";
import iconParkingActive from "../../images/Frame 1321317935 (1).png";
import iconPool from "../../images/Frame 1321317932.png";
import iconPoolActive from "../../images/Frame 1321317932 (1).png";
import iconAc from "../../images/Frame 1321317934.png";
import iconAcActive from "../../images/hotel-air-conditioner--heating-ac-air-hvac-cool-cooling-cold-hot-conditioning-hotel.png";
import iconTv from "../../images/Display1.png";
import iconTvActive from "../../images/Display.png";
import iconHeart from "../../images/Armchair.png";
import iconHeartActive from "../../images/Armchair 2.png";
import iconBathtub from "../../images/Bath1.png";
import iconBathtubActive from "../../images/Bath.png";
import iconKitchen from "../../images/pot-01.png";
import iconKitchenActive from "../../images/pot-01 (1).png";
import iconFridge from "../../images/Fridge1.png";
import iconFridgeActive from "../../images/Fridge.png";
import iconWifi from "../../images/wifi--wireless-wifi-internet-server-network-connection.png";
import iconWifiActive from "../../images/Frame 1321317936.png";
import iconHairdryer from "../../images/Frame 1321317937.png";
import iconHairdryerActive from "../../images/Frame 1321317937 (1).png";
import swap from "../../images/Swap.png";
import map from "../../images/maps.png";

import starActive from "../../images/star.svg";
import starInactive from "../../images/star.svg";
import image_room from "../../images/Rectangle 29975.png";
import no_room from "../../images/No Navigation.svg";
interface Amenity {
  label: string;
  icon: string;
  iconActive: string;
  active: boolean;
}

const amenities: Amenity[] = [
  {
    label: "Bảo quản hành lý",
    icon: iconBaggage,
    iconActive: iconBaggageActive,
    active: false,
  },
  {
    label: "Thang máy",
    icon: iconElevator,
    iconActive: iconElevatorActive,
    active: false,
  },
  {
    label: "Két sắt",
    icon: iconLock,
    iconActive: iconLockActive,
    active: false,
  },
  {
    label: "Bãi đỗ xe",
    icon: iconParking,
    iconActive: iconParkingActive,
    active: false,
  },
  {
    label: "Bể bơi",
    icon: iconPool,
    iconActive: iconPoolActive,
    active: false,
  },
  { label: "Điều hòa", icon: iconAc, iconActive: iconAcActive, active: false },
  { label: "Smart TV", icon: iconTv, iconActive: iconTvActive, active: false },
  {
    label: "Ghế tình yêu",
    icon: iconHeart,
    iconActive: iconHeartActive,
    active: false,
  },
  {
    label: "Bồn tắm",
    icon: iconBathtub,
    iconActive: iconBathtubActive,
    active: false,
  },
  {
    label: "Đồ bếp",
    icon: iconKitchen,
    iconActive: iconKitchenActive,
    active: false,
  },
  {
    label: "Tủ lạnh",
    icon: iconFridge,
    iconActive: iconFridgeActive,
    active: false,
  },
  { label: "Wifi", icon: iconWifi, iconActive: iconWifiActive, active: false },
  {
    label: "Máy sấy tóc",
    icon: iconHairdryer,
    iconActive: iconHairdryerActive,
    active: false,
  },
];

const ratings = [
  { label: "≥ 3.5", active: false },
  { label: "≥ 4.0", active: false },
  { label: "≥ 4.5", active: false },
];

const RoomsView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [amenityList, setAmenityList] = useState(amenities);
  const [ratingList, setRatingList] = useState(ratings);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    20000, 10000000,
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAmenityToggle = (index: number) => {
    const newList = [...amenityList];
    newList[index].active = !newList[index].active;
    setAmenityList(newList);
  };

  const handleRatingToggle = (index: number) => {
    const newList = [...ratingList];
    newList[index].active = !newList[index].active;
    setRatingList(newList);
  };

  const formatPrice = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}Mđ`;
    return `${(value / 1000).toFixed(0)}đ`;
  };

  return (
    <Box sx={{ bgcolor: "#f9f9f9", py: { xs: 2, md: 3 } }}>
      <Stack
        spacing={3}
        sx={{ maxWidth: 1400, mx: "auto", px: { xs: 2, md: 3 } }}>
        {/* ================= HEADER: KẾT QUẢ + SẮP XẾP ================= */}

        <Grid container spacing={3}>
          {/* ================= LEFT: FILTERS ================= */}
          <Grid item xs={12} md={4} lg={3.3}>
            <Paper
              elevation={0}
              sx={{ borderRadius: "16px", p: 3, bgcolor: "white" }}>
              <Stack spacing={4}>
                {/* MAP */}
                <Box
                  sx={{
                    position: "relative",
                    height: 180,
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: `url("${map}")`,
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundSize: "100%",
                  }}>
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: "12px",
                      px: 2,
                      py: 0.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      boxShadow: 1,
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      border: "1px solid rgba(152, 183, 32, 1)",
                      color: "rgba(152, 183, 32, 1)",
                      height: "40px",
                    }}>
                    <LocationOnIcon
                      sx={{ fontSize: 16, color: "rgba(152, 183, 32, 1)" }}
                    />
                    Xem trên bản đồ
                  </Box>
                </Box>

                {/* KHOẢNG GIÁ */}
                <Stack>
                  <Typography
                    fontWeight={600}
                    fontSize='1rem'
                    color='#333'
                    mb={2}>
                    Khoảng giá
                  </Typography>
                  <Typography fontSize='0.8rem' color='#666' mb={2}>
                    Giá phòng đã bao gồm mọi khoản phí
                  </Typography>

                  {/* SLIDER */}
                  <Box display={"flex"} justifyContent={"center"}>
                    <Slider
                      value={priceRange}
                      onChange={(_, newValue) =>
                        setPriceRange(newValue as [number, number])
                      }
                      valueLabelDisplay='off'
                      min={0}
                      max={10000000}
                      step={10000}
                      sx={{
                        color: "#98b720",
                        width: "90%",
                        height: 6,
                        "& .MuiSlider-thumb": {
                          width: 18,
                          height: 18,
                          bgcolor: "white",
                          border: "3px solid #98b720",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                          "&:hover, &.Mui-focusVisible": {
                            boxShadow: "0 0 0 8px rgba(152, 183, 32, 0.16)",
                          },
                        },
                        "& .MuiSlider-track": {
                          bgcolor: "#98b720",
                          border: "none",
                        },
                        "& .MuiSlider-rail": {
                          bgcolor: "#e0e0e0",
                          opacity: 1,
                        },
                      }}
                    />
                  </Box>

                  {/* LABELS & INPUT BOXES */}
                  <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='space-evenly'
                    mt={2}
                    spacing={1}>
                    <Typography
                      fontSize='0.75rem'
                      color='#666'
                      whiteSpace='nowrap'>
                      Giá tối thiểu
                    </Typography>
                    <Box
                      sx={{
                        width: "100px",
                        height: 1,
                        bgcolor: "#e0e0e0",
                        mx: 1,
                      }}
                    />
                    <Typography
                      fontSize='0.75rem'
                      color='#666'
                      whiteSpace='nowrap'>
                      Giá tối đa
                    </Typography>
                  </Stack>

                  <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                    mt={1}
                    spacing={2}>
                    <Box
                      sx={{
                        flex: 1,
                        bgcolor: "white",
                        border: "1px solid #e0e0e0",
                        borderRadius: "50px",
                        px: 2,
                        py: 1.5,
                        textAlign: "center",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "#98b720",
                      }}>
                      {formatPrice(priceRange[0])}
                    </Box>

                    {/* Dấu gạch ngang */}
                    <Box
                      sx={{
                        color: "#666",
                        fontSize: "1.2rem",
                        fontWeight: 300,
                      }}>
                      —
                    </Box>

                    {/* Ô phải */}
                    <Box
                      sx={{
                        flex: 1,
                        bgcolor: "white",
                        border: "1px solid #e0e0e0",
                        borderRadius: "50px",
                        px: 2,
                        py: 1.5,
                        textAlign: "center",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "#98b720",
                      }}>
                      {priceRange[1] >= 10000000
                        ? "10.000.000đ+"
                        : formatPrice(priceRange[1])}
                    </Box>
                  </Stack>
                </Stack>
                <Divider />

                {/* ĐIỂM ĐÁNH GIÁ */}
                <Stack>
                  <Typography
                    fontWeight={600}
                    fontSize='1rem'
                    color='#333'
                    mb={1.5}>
                    Điểm đánh giá
                  </Typography>
                  <Stack direction='row' flexWrap='wrap' gap={1}>
                    {ratingList.map((rating, i) => (
                      <Chip
                        key={i}
                        icon={
                          <Box
                            component='img'
                            src={rating.active ? starActive : starInactive}
                            sx={{ width: 16, height: 16 }}
                          />
                        }
                        label={rating.label}
                        onClick={() => handleRatingToggle(i)}
                        sx={{
                          bgcolor: rating.active ? "#f0f8f0" : "#fff",
                          color: rating.active
                            ? "#98b720"
                            : "rgba(185, 189, 199, 1)",
                          border: `1px solid ${
                            rating.active ? "#98b720" : "#eee"
                          }`,
                          borderRadius: "50px",
                          fontSize: "0.85rem",
                          height: 36,
                          fontWeight: rating.active ? 600 : 400,
                          cursor: "pointer",
                          "& .MuiChip-icon": { ml: 1 },
                        }}
                      />
                    ))}
                  </Stack>
                </Stack>

                <Divider />

                {/* TIỆN ÍCH */}
                <Stack>
                  <Typography
                    fontWeight={600}
                    fontSize='1rem'
                    color='#333'
                    mb={1.5}>
                    Tiện ích khách sạn
                  </Typography>
                  <Grid container spacing={1}>
                    {amenityList.map((item, i) => (
                      <Grid item xs={"auto"} key={i}>
                        <Chip
                          icon={
                            <Box
                              component='img'
                              src={item.active ? item.iconActive : item.icon}
                              sx={{ width: 20, height: 20 }}
                            />
                          }
                          label={item.label}
                          onClick={() => handleAmenityToggle(i)}
                          sx={{
                            justifyContent: "flex-start",
                            bgcolor: item.active ? "#f0f8f0" : "white",
                            color: item.active
                              ? "#98b720"
                              : "rgba(185, 189, 199, 1)",
                            border: `1px solid ${
                              item.active ? "#98b720" : "#eee"
                            }`,
                            borderRadius: "50px",
                            fontSize: "0.8rem",
                            height: 40,
                            cursor: "pointer",
                            fontWeight: item.active ? 600 : 400,
                            "& .MuiChip-icon": { ml: 1.5, mr: 0.5 },
                            "& .MuiChip-label": { px: 1 },
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </Stack>
            </Paper>
          </Grid>

          {/* ================= RIGHT: DANH SÁCH KHÁCH SẠN (DỌC) ================= */}
          <Grid item xs={12} md={8} lg={8.7}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                mb: 2,
              }}>
              <Stack direction='row' alignItems='center' spacing={1}>
                <Typography
                  fontWeight={600}
                  fontSize={{ xs: "0.95rem", sm: "1rem" }}>
                  {loading ? (
                    <CircularProgress
                      size={14}
                      sx={{ color: "#98b720", fontSize: "15px" }}
                    />
                  ) : (
                    "100+"
                  )}{" "}
                  kết quả tìm kiếm
                </Typography>
              </Stack>

              <SortButton />
            </Box>
            {loading ? (
              /* LOADING + ICON LOADING */
              <Stack spacing={3} alignItems='center'>
                {/* SKELETON CARDS - GIỐNG HỆT ẢNH */}
                <Stack spacing={3} width='100%'>
                  {[...Array(isMobile ? 1 : isTablet ? 2 : 3)].map((_, i) => (
                    <Paper
                      key={i}
                      elevation={0}
                      sx={{
                        borderRadius: "16px",
                        overflow: "hidden",
                        bgcolor: "white",
                        height: { xs: 200, sm: 200 },
                      }}>
                      <Grid container>
                        {/* Ảnh + tag */}
                        <Grid item xs={12} sm={5} md={4}>
                          <Box sx={{ position: "relative", height: "100%" }}>
                            <Skeleton
                              variant='rectangular'
                              width='100%'
                              height='100%'
                              sx={{ borderRadius: "20px" }}
                            />
                            {/* <Box
                              sx={{
                                position: "absolute",
                                top: 12,
                                left: 12,
                                width: 80,
                                height: 24,
                                borderRadius: "4px",
                              }}>
                              <Skeleton width='100%' height='100%' />
                            </Box> */}
                          </Box>
                        </Grid>

                        {/* Nội dung */}
                        <Grid item xs={12} sm={7} md={8}>
                          <Stack
                            p={2}
                            spacing={1.5}
                            height='100%'
                            justifyContent='space-between'>
                            <Box>
                              <Skeleton width='80%' height={28} />
                              <Skeleton width='60%' height={20} mt={0.5} />
                              <Skeleton width='50%' height={20} mt={0.5} />
                            </Box>

                            <Stack alignItems='flex-end'>
                              <Skeleton width='40%' height={20} />
                              <Skeleton width='60%' height={32} mt={1} />
                              <Skeleton
                                width='50%'
                                height={36}
                                mt={1}
                                sx={{ borderRadius: "6px" }}
                              />
                            </Stack>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </Stack>
              </Stack>
            ) : (
              /* DANH SÁCH THẬT – DỌC */
              <Stack spacing={3}>
                {[
                  {
                    name: "Hoàng gia Luxury hotel",
                    location: "Cầu Giấy, Hà Nội",
                    rating: 4.9,
                    reviews: 100,
                    price: 1600000,
                    remaining: 2,
                    tag: "Đông nhất",
                  },
                  {
                    name: "Hoàng gia Luxury hotel",
                    location: "Cầu Giấy, Hà Nội",
                    rating: 4.9,
                    reviews: 100,
                    price: 1600000,
                    remaining: null,
                  },
                  {
                    name: "Hoàng gia Luxury hotel",
                    location: "Cầu Giấy, Hà Nội",
                    rating: 4.9,
                    reviews: 100,
                    price: 1600000,
                    remaining: null,
                  },
                ].map((hotel, i) => (
                  <Paper
                    key={i}
                    elevation={0}
                    sx={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      bgcolor: "white",
                      transition: "0.2s",
                      "&:hover": { boxShadow: 3 },
                      height: { xs: 200, sm: "200px" },
                    }}>
                    <Grid container>
                      {/* Ảnh */}
                      <Grid item xs={12} sm={5} md={4}>
                        <Box
                          sx={{
                            position: "relative",
                            height: { xs: 200, sm: "200px" },
                          }}>
                          {hotel.tag && (
                            <Box
                              sx={{
                                position: "absolute",
                                top: 12,
                                left: 12,
                                bgcolor: "#ff9800",
                                color: "white",
                                px: 1.5,
                                py: 0.5,
                                borderRadius: "4px",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                zIndex: 1,
                              }}>
                              {hotel.tag}
                            </Box>
                          )}
                          <img
                            src={image_room}
                            alt={hotel.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "15px",
                            }}
                          />
                        </Box>
                      </Grid>

                      {/* Nội dung */}
                      <Grid item xs={12} sm={7} md={8}>
                        <Stack
                          px={2}
                          spacing={1.5}
                          height='100%'
                          justifyContent='space-between'>
                          <Box>
                            <Typography fontWeight={600} fontSize='1.1rem'>
                              {hotel.name}
                            </Typography>
                            <Typography
                              fontSize='0.85rem'
                              color='#999'
                              mt={0.5}>
                              {hotel.location}
                            </Typography>
                            <Stack
                              direction='row'
                              alignItems='center'
                              spacing={0.5}
                              mt={0.5}>
                              <Box
                                component='img'
                                src={starActive}
                                sx={{ width: 16, height: 16 }}
                              />
                              <Typography
                                fontSize='0.9rem'
                                color='#98b720'
                                fontWeight={600}>
                                {hotel.rating}
                              </Typography>
                              <Typography fontSize='0.8rem' color='#666'>
                                ({hotel.reviews})
                              </Typography>
                            </Stack>
                          </Box>

                          <Stack
                            direction='row'
                            justifyContent='end'
                            alignItems='flex-end'>
                            <Stack alignItems={"end"}>
                              <Typography fontSize='14px' color='#999'>
                                Giá cho 2 giờ
                              </Typography>
                              <Typography
                                fontWeight={700}
                                color='#98b720'
                                fontSize='1.25rem'
                                sx={{
                                  display: "flex",
                                  gap: 1,
                                  alignItems: "end",
                                }}>
                                <Typography
                                  fontSize='14px'
                                  lineHeight={2}
                                  color='#999'>
                                  Chỉ từ
                                </Typography>{" "}
                                {hotel.price.toLocaleString("vi-VN")}đ
                              </Typography>

                              <Box
                                sx={{
                                  bgcolor: "rgba(255, 237, 233, 1)",
                                  color: "rgba(204, 50, 0, 1)",
                                  px: 2.5,
                                  py: 1,
                                  borderRadius: "6px",
                                  fontSize: "0.8rem",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                }}>
                                Chỉ còn {hotel.remaining || 1} phòng
                              </Box>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Stack>
              // <Box
              //   display={"flex"}
              //   justifyContent={"center"}
              //   height={"60vh"}
              //   alignItems={"center"}>
              //   <Box
              //     display={"flex"}
              //     justifyContent={"center"}
              //     flexDirection={"column"}
              //     alignItems={"center"}>
              //     <img src={no_room} alt='' />
              //     <Typography mt={3}>
              //       Tệ thật, mình không thấy khách sạn vào phù hợp với tìm kiếm
              //       của bạn.
              //     </Typography>
              //   </Box>
              // </Box>
            )}
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default RoomsView;

import { Menu, MenuItem, ListItemText, ListItemIcon } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";
import SwapVertIcon from "@mui/icons-material/SwapVert";
const sortOptions = [
  { label: "Phù hợp nhất", value: "best" },
  { label: "Khoảng cách từ gần đến xa", value: "distance_asc" },
  { label: "Điểm đánh giá từ cao đến thấp", value: "rating_desc" },
  { label: "Giá từ thấp đến cao", value: "price_asc" },
  { label: "Giá từ cao đến thấp", value: "price_desc" },
];

const SortButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState(sortOptions[0].value);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    handleClose();
  };

  const selectedLabel = sortOptions.find(
    (opt) => opt.value === selected
  )?.label;

  return (
    <>
      <Button
        variant='outlined'
        size='small'
        onClick={handleClick}
        sx={{
          borderColor: "#eee",
          color: "#333",
          textTransform: "none",
          borderRadius: "12px",
          fontSize: "0.9rem",
          minWidth: 140,
          height: 48,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          bgcolor: "white",
          "&:hover": {
            borderColor: "#98b720",
            bgcolor: "transparent",
          },
        }}
        startIcon={<SwapVertIcon sx={{ fontSize: "22px !important" }} />}
        endIcon={
          open ? (
            <ArrowDropUpIcon
              sx={{ fontSize: "30px !important", color: "#98b720" }}
            />
          ) : (
            <ArrowDropDownIcon
              sx={{ fontSize: "30px !important", color: "#666" }}
            />
          )
        }>
        {selectedLabel}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            width: 260,
            overflow: "hidden",
          },
        }}
        MenuListProps={{
          sx: { p: 0 },
        }}>
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleSelect(option.value)}
            sx={{
              height: 48,
              bgcolor: selected === option.value ? "#f9f9f9" : "white",
              "&:hover": {
                bgcolor: selected === option.value ? "#f0f8f0" : "#f5f5f5",
              },
            }}>
            <ListItemText
              primary={
                <Typography
                  fontSize='0.9rem'
                  color={selected === option.value ? "#98b720" : "#666"}
                  fontWeight={selected === option.value ? 600 : 400}>
                  {option.label}
                </Typography>
              }
            />
            {selected === option.value && (
              <ListItemIcon sx={{ minWidth: 24, justifyContent: "flex-end" }}>
                <CheckIcon sx={{ fontSize: 18, color: "#98b720" }} />
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
