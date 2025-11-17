"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  Stack,
  TextField,
  Button,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popper,
  ClickAwayListener,
  Container,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  LocationOn,
  AccessTime,
  Nightlight,
  CalendarToday,
  Search,
  KeyboardArrowDown,
  Check,
  ChevronRight,
  ChevronLeft,
} from "@mui/icons-material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useLocation } from "react-router-dom";


const allLocations = [
  "Hà Nội",
  "Đà Nẵng",
  "TP. Hồ Chí Minh",
  "Cầu Giấy, Hà Nội",
  "Hai Bà Trưng, Hà Nội",
  "Nha Trang",
  "Hải Phòng",
];

// === DROPDOWN CHỌN LOẠI (giống ảnh) ===
const BookingTypeDropdown: React.FC<{
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  value: string;
  onChange: (v: string) => void;
}> = ({ open, anchorEl, onClose, value, onChange }) => {
  const options = [
    { value: "hourly", label: "Theo giờ", icon: <AccessTime /> },
    { value: "nightly", label: "Qua đêm", icon: <Nightlight /> },
    { value: "daily", label: "Qua ngày", icon: <CalendarToday /> },
  ];

  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom-start" sx={{ zIndex: 100 }}>
      <ClickAwayListener onClickAway={onClose}>
        <Paper
          elevation={3}
          sx={{
            mt: 0.5,
            borderRadius: "12px",
            overflow: "hidden",
            width: 180,
            bgcolor: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <List disablePadding>
            {options.map((opt) => (
              <ListItemButton
                key={opt.value}
                selected={value === opt.value}
                onClick={() => {
                  onChange(opt.value);
                  onClose();
                }}
                sx={{
                  py: 1.2,
                  px: 2,
                  gap: 1.5,
                  bgcolor: "transparent",
                  "&:hover": { bgcolor: "#f9f9f9" },
                }}
              >
                <ListItemIcon sx={{ minWidth: 32, color: value === opt.value ? "#98b720" : "#888" }}>
                  {opt.icon}
                </ListItemIcon>
                <ListItemText
                  primary={opt.label}
                  primaryTypographyProps={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "#333",
                  }}
                />
                {value === opt.value && (
                  <Check sx={{ fontSize: 16, color: "#98b720", ml: "auto" }} />
                )}
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

// === DATE PICKER POPUP ===
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
export default function SearchBarWithDropdown() {
  const [bookingType, setBookingType] = useState("hourly");
  const [searchValue, setSearchValue] = useState("Hà Nội");
  const [checkIn, setCheckIn] = useState<Dayjs | null>(dayjs());
  const [checkOut, setCheckOut] = useState<Dayjs | null>(null);
  const [checkInTime, setCheckInTime] = useState<string>("10:00");
  const [checkInDuration, setCheckInDuration] = useState<number>(2);
  const location = useLocation();
  useEffect(() => {
    const saved = localStorage.getItem("filter_booking");
    if (saved) {
      const filterBooking = JSON.parse(saved);
  
      setBookingType(filterBooking.type || "hourly");
      setSearchValue(filterBooking.location || "");
      setCheckInTime(filterBooking.checkInTime || "10:00");
      setCheckInDuration(filterBooking.duration || 2);
  
      // Chuyển string → Dayjs
      setCheckIn(filterBooking.checkIn ? dayjs(filterBooking.checkIn) : null);
      setCheckOut(filterBooking.checkOut ? dayjs(filterBooking.checkOut) : null);
    }
  }, [location.pathname]);
  const inputRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  const filteredLocations = allLocations.filter(loc =>
    loc.toLowerCase().includes(searchValue.toLowerCase())
  );

  const formatDateDisplay = () => {
    if (!checkIn) return "10:00 - 12:00, 4/11";
    if (bookingType === "hourly") {
      const endHour = (parseInt(checkInTime.split(":")[0]) + checkInDuration) % 24;
      return `${checkInTime} - ${endHour.toString().padStart(2, "0")}:00, ${checkIn.format("D/M")}`;
    }
    return checkIn.format("D/M") + (checkOut ? ` - ${checkOut.format("D/M")}` : "");
  };

  const getTypeLabel = () => {
    if (bookingType === "hourly") return "Theo giờ";
    if (bookingType === "nightly") return "Qua đêm";
    return "Qua ngày";
  };
  const isLocationSelected = allLocations.includes(searchValue);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ClickAwayListener onClickAway={(e: any) => {
        if (typeRef.current && !typeRef.current.contains(e.target)) setTypeDropdownOpen(false);
        if (dateRef.current && !dateRef.current.contains(e.target)) setPickerOpen(false);
      }}>
        <Box width="70%"  >
          <Container maxWidth="md">
            {/* === THANH TÌM KIẾM === */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: "50px",
                overflow: "hidden",
                bgcolor: "white",
                border: "1px solid #ddd",
                p:1,
               
              }}
            >
              <Stack direction="row" alignItems="stretch">
                {/* Địa điểm */}
                <Box sx={{ flex: "300px 0 0", position: "relative" }}>
                  <TextField
                    fullWidth
                    placeholder="Bạn muốn đi đâu?"
                    variant="outlined"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    inputRef={inputRef}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: "#98b720", mr: 1, fontSize: 20 }} />,
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: 40,
                        borderRadius: "50px 0 0 50px",
                        "& fieldset": { border: "none" },
                      },
                    }}
                  />
                  <Popper open={searchValue && 
    filteredLocations.length > 0 && 
    !isLocationSelected } anchorEl={inputRef.current} placement="bottom-start" sx={{ zIndex: 20 }}>
                    <Paper elevation={3} sx={{ mt: 1, borderRadius: "16px", maxHeight: 300, overflow: "auto" }}>
                      <List disablePadding>
                        {filteredLocations.map((loc, i) => (
                          <ListItemButton
                            key={i}
                            onClick={() => setSearchValue(loc)}
                            sx={{ py: 1.5, borderBottom: i < filteredLocations.length - 1 ? "1px solid #eee" : "none" }}
                          >
                            <ListItemIcon sx={{ minWidth: 36 }}><LocationOn sx={{ fontSize: 18, color: "#999" }} /></ListItemIcon>
                            <ListItemText primary={loc} primaryTypographyProps={{ fontSize: "0.95rem", color: "#333", fontWeight: 500 }} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Paper>
                  </Popper>
                </Box>

                {/* Loại đặt phòng */}
                <Box
                  ref={typeRef}
                  sx={{ cursor: "pointer", flex: "0 0 200px" }}
                  onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                >
                  <Box
                    sx={{
                      height: 40,
                      px: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.5,
                      bgcolor: typeDropdownOpen ? "#f9f9f9" : "transparent",
                      borderLeft: "1px solid #eee",
                      borderRight: "1px solid #eee",
                    }}
                  >
                    {bookingType === "hourly" ? <AccessTime sx={{ color: "#98b720", fontSize: 18 }} /> :
                     bookingType === "nightly" ? <Nightlight sx={{ color: "#98b720", fontSize: 18 }} /> :
                     <CalendarToday sx={{ color: "#98b720", fontSize: 18 }} />}
                    <Typography sx={{ fontWeight: 500, color: "#333", fontSize: "0.9rem" }}>
                      {getTypeLabel()}
                    </Typography>
                    <KeyboardArrowDown sx={{ fontSize: 16, color: "#666", transition: "0.2s", transform: typeDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                  </Box>
                </Box>

                {/* Ngày giờ */}
                <Box
                  ref={dateRef}
                  sx={{ flex: 1 , cursor: "pointer" }}
                  onClick={() => setPickerOpen(true)}
                >
                  <Box
                    sx={{
                      height: 40,
                      px: 2,
                      display: "flex",
                      alignItems: "center",
                      bgcolor: pickerOpen ? "#f9f9f9" : "transparent",
                    }}
                  >
                    <Typography sx={{ flex: 1, color: "#333", fontWeight: 500, fontSize: "0.9rem" }}>
                      {formatDateDisplay()}
                    </Typography>
                  </Box>
                </Box>

                {/* Tìm kiếm */}
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "#98b720",
                    color: "white",
                    px: 1.5,
                  
                    minWidth: "auto",
                    height: 40,
                    "&:hover": { bgcolor: "#7a8f1a" },
                  }}
                >
                  <Search sx={{ fontSize: 22 }} />
                </Button>
              </Stack>
            </Paper>

            {/* Dropdown loại */}
            <BookingTypeDropdown
              open={typeDropdownOpen}
              anchorEl={typeRef.current}
              onClose={() => setTypeDropdownOpen(false)}
              value={bookingType}
              onChange={setBookingType}
            />

            {/* Popup ngày giờ */}
            <DateRangePicker
              open={pickerOpen}
              anchorEl={dateRef.current}
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

            {/* === KẾT QUẢ TÌM KIẾM === */}
           
          </Container>
        </Box>
      </ClickAwayListener>
    </LocalizationProvider>
  );
}