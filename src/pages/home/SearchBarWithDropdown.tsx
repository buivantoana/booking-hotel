"use client";

import React, { useState, useRef } from "react";
import {
  Box,
  Paper,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Button,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popper,
  useMediaQuery,
  useTheme,
  ClickAwayListener,
} from "@mui/material";

import {
  LocationOn,
  AccessTime,
  Nightlight,
  CalendarToday,
  Event,
  PeopleOutline,
  Search,
} from "@mui/icons-material";

// MUI X date pickers
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

const allLocations = [
  "Ba Đình",
  "T.P Hồ Chí Minh",
  "T.P Uông Bí",
  "Hai Bà Trưng",
  "Ba Vì",
  "Hà Nội",
  "Đà Nẵng",
  "Cần Thơ",
  "Hải Phòng",
  "Nha Trang",
];

const SearchBarWithDropdown = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [bookingType, setBookingType] = useState("hourly");
  const [searchValue, setSearchValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredLocations = allLocations.filter((loc) =>
    loc.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleInputFocus = () => setDropdownOpen(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setDropdownOpen(true);
  };

  const handleLocationClick = (location: string) => {
    setSearchValue(location);
    setDropdownOpen(false);
  };

  const handleClickAway = (e: any) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  // Render picker theo bookingType
  const renderPicker = (
    type: "checkin" | "checkout",
    label: string,
    Icon: any
  ) => {
    const isCheckIn = type === "checkin";
    const value = isCheckIn ? checkIn : checkOut;
    const setValue = isCheckIn ? setCheckIn : setCheckOut;

    const baseStyle = {
      "& .MuiOutlinedInput-root": {
        height: { xs: 48, md: 45 },
        borderRadius: 0,
        "& fieldset": { border: "1px solid #ccc" },
        "&:hover fieldset": {
          border: "1px solid rgba(152, 183, 32, 0.7)",
        },
        "&.Mui-focused fieldset": {
          border: "2px solid rgba(152, 183, 32, 1) !important",
        },
      },
    };

    switch (bookingType) {
      case "hourly":
        return (
          <TimePicker
            label={label}
            value={value}
            onChange={setValue}
            slotProps={{
              textField: {
                InputProps: {
                  startAdornment: <Icon sx={{ mr: 1, color: "#999" }} />,
                },
              },
            }}
            sx={baseStyle}
          />
        );

      case "nightly":
        return (
          <DateTimePicker
            label={label}
            value={value}
            onChange={setValue}
            slotProps={{
              textField: {
                InputProps: {
                  startAdornment: <Icon sx={{ mr: 1, color: "#999" }} />,
                },
              },
            }}
            sx={baseStyle}
          />
        );

      case "daily":
        return (
          <DatePicker
            label={label}
            value={value}
            onChange={setValue}
            slotProps={{
              textField: {
                InputProps: {
                  startAdornment: <Icon sx={{ mr: 1, color: "#999" }} />,
                },
              },
            }}
            sx={baseStyle}
          />
        );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box
          position='absolute'
          display='flex'
          width='100%'
          justifyContent='center'
          bottom='-80px'
          zIndex={10}>
          <Box width={{ xs: "90%", md: "75%" }}>
            {/* Toggle Buttons */}
            <Stack
              direction='row'
              justifyContent='center'
              spacing={1}
              sx={{ mb: "-40px" }}>
              <ToggleButtonGroup
                value={bookingType}
                exclusive
                onChange={(_, value) => value && setBookingType(value)}
                sx={{
                  bgcolor: "rgba(0, 0, 0, 0.4)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "32px",
                  padding: "16px 24px",
                  gap: "20px",
                }}>
                {[
                  { value: "hourly", icon: <AccessTime />, label: "Theo giờ" },
                  { value: "nightly", icon: <Nightlight />, label: "Qua đêm" },
                  {
                    value: "daily",
                    icon: <CalendarToday />,
                    label: "Theo ngày",
                  },
                ].map((item) => (
                  <ToggleButton
                    key={item.value}
                    value={item.value}
                    sx={{
                      px: { xs: 2, md: 4 },
                      py: 1.5,
                      color:
                        bookingType === item.value
                          ? "rgba(152, 183, 32, 1) !important"
                          : "white !important",
                      bgcolor:
                        bookingType === item.value
                          ? "white !important"
                          : "transparent !important",
                      fontWeight: 600,
                      borderRadius: "50px !important",
                      border: "none",
                      "&:hover": {
                        bgcolor:
                          bookingType === item.value
                            ? "white"
                            : "rgba(255,255,255,0.1)",
                      },
                    }}>
                    {item.icon}
                    <Box component='span' sx={{ ml: 1 }}>
                      {item.label}
                    </Box>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Stack>

            {/* Main Box */}
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
                sx={{
                  borderRadius: "50px",
                  border: "1px solid #eee",
                  p: 1,
                }}
                alignItems='stretch'>
                {/* SEARCH + DROPDOWN */}
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
                    value={searchValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    inputRef={inputRef}
                    InputProps={{
                      startAdornment: (
                        <LocationOn
                          sx={{ fontSize: 20, color: "#999", mr: 1 }}
                        />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: { xs: 48, md: 45 },
                        borderRadius: "50px 0 0 50px",
                        bgcolor: "transparent",
                        "& fieldset": { border: "1px solid #ccc" },
                        "&:hover fieldset": {
                          border: "1px solid rgba(152, 183, 32, 0.7)",
                        },
                        "&.Mui-focused fieldset": {
                          border: "2px solid rgba(152, 183, 32, 1) !important",
                        },
                      },
                    }}
                  />

                  {/* POPPER */}
                  <Popper
                    open={dropdownOpen && filteredLocations.length > 0}
                    anchorEl={inputRef.current}
                    placement='bottom-start'
                    sx={{
                      zIndex: 20,
                      width: inputRef.current?.offsetWidth || "100%",
                    }}>
                    <Paper
                      elevation={3}
                      sx={{
                        mt: 1,
                        borderRadius: "16px",
                        overflow: "hidden",
                        maxHeight: 300,
                        overflowY: "auto",
                      }}>
                      <Box>
                        <Box sx={{ p: 2, bgcolor: "#f9f9f9" }}>
                          <Typography
                            variant='subtitle2'
                            color='#666'
                            fontWeight={600}>
                            Địa chỉ
                          </Typography>
                        </Box>

                        <List disablePadding>
                          {filteredLocations.map((location, index) => (
                            <ListItemButton
                              key={index}
                              onClick={() => handleLocationClick(location)}
                              sx={{
                                px: 2,
                                py: 1.5,
                                borderBottom:
                                  index < filteredLocations.length - 1
                                    ? "1px solid #eee"
                                    : "none",
                                "&:hover": { bgcolor: "#f0f8f0" },
                              }}>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <LocationOn
                                  sx={{ fontSize: 18, color: "#999" }}
                                />
                              </ListItemIcon>

                              <ListItemText
                                primary={location}
                                primaryTypographyProps={{
                                  fontSize: "0.95rem",
                                  color: "#333",
                                  fontWeight: 500,
                                }}
                              />
                            </ListItemButton>
                          ))}
                        </List>
                      </Box>
                    </Paper>
                  </Popper>
                </Box>

                {!isMobile && (
                  <Box
                    sx={{ width: "1px", bgcolor: "#eee", alignSelf: "stretch" }}
                  />
                )}

                {/* CHECK-IN */}
                <Box
                  sx={{ flex: { md: 1 }, minWidth: { xs: "100%", md: 180 } }}>
                  {renderPicker("checkin", "Nhận phòng", Event)}
                </Box>

                {!isMobile && (
                  <Box
                    sx={{ width: "1px", bgcolor: "#eee", alignSelf: "stretch" }}
                  />
                )}

                {/* CHECK-OUT */}
                <Box
                  sx={{ flex: { md: 1 }, minWidth: { xs: "100%", md: 180 } }}>
                  {renderPicker("checkout", "Trả phòng", PeopleOutline)}
                </Box>

                {/* BUTTON */}
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
                    minWidth: { xs: "100%", md: "auto" },
                    height: { xs: 48, md: 45 },
                    "&:hover": { bgcolor: "#43a047" },
                  }}>
                  Tìm kiếm
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Box>
      </ClickAwayListener>
    </LocalizationProvider>
  );
};

export default SearchBarWithDropdown;
