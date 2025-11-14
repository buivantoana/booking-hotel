import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Link,
  useTheme,
} from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FlagIcon from "@mui/icons-material/Flag";
import image_left from "../../images/Frame 1321317999.png";
import google from "../../images/Social media logo.png";
import apple from "../../images/Group.png";
import vn from "../../images/VN - Vietnam.png";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const LoginView = () => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState("pin"); // 'register' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState("123456789");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [otp, setOtp] = useState("2222");
  const [timer, setTimer] = useState(55);
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && currentStep === "otp") {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      setIsResendEnabled(true);
    }
  }, [timer, currentStep]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (phoneNumber && name && birthDate) {
      setCurrentStep("otp");
      setTimer(55);
      setIsResendEnabled(false);
    }
  };

  
  const RegistrationForm = () => (
    <Container
      maxWidth='xl'
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
      <Grid
        container
        sx={{
          alignItems: "center",
          minHeight: "60vh",
        }}>
        {/* LEFT ILLUSTRATION */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Box
            component='img'
            src={image_left}
            alt='Hotel illustration'
            sx={{
              width: "592px",
              height: "557px",
              maxWidth: "100%",
            }}
          />
        </Grid>

        {/* RIGHT FORM */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              px: { xs: 3, sm: 4, md: 8 },
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", sm: "400px", md: "486px" },
              mx: "auto",
            }}>
            <Typography
              sx={{ fontSize: { xs: "28px", md: "32px" } }}
              fontWeight={700}
              mb={1}>
             Hotel Booking xin chào!
            </Typography>

            <Typography sx={{ fontSize: "16px" }} mb={4} color='text.secondary'>
            Đăng nhập để đặt phòng với những ưu đãi độc quyền dành cho thành viên.
            </Typography>

            <Box component='form' onSubmit={handleRegister}>
              {/* SỐ ĐIỆN THOẠI */}
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

              {/* TÊN */}
             

              {/* NGÀY SINH */}
             

              {/* AGREEMENT */}
              

              {/* REGISTER BUTTON */}
              <Button
                type='submit'
                variant='contained'
                fullWidth
                disabled={!phoneNumber || !name || !birthDate}
                sx={{
                  mb: 3,
                  py: 1.5,
                  borderRadius: "16px",
                  backgroundColor:
                    !phoneNumber || !name || !birthDate ? "#e0e0e0" : "#ff7a00",
                  color: !phoneNumber || !name || !birthDate ? "#888" : "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "18px",
                  height: "56px",
                  "&:hover": {
                    backgroundColor:
                      !phoneNumber || !name || !birthDate
                        ? "#e0e0e0"
                        : "#e66a00",
                  },
                  boxShadow: "none",
                }}>
               Đăng nhập
              </Button>

              <Typography
                variant='body2'
                align='center'
                mb={2}
                color='text.secondary'>
                Hoặc
              </Typography>

              {/* SOCIAL BUTTONS */}
              <Grid container spacing={2} mb={3}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant='outlined'
                    fullWidth
                    sx={{
                      py: 1.2,
                      textTransform: "none",
                      fontWeight: 500,
                      borderRadius: 3,
                      borderColor: "#e0e0e0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      "&:hover": { borderColor: "#bdbdbd" },
                    }}>
                    <Box
                      component='img'
                      src={apple}
                      alt='Apple'
                      sx={{ width: 20 }}
                    />
                    Sign up with Apple
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant='outlined'
                    fullWidth
                    sx={{
                      py: 1.2,
                      textTransform: "none",
                      fontWeight: 500,
                      borderRadius: 3,
                      borderColor: "#e0e0e0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      "&:hover": { borderColor: "#bdbdbd" },
                    }}>
                    <Box
                      component='img'
                      src={google}
                      alt='Google'
                      sx={{ width: 23 }}
                    />
                    Sign up with Google
                  </Button>
                </Grid>
              </Grid>

              {/* LOGIN LINK */}
              <Typography sx={{ fontSize: "14px" }} color='text.secondary'>
              Bạn chưa có tài khoản Booking Hotel?
                <Link
                  href='#'
                  sx={{
                    color: "#ff7a00",
                    fontWeight: 500,
                    textDecoration: "underline",
                    "&:hover": { textDecoration: "underline" },
                  }}>
                  Đăng ký ngay
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );

  return (
  <>
    {currentStep === "register" && <RegistrationForm />}
    
    {currentStep === "pin" && <PinCreation />}
  </>)
};

export default LoginView;

// PIN Creation Component
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

// ... trong PinCreation component

const PinCreation = () => {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.length === 6 && pin === confirmPin) {
      console.log("PIN created:", pin);
      // Handle success
    }
  };

  const toggleShowPin = () => setShowPin(!showPin);
  const toggleShowConfirmPin = () => setShowConfirmPin(!showConfirmPin);

  return (
    <Container
      maxWidth="xl"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Grid
        container
        sx={{
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        {/* LEFT ILLUSTRATION */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={image_left}
            alt="Hotel illustration"
            sx={{
              width: "592px",
              height: "557px",
              maxWidth: "100%",
            }}
          />
        </Grid>

        {/* RIGHT PIN FORM */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              px: { xs: 3, sm: 4, md: 8 },
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", sm: "400px", md: "486px" },
              mx: "auto",
            }}
          >
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
              }}
            >
              <ArrowBackIosNewIcon />
              Tạo mã PIN của bạn
            </Typography>
            </Box>

            {/* DESCRIPTION */}
           
            {/* PIN INPUT FORM */}
            <Box component="form" onSubmit={handleSubmit}>
              {/* NHẬP MÃ PIN */}
              <Box display={"flex"} mb={2} justifyContent={"space-between"}>
              <Typography fontSize={14} color="#5D6679" fontWeight={500} mb={1.5}>
              Mã PIN của sẽ được dùng để đăng nhập
              </Typography>
              <Typography
              color="#5D6679"
               onClick={toggleShowPin}
               fontSize={14}
              sx={{
               
                cursor:"pointer",
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
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
                }}
              >
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
                    width:"100%",
                    justifyContent:"space-between",
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
                variant="body2"
                sx={{
                  mb: 4,
                  color: "#FF7A00",
                  fontSize: "14px",
                  fontWeight: 500,
                  
                }}
              >
                <Link
                  href="#"
                  sx={{
                    cursor: "pointer",
                    color: "#FF7A00",
                    textDecoration: "underline",
                  }}
                >
                  Quên mã PIN?
                </Link>
              </Typography>

              {/* ERROR MESSAGE */}
              {confirmPin && pin !== confirmPin && (
                <Typography
                  sx={{
                    color: "#f44336",
                    fontSize: "14px",
                    mb: 2,
                    fontWeight: 500,
                  }}
                >
                  Mã PIN không khớp. Vui lòng nhập lại.
                </Typography>
              )}

             
              <Button
                type="submit"
                fullWidth
                disabled={pin.length !== 6 || pin !== confirmPin}
                sx={{
                  py: 1.6,
                  borderRadius: "30px",
                  backgroundColor:
                    pin.length === 6 && pin === confirmPin
                      ? "#9AC700"
                      : "#e0e0e0",
                  color:
                    pin.length === 6 && pin === confirmPin ? "#fff" : "#888",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "18px",
                  height: "56px",
                  "&:hover": {
                    backgroundColor:
                      pin.length === 6 && pin === confirmPin
                        ? "#7cb400"
                        : "#e0e0e0",
                  },
                }}
              >
                Tiếp tục
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};