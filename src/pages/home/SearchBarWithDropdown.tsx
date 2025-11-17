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
  IconButton,
  Container,
} from "@mui/material";

import {
  LocationOn,
  AccessTime,
  Nightlight,
  CalendarToday,
  Event,
  PeopleOutline,
  Search,
  KeyboardArrowDown,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import in_time from "../../images/login.png";
import out_time from "../../images/logout.png";
import { useNavigate } from "react-router-dom";
// === POPUP CHUNG ===
interface DateRangePickerProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onApply: (
    checkIn: Dayjs | null,
    checkOut: Dayjs | null,
    time?: string,
    duration?: number
  ) => void;
  bookingType: "hourly" | "nightly" | "daily";
  initialCheckIn?: Dayjs | null;
  initialCheckOut?: Dayjs | null;
  initialTime?: string | null;
  initialDuration?: number | null;
}
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
const DateRangePicker: React.FC<DateRangePickerProps> = ({
  open,
  anchorEl,
  onClose,
  onApply,
  bookingType,
  initialCheckIn,
  initialCheckOut,
  initialTime,
  initialDuration,
}) => {
  const [checkIn, setCheckIn] = useState<Dayjs | null>(initialCheckIn);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(initialCheckOut);
  const [time, setTime] = useState<string>(initialTime || "10:00");
  const [duration, setDuration] = useState<number>(initialDuration || 2);

  const hours = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];
  const durations = [2, 3, 4, 5, 6, 8, 10, 12];

  const hourIndex = hours.indexOf(time);
  const durationIndex = durations.indexOf(duration);

  const handleApply = () => {
    if (bookingType === "hourly" && checkIn) {
      const endTime = checkIn
        .hour(parseInt(time.split(":")[0]))
        .minute(0)
        .add(duration, "hour");
      onApply(checkIn, endTime, time, duration);
    } else {
      onApply(checkIn, checkOut);
    }
    onClose();
  };

  const handleReset = () => {
    setCheckIn(null);
    setCheckOut(null);
    setTime("10:00");
    setDuration(2);
  };

  const handleDateSelect = (date: Dayjs, isSecondCalendar: boolean = false) => {
    if (bookingType === "nightly") {
      setCheckIn(date);
      setCheckOut(date.add(1, "day"));
    } else if (bookingType === "daily") {
      if (!checkIn || (checkOut && date.isBefore(checkIn))) {
        setCheckIn(date);
        setCheckOut(null);
      } else if (!checkOut && date.isAfter(checkIn)) {
        setCheckOut(date);
      } else {
        setCheckIn(date);
        setCheckOut(null);
      }
    } else if (bookingType === "hourly") {
      setCheckIn(date);
    }
  };

  if (!open || !anchorEl) return null;

  const endTime = checkIn
    ? checkIn
        .hour(parseInt(time.split(":")[0]))
        .minute(0)
        .add(duration, "hour")
    : null;

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement='bottom-start'
      sx={{ zIndex: 50 }}>
      <Paper
        elevation={8}
        sx={{
          mt: 1,
          borderRadius: "24px",
          overflow: "hidden",
          width: {
            xs: 340,
            sm:
              bookingType === "hourly"
                ? 760
                : bookingType === "daily"
                ? 680
                : 380,
          },
          bgcolor: "white",
        }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack>
            {/* Header */}
            <Box p={2} bgcolor='#f9f9f9' borderBottom='1px solid #eee'>
              <Typography fontWeight={600} color='#333'>
                {checkIn?.format("Tháng MM, YYYY") || "Tháng 11, 2025"}
              </Typography>
            </Box>

            {bookingType === "hourly" ? (
              /* === THEO GIỜ === */
              <Stack direction={{ xs: "column", sm: "row" }} spacing={0}>
                {/* Calendar */}
                <Box sx={{ flex: 1, p: 1 }}>
                  <DateCalendar
                    value={checkIn}
                    onChange={() => {}}
                    disablePast
                    sx={{
                      width: "100%",
                      "& .MuiPickersDay-root": {
                        borderRadius: "50%",
                        "&.Mui-selected": {
                          bgcolor: "rgba(152, 183, 32, 1) !important",
                          color: "white",
                        },
                      },
                    }}
                    slots={{
                      day: (props) => {
                        const isSelected = checkIn?.isSame(props.day, "day");
                        return (
                          <Button
                            {...props}
                            onClick={() => handleDateSelect(props.day)}
                            sx={{
                              minWidth: 36,
                              height: 36,
                              borderRadius: "50%",
                              bgcolor: isSelected
                                ? "rgba(152, 183, 32, 1)"
                                : "transparent",
                              color: isSelected ? "white" : "inherit",
                              "&:hover": { bgcolor: "#f0f8f0" },
                            }}>
                            {props.day.format("D")}
                          </Button>
                        );
                      },
                    }}
                  />
                </Box>

                {/* Giờ + Số giờ + Trả phòng */}
                <Box sx={{ flex: 1, p: 2, bgcolor: "#fafafa" }}>
                  {/* Giờ nhận */}
                  <Box mb={2}>
                    <Typography
                      fontWeight={500}
                      mb={1}
                      color='#666'
                      fontSize='0.95rem'>
                      Giờ nhận phòng
                    </Typography>
                    <Stack direction='row' alignItems='center' spacing={1}>
                      <IconButton
                        size='small'
                        onClick={() =>
                          setTime(hours[Math.max(0, hourIndex - 1)])
                        }
                        disabled={hourIndex <= 0}>
                        <ChevronLeft />
                      </IconButton>
                      <Stack
                        direction='row'
                        spacing={1}
                        flex={1}
                        justifyContent='center'>
                        {hours
                          .slice(
                            Math.max(0, hourIndex - 1),
                            Math.min(hours.length, hourIndex + 3)
                          )
                          .map((h) => (
                            <Button
                              key={h}
                              variant={time === h ? "contained" : "text"}
                              size='small'
                              onClick={() => setTime(h)}
                              sx={{
                                minWidth: 60,
                                borderRadius: "12px",
                                fontSize: "0.85rem",
                                bgcolor:
                                  time === h
                                    ? "rgba(152, 183, 32, 1)"
                                    : "#f5f5f5",
                                color: time === h ? "white" : "#666",
                                "&:hover": {
                                  bgcolor:
                                    time === h
                                      ? "rgba(152, 183, 32, 0.8)"
                                      : "#e0e0e0",
                                },
                              }}>
                              {h}
                            </Button>
                          ))}
                      </Stack>
                      <IconButton
                        size='small'
                        onClick={() =>
                          setTime(
                            hours[Math.min(hours.length - 1, hourIndex + 1)]
                          )
                        }
                        disabled={hourIndex >= hours.length - 1}>
                        <ChevronRight />
                      </IconButton>
                    </Stack>
                  </Box>

                  {/* Số giờ */}
                  <Box mb={2}>
                    <Typography
                      fontWeight={500}
                      mb={1}
                      color='#666'
                      fontSize='0.95rem'>
                      Số giờ sử dụng
                    </Typography>
                    <Stack direction='row' alignItems='center' spacing={1}>
                      <IconButton
                        size='small'
                        onClick={() =>
                          setDuration(durations[Math.max(0, durationIndex - 1)])
                        }
                        disabled={durationIndex <= 0}>
                        <ChevronLeft />
                      </IconButton>
                      <Stack
                        direction='row'
                        spacing={1}
                        flex={1}
                        justifyContent='center'>
                        {durations
                          .slice(
                            Math.max(0, durationIndex - 1),
                            Math.min(durations.length, durationIndex + 3)
                          )
                          .map((d) => (
                            <Button
                              key={d}
                              variant={duration === d ? "contained" : "text"}
                              size='small'
                              onClick={() => setDuration(d)}
                              sx={{
                                minWidth: 60,
                                borderRadius: "12px",
                                fontSize: "0.85rem",
                                bgcolor:
                                  duration === d
                                    ? "rgba(152, 183, 32, 1)"
                                    : "#f5f5f5",
                                color: duration === d ? "white" : "#666",
                                "&:hover": {
                                  bgcolor:
                                    duration === d
                                      ? "rgba(152, 183, 32, 0.8)"
                                      : "#e0e0e0",
                                },
                              }}>
                              {d} Giờ
                            </Button>
                          ))}
                      </Stack>
                      <IconButton
                        size='small'
                        onClick={() =>
                          setDuration(
                            durations[
                              Math.min(durations.length - 1, durationIndex + 1)
                            ]
                          )
                        }
                        disabled={durationIndex >= durations.length - 1}>
                        <ChevronRight />
                      </IconButton>
                    </Stack>
                  </Box>

                  {/* Trả phòng */}
                  <Box
                    p={2}
                    bgcolor='white'
                    borderRadius='12px'
                    border='1px solid #eee'>
                    <Typography
                      fontWeight={500}
                      color='#666'
                      fontSize='0.9rem'
                      mb={0.5}>
                      Trả phòng
                    </Typography>
                    <Typography fontWeight={600} color='#333'>
                      {endTime
                        ? `${endTime.format("HH:mm, DD/MM/YYYY")}`
                        : "Chưa chọn"}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            ) : (
              /* === QUA ĐÊM / THEO NGÀY === */
              <Stack direction='row' spacing={0}>
                {/* Tháng 1 */}
                <Box sx={{ flex: 1, p: 1, borderRight: "1px solid #eee" }}>
                  <DateCalendar
                    value={checkIn}
                    onChange={() => {}}
                    disablePast
                    sx={{
                      width: "100%",
                      "& .MuiPickersDay-root": {
                        borderRadius: "50%",
                        "&.Mui-selected": {
                          bgcolor: "rgba(152, 183, 32, 1) !important",
                          color: "white",
                        },
                      },
                    }}
                    slots={{
                      day: (props) => {
                        const isStart = checkIn?.isSame(props.day, "day");
                        const isEnd = checkOut?.isSame(props.day, "day");
                        const isInRange =
                          checkIn &&
                          checkOut &&
                          props.day.isAfter(checkIn) &&
                          props.day.isBefore(checkOut);

                        return (
                          <Button
                            {...props}
                            onClick={() => handleDateSelect(props.day)}
                            sx={{
                              minWidth: 36,
                              height: 36,
                              borderRadius: isStart || isEnd ? "50%" : "8px",
                              bgcolor:
                                isStart || isEnd
                                  ? "rgba(152, 183, 32, 1)"
                                  : isInRange
                                  ? "#f0f8f0"
                                  : "transparent",
                              color: isStart || isEnd ? "white" : "inherit",
                              "&:hover": { bgcolor: "#e8f5e8" },
                            }}>
                            {props.day.format("D")}
                          </Button>
                        );
                      },
                    }}
                  />
                </Box>

                {/* Tháng 2 - Chỉ khi "Theo ngày" */}
                {bookingType === "daily" && (
                  <Box sx={{ flex: 1, p: 1 }}>
                    <DateCalendar
                      value={checkIn}
                      onChange={() => {}}
                      disablePast
                      sx={{
                        width: "100%",
                        "& .MuiPickersDay-root": {
                          borderRadius: "50%",
                          "&.Mui-selected": {
                            bgcolor: "rgba(152, 183, 32, 1) !important",
                            color: "white",
                          },
                        },
                      }}
                      slots={{
                        day: (props) => {
                          const isStart = checkIn?.isSame(props.day, "day");
                          const isEnd = checkOut?.isSame(props.day, "day");
                          const isInRange =
                            checkIn &&
                            checkOut &&
                            props.day.isAfter(checkIn) &&
                            props.day.isBefore(checkOut);

                          return (
                            <Button
                              {...props}
                              onClick={() => handleDateSelect(props.day)}
                              sx={{
                                minWidth: 36,
                                height: 36,
                                borderRadius: isStart || isEnd ? "50%" : "8px",
                                bgcolor:
                                  isStart || isEnd
                                    ? "rgba(152, 183, 32, 1)"
                                    : isInRange
                                    ? "#f0f8f0"
                                    : "transparent",
                                color: isStart || isEnd ? "white" : "inherit",
                                "&:hover": { bgcolor: "#e8f5e8" },
                              }}>
                              {props.day.format("D")}
                            </Button>
                          );
                        },
                      }}
                    />
                  </Box>
                )}
              </Stack>
            )}

            {/* Footer */}
            <Stack
              direction='row'
              justifyContent='space-between'
              p={2}
              bgcolor='#f9f9f9'
              borderTop='1px solid #eee'>
              <Button
                variant='outlined'
                onClick={handleReset}
                sx={{
                  borderRadius: "50px",
                  color: "#666",
                  borderColor: "#ddd",
                  textTransform: "none",
                  fontSize: "0.9rem",
                }}>
                {bookingType === "hourly" ? "Ngày giờ bất kỳ" : "Ngày bất kỳ"}
              </Button>
              <Button
                variant='contained'
                onClick={handleApply}
                sx={{
                  bgcolor: "rgba(152, 183, 32, 1)",
                  color: "white",
                  borderRadius: "50px",
                  px: 4,
                  textTransform: "none",
                  fontSize: "0.9rem",
                  "&:hover": { bgcolor: "#43a047" },
                }}>
                Áp dụng
              </Button>
            </Stack>
          </Stack>
        </LocalizationProvider>
      </Paper>
    </Popper>
  );
};

// === MAIN COMPONENT ===
const SearchBarWithDropdown = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate()
  const [bookingType, setBookingType] = useState<
    "hourly" | "nightly" | "daily"
  >("hourly");
  const [searchValue, setSearchValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(null);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkInDuration, setCheckInDuration] = useState<number | null>(null);

  const checkInRef = useRef<HTMLDivElement>(null);
  const checkOutRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [pickerOpen, setPickerOpen] = useState(false); // Chỉ 1 popup

  const filteredLocations = allLocations.filter((loc) =>
    loc.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleLocationClick = (loc: string) => {
    setSearchValue(loc);
    setDropdownOpen(false);
  };

  const handleClickAway = (e: any) => {
    if (inputRef.current && !inputRef.current.contains(e.target))
      setDropdownOpen(false);
    if (checkInRef.current && !checkInRef.current.contains(e.target))
      setPickerOpen(false);
    if (checkOutRef.current && !checkOutRef.current.contains(e.target))
      setPickerOpen(false);
  };

  const formatCheckIn = () => {
    if (!checkIn) return "Nhận phòng";
    if (bookingType === "hourly" && checkInTime)
      return `${checkInTime}, ${checkIn.format("DD/MM")}`;
    return checkIn.format(bookingType === "daily" ? "DD/MM/YYYY" : "DD/MM");
  };

  const formatCheckOut = () => {
    if (!checkOut) return "Trả phòng";
    if (bookingType === "hourly") {
      return checkOut.format("HH:mm, DD/MM");
    }
    return checkOut.format(bookingType === "daily" ? "DD/MM/YYYY" : "DD/MM");
  };

  const handleSearch = () => {
    const searchParams = {
      location: searchValue,
      type: bookingType,
      checkIn: checkIn ? checkIn.format("YYYY-MM-DD") : null, // string
      checkOut: checkOut ? checkOut.format("YYYY-MM-DD") : null, // string
      checkInTime: checkInTime,
      duration: checkInDuration,
    };
  
    localStorage.setItem("filter_booking", JSON.stringify(searchParams));
    
    setTimeout(() => {
      navigate("/rooms");
    }, 300);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box
          position='absolute'
          width='100%'
          display='flex'
          justifyContent='center'
          bottom='-80px'
          zIndex={10}>
          <Container maxWidth="lg" >
            {/* Toggle */}
            <Stack direction='row' justifyContent='center' sx={{ mb: "-40px" }}>
              <ToggleButtonGroup
                value={bookingType}
                exclusive
                onChange={(_, v) => v && setBookingType(v)}
                sx={{
                  bgcolor: "rgba(0,0,0,0.4)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "32px",
                  p: "16px 24px",
                  gap: "20px",
                }}>
                {[
                  { v: "hourly", i: <AccessTime />, l: "Theo giờ" },
                  { v: "nightly", i: <Nightlight />, l: "Qua đêm" },
                  { v: "daily", i: <CalendarToday />, l: "Theo ngày" },
                ].map((x) => (
                  <ToggleButton
                    key={x.v}
                    value={x.v}
                    sx={{
                      px: { xs: 2, md: 4 },
                      py: 1,
                      color:
                        bookingType === x.v
                          ? "rgba(152, 183, 32, 1) !important"
                          : "white",
                      bgcolor:
                        bookingType === x.v
                          ? "white !important"
                          : "transparent",
                      fontWeight: 600,
                      borderRadius: "50px !important",
                      border: "none",
                      "&:hover": {
                        bgcolor:
                          bookingType === x.v
                            ? "white"
                            : "rgba(255,255,255,0.1)",
                      },
                    }}>
                    {x.i}
                    <Box component='span' sx={{ ml: 1,textTransform:"none" }}>
                      {x.l}
                    </Box>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Stack>

            {/* Main Bar */}
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
                {/* Địa điểm */}
                <Box sx={{ flex: { md: 1 }, position: "relative" }}>
                  <TextField
                    fullWidth
                    placeholder='Bạn muốn đi đâu?'
                    variant='outlined'
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                      setDropdownOpen(true);
                    }}
                    onFocus={() => setDropdownOpen(true)}
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
                        "& fieldset": { border: "none !important" },

                        "&:hover": { borderColor: "none !important" },
                        "&.Mui-focused": {
                          borderColor: "none !important",
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                  <Popper
                    open={dropdownOpen && filteredLocations.length > 0}
                    anchorEl={inputRef.current}
                    placement='bottom-start'
                    sx={{ zIndex: 20, width: "18%" }}>
                    <Paper
                      elevation={3}
                      className='hidden-add-voice'
                      sx={{
                        mt: 1,
                        borderRadius: "16px",
                        overflow: "hidden",
                        maxHeight: 300,
                        overflowY: "auto",
                      }}>
                      <Box p={2} bgcolor='#f9f9f9'>
                        <Typography
                          variant='subtitle2'
                          color='#666'
                          fontWeight={600}>
                          Địa chỉ
                        </Typography>
                      </Box>
                      <List disablePadding>
                        {filteredLocations.map((loc, i) => (
                          <ListItemButton
                            key={i}
                            onClick={() => handleLocationClick(loc)}
                            sx={{
                              px: 2,
                              py: 1.5,
                              borderBottom:
                                i < filteredLocations.length - 1
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
                              primary={loc}
                              primaryTypographyProps={{
                                fontSize: "0.95rem",
                                color: "#333",
                                fontWeight: 500,
                              }}
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    </Paper>
                  </Popper>
                </Box>

                {!isMobile && (
                  <Box
                    sx={{ width: "1px", bgcolor: "#eee", alignSelf: "stretch" }}
                  />
                )}

                {/* Nhận phòng */}
                <Box
                  ref={checkInRef}
                  sx={{ flex: { md: 1 }, cursor: "pointer" }}
                  onClick={() => setPickerOpen(true)}>
                  <Box
                    sx={{
                      height: { xs: 48, md: 45 },
                      px: 2,
                      display: "flex",
                      alignItems: "center",

                      backgroundColor: pickerOpen ? "#f9f9f9" : "transparent",
                    }}>
                    <img
                      src={in_time}
                      width={20}
                      height={20}
                      style={{ marginRight: "5px" }}
                      alt=''
                    />
                    <Typography
                      sx={{
                        flex: 1,
                        color: checkIn ? "#333" : "#999",
                        fontWeight: checkIn ? 500 : 400,
                      }}>
                      {formatCheckIn()}
                    </Typography>
                    <KeyboardArrowDown
                      sx={{
                        fontSize: 18,
                        color: "#999",
                        transform: pickerOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "0.2s",
                      }}
                    />
                  </Box>
                </Box>

                {/* Trả phòng */}
                <Box
                  ref={checkOutRef}
                  sx={{ flex: { md: 1 }, cursor: "pointer" }}
                  onClick={() => setPickerOpen(true)}>
                  <Box
                    sx={{
                      height: { xs: 48, md: 45 },
                      px: 2,
                      display: "flex",
                      alignItems: "center",

                      backgroundColor: pickerOpen ? "#f9f9f9" : "transparent",
                    }}>
                    <img
                      src={out_time}
                      width={20}
                      height={20}
                      style={{ marginRight: "5px" }}
                      alt=''
                    />
                    <Typography
                      sx={{
                        flex: 1,
                        color: checkOut ? "#333" : "#999",
                        fontWeight: checkOut ? 500 : 400,
                      }}>
                      {formatCheckOut()}
                    </Typography>
                    <KeyboardArrowDown
                      sx={{
                        fontSize: 18,
                        color: "#999",
                        transform: pickerOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "0.2s",
                      }}
                    />
                  </Box>
                </Box>

                {/* Popup duy nhất */}
                <DateRangePicker
                  open={pickerOpen}
                  anchorEl={checkInRef.current || checkOutRef.current}
                  onClose={() => setPickerOpen(false)}
                  onApply={(ci, co, t, d) => {
                    setCheckIn(ci);
                    setCheckOut(co);
                    if (t) setCheckInTime(t);
                    if (d) setCheckInDuration(d);
                  }}
                  bookingType={bookingType}
                  initialCheckIn={checkIn}
                  initialCheckOut={checkOut}
                  initialTime={checkInTime}
                  initialDuration={checkInDuration}
                />

                {/* Tìm kiếm */}
                <Button
                  variant='contained'
                  onClick={handleSearch}
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
          </Container>
        </Box>
      </ClickAwayListener>
    </LocalizationProvider>
  );
};

export default SearchBarWithDropdown;
