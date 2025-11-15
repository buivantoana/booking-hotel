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
        <Box
          position={"absolute"}
          display={"flex"}
          width={"100%"}
          justifyContent={"center"}
          bottom={"-80px"}>
          <Box width={"75%"}>
            <Stack
              direction='row'
              justifyContent='center'
              spacing={1}
              sx={{ mb: "-40px" }}>
              <ToggleButtonGroup
                value={bookingType}
                exclusive
                onChange={handleBookingType}
                sx={{
                  bgcolor: "rgba(0, 0, 0, 0.4)",
                  backdropFilter: "blur(10px)", // 🔥 blur nền
                  WebkitBackdropFilter: "blur(10px)", // 🔥 hỗ trợ Safari
                  borderRadius: "32px",
                  overflow: "hidden",
                  boxShadow: 1,
                  padding: "16px 24px",
                  gap: "20px",
                }}>
                <ToggleButton
                  value='hourly'
                  sx={{
                    px: { xs: 2, md: 4 },
                    py: 1.5,
                    color:
                      bookingType === "hourly"
                        ? "rgba(152, 183, 32, 1) !important"
                        : "white !important",
                    bgcolor:
                      bookingType === "hourly"
                        ? "rgba(255, 255, 255, 1) !important"
                        : "transparent",

                    fontWeight: 600,
                    borderRadius: "50px !important",
                    border: "none",
                  }}>
                  <AccessTime sx={{ mr: 1, fontSize: 20 }} />
                  Theo giờ
                </ToggleButton>
                <ToggleButton
                  value='nightly'
                  sx={{
                    px: { xs: 2, md: 4 },
                    py: 1.5,
                    color:
                      bookingType === "nightly"
                        ? "rgba(152, 183, 32, 1) !important"
                        : "white !important",
                    bgcolor:
                      bookingType === "nightly"
                        ? "rgba(255, 255, 255, 1) !important"
                        : "transparent",

                    fontWeight: 600,
                    borderRadius: "50px !important",
                    border: "none",
                  }}>
                  <Nightlight sx={{ mr: 1, fontSize: 20 }} />
                  Qua đêm
                </ToggleButton>
                <ToggleButton
                  value='daily'
                  sx={{
                    px: { xs: 2, md: 4 },
                    py: 1.5,
                    color:
                      bookingType === "daily"
                        ? "rgba(152, 183, 32, 1) !important"
                        : "white !important",
                    bgcolor:
                      bookingType === "daily"
                        ? "rgba(255, 255, 255, 1) !important"
                        : "transparent",

                    fontWeight: 600,
                    borderRadius: "50px !important",
                    border: "none",
                  }}>
                  <CalendarToday sx={{ mr: 1, fontSize: 20 }} />
                  Theo ngày
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>

            <Paper
              elevation={0}
              sx={{
                borderRadius: "24px",
                overflow: "hidden",
                bgcolor: "white",
                p: { xs: 1.5, md: "70px 20px 20px" },
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 1.5, md: 0 }}
                sx={{ borderRadius: "50px", border: "1px solid #eee", p: 1 }}
                alignItems='stretch'>
                {/* 1. Địa điểm */}
                <Box
                  sx={{
                    flex: { md: 1 },
                    minWidth: { xs: "100%", md: 280 },
                    position: "relative",
                  }}>
                  <TextField
                    fullWidth
                    placeholder='Bạn muốn đi đâu?'
                    variant='outlined'
                    InputProps={{
                      startAdornment: (
                        <LocationOn
                          sx={{
                            fontSize: 20,
                            color: "#999",
                            mr: 1,
                          }}
                        />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: { xs: 48, md: 45 },
                        borderRadius: "50px 0 0 50px",
                        border: "none",
                        bgcolor: "transparent",
                        "& fieldset": { border: "none" },
                        "&:hover fieldset": { border: "none" },
                        "&.Mui-focused fieldset": { border: "none" },
                        fontSize: "0.95rem",
                        color: "#333",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "#999",
                        opacity: 1,
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 1,
                      height: "100%",

                      pointerEvents: "none",
                    }}
                  />
                </Box>

                {/* Divider dọc (chỉ trên desktop) */}
                {isMobile ? null : (
                  <Box
                    sx={{
                      width: "1px",
                      bgcolor: "#eee",
                      alignSelf: "stretch",
                      mx: 0,
                    }}
                  />
                )}

                {/* 2. Nhận phòng */}
                <Box
                  sx={{
                    flex: { md: 1 },
                    minWidth: { xs: "100%", md: 180 },
                  }}>
                  <TextField
                    fullWidth
                    placeholder='Bất kì'
                    variant='outlined'
                    InputProps={{
                      startAdornment: (
                        <Event
                          sx={{
                            fontSize: 20,
                            color: "#999",
                            mr: 1,
                          }}
                        />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: { xs: 48, md: 45 },
                        borderRadius: 0,
                        border: "none",
                        bgcolor: "transparent",
                        "& fieldset": { border: "none" },
                        "&:hover fieldset": { border: "none" },
                        fontSize: "0.95rem",
                        color: "#333",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "#999",
                        opacity: 1,
                      },
                    }}
                  />
                </Box>

                {/* Divider dọc */}
                {isMobile ? null : (
                  <Box
                    sx={{
                      width: "1px",
                      bgcolor: "#eee",
                      alignSelf: "stretch",
                      mx: 0,
                    }}
                  />
                )}

                {/* 3. Trả phòng */}
                <Box
                  sx={{
                    flex: { md: 1 },
                    minWidth: { xs: "100%", md: 180 },
                  }}>
                  <TextField
                    fullWidth
                    placeholder='Bất kì'
                    variant='outlined'
                    InputProps={{
                      startAdornment: (
                        <PeopleOutline
                          sx={{
                            fontSize: 20,
                            color: "#999",
                            mr: 1,
                          }}
                        />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: { xs: 48, md: 45 },
                        borderRadius: { xs: "50px", md: 0 },
                        border: "none",
                        bgcolor: "transparent",
                        "& fieldset": { border: "none" },
                        "&:hover fieldset": { border: "none" },
                        fontSize: "0.95rem",
                        color: "#333",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "#999",
                        opacity: 1,
                      },
                    }}
                  />
                </Box>

                {/* Nút Tìm kiếm */}
                <Button
                  variant='contained'
                  size='large'
                  startIcon={<Search sx={{ fontSize: 22 }} />}
                  sx={{
                    bgcolor: "rgba(152, 183, 32, 1)",
                    color: "white",
                    px: { xs: 3, md: 4 },
                    py: { xs: 1.5, md: 1.8 },
                    borderRadius: "50px",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1rem",
                    minWidth: { xs: "100%", md: "auto" },
                    height: { xs: 48, md: 45 },
                    "&:hover": { bgcolor: "#43a047" },
                    boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
                    transition: "all 0.3s ease",
                  }}>
                  Tìm kiếm
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Box>
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
            width={"80%"}
            style={{ objectFit: "contain" }}
            alt=''
          />
        </Box>

        <ListRoom title={"Ưu đãi độc quyền"} />
      </Container>
    </Box>
  );
};

export default HomeView;
