import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import image_room from "../../images/Rectangle 29975.png";
import tag  from "../../images/Tag.png";
const ListRoom = ({ title, isDetail }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,

    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, centerMode: true, centerPadding: "40px" },
      },
    ],
  };
  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}>
       {isDetail? <Typography
          variant='h4'
          fontWeight={"500"}
          fontSize={isDetail ? "1.1rem" : "36px"}>
          {title}
        </Typography>:
        <Typography
            variant='h4'
            fontWeight='bold'
            color='#333'
            sx={{
              fontSize: { xs: "1.5rem", md: "1.875rem" },
            }}>
           {title}
          </Typography>}
        {!isDetail && (
          <Typography color='rgba(152, 159, 173, 1)' fontSize={"15px"}>
            Xem tất cả <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
          </Typography>
        )}
      </Box>
      <Box my={1}>
        <Slider {...settings}>
          {[1, 2, 3, 4].map((hotel) => (
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Box width={"95%"} py={4} pl={0.8} pr={2}>
                <HotelCard />
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default ListRoom;

import {
  Card,
  CardMedia,
  CardContent,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ChevronLeft, ChevronRight, Star } from "@mui/icons-material";
import Slider from "react-slick";

const HotelCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: "14px",
        overflow: "hidden",
        mx: "auto",
        bgcolor: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 16px 32px rgba(0,0,0,0.12)",
        },
        padding: "10px",
      }}>
      {/* Badge "Đăng tin cậy" */}
      <Box
        sx={{
          position: "absolute",
          top: 10,
          left: 30,
          zIndex: 2,
        }}>
       <img src={tag} alt="" />
      </Box>

      {/* Ảnh phòng */}
      <CardMedia
        component='img'
        height={isMobile ? "200" : "240"}
        image={image_room}
        alt='Hoàng gia Luxury hotel'
        sx={{
          objectFit: "cover",
          borderRadius: "14px",
        }}
      />

      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack spacing={1}>
          {/* Tên khách sạn */}
          <Typography
            variant='h6'
            fontWeight='bold'
            color='#333'
            sx={{
              fontSize: { xs: "1rem", sm: "18px" },
              lineHeight: 1.3,
            }}>
            Hoàng gia Luxury hotel
          </Typography>

          {/* Địa chỉ */}
          <Typography
            variant='body2'
            color='#666'
            sx={{
              fontSize: { xs: "0.85rem", sm: "0.9rem" },
            }}>
            Cầu Giấy, Hà Nội
          </Typography>

          {/* Rating */}
          <Stack direction='row' alignItems='center' spacing={0.5}>
            <Star sx={{ color: "#ffb300", fontSize: 18 }} />
            <Typography
              variant='body2'
              fontWeight='bold'
              color='#333'
              sx={{ fontSize: "0.9rem" }}>
              4.9
            </Typography>
            <Typography
              variant='caption'
              color='#999'
              sx={{ ml: 0.5, fontSize: "0.8rem" }}>
              (100)
            </Typography>
          </Stack>

          {/* Giá */}
          <Stack
            direction='row'
            alignItems='baseline'
            spacing={0.5}
            sx={{ mt: 1.5 }}>
            <Typography
              variant='caption'
              color='#999'
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.85rem" },
                fontWeight: 500,
              }}>
              Chỉ từ
            </Typography>
            <Typography
              variant='h6'
              fontWeight='bold'
              color='#EA6A00'
              sx={{
                fontSize: { xs: "1.1rem", sm: "1.3rem" },
                lineHeight: 1,
              }}>
              160.000đ
            </Typography>
            <Typography
              variant='body2'
              color='#666'
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.85rem" },
                ml: 0.5,
              }}>
              / 2 giờ
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        left: { xs: 8, md: "-20px" },
        top: "50%",
        transform: "translateY(-50%)",
        bgcolor: "white",
        width: 48,
        height: 48,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 10,
        "&:hover": { bgcolor: "#f5f5f5" },
      }}>
      <ChevronLeft sx={{ color: "#333", fontSize: 28 }} />
    </IconButton>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        right: { xs: 8, md: "-20px" },
        top: "50%",
        transform: "translateY(-50%)",
        bgcolor: "white",
        width: 48,
        height: 48,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 10,
        "&:hover": { bgcolor: "#f5f5f5" },
      }}>
      <ChevronRight sx={{ color: "#333", fontSize: 28 }} />
    </IconButton>
  );
};
