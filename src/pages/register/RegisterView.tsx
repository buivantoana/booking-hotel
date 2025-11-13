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

const RegisterView = () => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState("otp"); // 'register' or 'otp'
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

  const handleOtpChange = (newValue) => {
    setOtp(newValue);
  };

  const handleResendOtp = () => {
    setTimer(55);
    setIsResendEnabled(false);
    setOtp("");
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      console.log("OTP submitted:", otp);
      // Handle OTP verification
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const formatPhoneNumber = (phone) => {
    return phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3");
  };

  // OTP Verification Component
  const OtpVerification = () => (
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

        {/* RIGHT OTP FORM */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              px: { xs: 3, sm: 4, md: 8 },
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", sm: "400px", md: "486px" },
              mx: "auto",
            }}>
            {/* Tiêu đề */}
            <Typography
              sx={{
                fontSize: { xs: "28px", md: "32px" },
                fontWeight: 700,
                textAlign: "center",
                mb: 1,
              }}>
              Nhập mã xác nhận
            </Typography>

            {/* Mô tả */}
            <Typography
              sx={{
                fontSize: "16px",
                textAlign: "center",
                mb: 4,
                color: "text.secondary",
                lineHeight: 1.5,
              }}>
              Mã xác nhận đã được gửi đến số{" "}
              <Typography
                component='span'
                fontWeight={600}
                color='text.primary'
                sx={{ display: "inline" }}>
                {formatPhoneNumber(phoneNumber)}
              </Typography>
            </Typography>

            {/* OTP Input Fields với MuiOtpInput */}
            <Box component='form' onSubmit={handleOtpSubmit} sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <MuiOtpInput
                  value={otp}
                  onChange={handleOtpChange}
                  length={6}
                  sx={{
                    gap: 1,
                    "& .MuiOtpInput-TextField": {
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        height: "56px",
                        width: "56px",
                        backgroundColor: "#fff",
                        "& fieldset": {
                          borderColor: "#e0e0e0",
                          borderWidth: "1.5px",
                        },
                        "&:hover fieldset": {
                          borderColor: "#bdbdbd",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#ff7a00",
                          borderWidth: "2px",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: 500,
                        padding: "16px 8px",
                      },
                    },
                  }}
                  TextFieldsProps={{
                    placeholder: "",
                  }}
                />
              </Box>

              {/* Resend OTP */}
              <Typography
                variant='body2'
                align='center'
                color='text.secondary'
                sx={{ mb: 4 }}>
                {isResendEnabled ? (
                  <Link
                    component='button'
                    type='button'
                    onClick={handleResendOtp}
                    sx={{
                      color: "#ff7a00",
                      fontWeight: 500,
                      textDecoration: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}>
                    Gửi lại mã
                  </Link>
                ) : (
                  `Gửi lại mã trong (${formatTime(timer)})`
                )}
              </Typography>

              {/* Confirm OTP Button */}
              <Button
                type='submit'
                variant='contained'
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: "16px",
                  backgroundColor: "#ff7a00",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "18px",
                  height: "56px",
                  "&:hover": {
                    backgroundColor: "#e66a00",
                  },
                  boxShadow: "none",
                }}>
                Xác nhận OTP
              </Button>
            </Box>

            {/* Back to register */}
            <Typography
              variant='body2'
              align='center'
              color='text.secondary'
              sx={{ mt: 2 }}>
              <Link
                component='button'
                type='button'
                onClick={() => setCurrentStep("register")}
                sx={{
                  color: "#ff7a00",
                  fontWeight: 500,
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: "14px",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}>
                Quay lại đăng ký
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );

  // Registration Component
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
              Đăng ký Hotel Booking
            </Typography>

            <Typography sx={{ fontSize: "16px" }} mb={4} color='text.secondary'>
              Đăng ký để đặt phòng với những ưu đãi độc quyền dành cho thành
              viên.
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
              <Typography fontSize={14} fontWeight={500} mb={0.5}>
                Tên của bạn
              </Typography>
              <TextField
                fullWidth
                placeholder='Nhập tên của bạn'
                variant='outlined'
                value={name}
                onChange={(e) => setName(e.target.value)}
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

              {/* NGÀY SINH */}
              <Typography fontSize={14} fontWeight={500} mb={0.5}>
                Ngày sinh của bạn
              </Typography>
              <TextField
                fullWidth
                type='date'
                variant='outlined'
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
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

              {/* AGREEMENT */}
              <Typography
                sx={{ fontSize: "14px" }}
                display='block'
                mb={3}
                color='text.secondary'>
                Bằng việc đăng kí tài khoản, tôi đồng ý với{" "}
                <Link
                  href='#'
                  sx={{
                    color: "#9AC700",
                    fontWeight: 500,
                    textDecoration: "underline",
                    "&:hover": { textDecoration: "underline" },
                  }}>
                  điều khoản và chính sách bảo mật
                </Link>{" "}
                của Hotel Booking
              </Typography>

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
                Đăng ký
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
                Bạn đã có tài khoản Booking Hotel?{" "}
                <Link
                  href='#'
                  sx={{
                    color: "#ff7a00",
                    fontWeight: 500,
                    textDecoration: "underline",
                    "&:hover": { textDecoration: "underline" },
                  }}>
                  Đăng nhập ngay
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );

  return currentStep === "register" ? (
    <RegistrationForm />
  ) : (
    <OtpVerification />
  );
};

export default RegisterView;
