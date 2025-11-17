import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  LocationOn,
  AccessTime,
  Nightlight,
  CalendarToday,
  Search,
  AccessAlarm,
  Bed,
  Flight,
  Event,
  PeopleOutline,
} from "@mui/icons-material";
import type_booking from "../../images/Full Frame.png";
import ListRoom from "./ListRoom";
import PopularDestinations from "./PopularDestinations";
import FirstTimeExplore from "./FirstTimeExplore";
import SearchBarWithDropdown from "./SearchBarWithDropdown";

const HomeView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [bookingType, setBookingType] = useState("hourly");

  const handleBookingType = (event, newType) => {
    if (newType !== null) {
      setBookingType(newType);
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "70vh", md: "60vh" },
          backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          display: "flex",
          alignItems: "center",
          borderBottomLeftRadius: "32px",
          borderBottomRightRadius: "32px",
        }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.4)",
            borderBottomLeftRadius: "32px",
            borderBottomRightRadius: "32px",
          }}
        />

        <Container maxWidth='lg' sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight='bold'
            gutterBottom
            align='center'
            sx={{ mb: 1 }}>
            Nền tảng đặt phòng hàng đầu
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            align='center'
            sx={{ mb: 4, opacity: 0.9 }}>
            Tìm khách sạn lý tưởng – Chạm một lần, ở thoải mái mãi
          </Typography>
        </Container>
        <SearchBarWithDropdown />
      </Box>

      {/* Booking Options Section */}
      <Container maxWidth='lg' sx={{ py: { xs: 6, md: 15 } }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight='bold'
          align='center'
          gutterBottom>
          Booking Hotel có gì
        </Typography>

        <Box
          mt={"100px"}
          mb={"50px"}
          display={"flex"}
          justifyContent={"center"}
          sx={{ cursor: "pointer" }}>
          <img
            src={type_booking}
            width={"100%"}
            style={{ objectFit: "contain" }}
            alt=''
          />
        </Box>
        <FirstTimeExplore />
        <ListRoom title={"Ưu đãi độc quyền"} />
        <ListRoom title={"Top được bình chọn"} />
        <ListRoom title={"Khách sạn mới"} />
        <PopularDestinations />
      </Container>
    </Box>
  );
};

export default HomeView;
