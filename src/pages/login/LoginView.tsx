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
import { Login, checkUser } from "../../service/admin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../App";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = "285312507829-8puo8pp5kikc3ahdivtr9ehq1fm3kkks.apps.googleusercontent.com";
const LoginView = () => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState("register"); // 'register' or 'pin'
  const [phoneNumber, setPhoneNumber] = useState("");




  return (
    <>
      {currentStep === "register" && <RegistrationForm setPhoneNumber={setPhoneNumber} phoneNumber={phoneNumber} setCurrentStep={setCurrentStep} />}

      {currentStep === "pin" && <PinCreation phoneNumber={phoneNumber} />}
    </>)
};

export default LoginView;
const RegistrationForm = ({setCurrentStep,setPhoneNumber,phoneNumber}) => {
 
  const [touched, setTouched] = useState(false);

  const handleRegister = async () => {
    try {
      let result = await checkUser({
        "type": "phone",
        "value": "0"+phoneNumber
    })
    if(result.code == "OK"){
      setCurrentStep("pin")
    }else{
      toast.error(result.message)
    }
    } catch (error) {
      console.log(error)
    }
  }
  const isValidPhone = (phoneNumber) => {
    return /^[1-9][0-9]{8,9}$/.test(phoneNumber);
  };
  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google login success:", credentialResponse);
    // Gửi credentialResponse.credential về backend để xác thực token
  };

  const handleGoogleError = () => {
    console.log("Google login failed");
  };
  return (
    <Container
      maxWidth='lg'
      sx={{ display: "flex", alignItems: "center", py: 5 }}>
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
            alignItems: "start",
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
        <Grid item sx={{ display: "flex", justifyContent: "end" }} xs={12} md={6}>
          <Box
            sx={{
              px: { xs: 3, sm: 4, md: 0 },
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", sm: "400px", md: "486px" },

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

            <Box  >
              {/* SỐ ĐIỆN THOẠI */}
              <Typography fontSize={14} fontWeight={500} mb={0.5}>
                Số điện thoại
              </Typography>
              <TextField
                fullWidth
                placeholder="Nhập số điện thoại"
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                onBlur={() => setTouched(true)}   // chỉ validate khi blur
                error={touched && !isValidPhone(phoneNumber)}
                helperText={
                  touched && !isValidPhone(phoneNumber)
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
                    <InputAdornment position="start">
                      <img
                        src={vn}
                        alt="vn"
                        style={{
                          width: 28,
                          height: 20,
                          borderRadius: 4,
                          objectFit: "cover",
                          marginRight: 8,
                        }}
                      />
                      <Typography sx={{ fontSize: 14, marginRight: 1 }}>+84</Typography>
                    </InputAdornment>
                  ),
                  endAdornment:
                    touched && !isValidPhone(phoneNumber) ? (
                      <InputAdornment position="end">
                        <Box
                          sx={{
                            cursor: "pointer",
                            fontSize: 22,
                            color: "#999",
                          }}
                          onClick={() => {
                            setPhoneNumber("");
                            setTouched(false); // reset error khi xóa
                          }}
                        >
                          ✕
                        </Box>
                      </InputAdornment>
                    ) : null,
                }}
              />



              {/* TÊN */}


              {/* NGÀY SINH */}


              {/* AGREEMENT */}


              {/* REGISTER BUTTON */}
              <Button
               onClick={handleRegister}
                variant='contained'
                fullWidth
                disabled={!phoneNumber || !isValidPhone(phoneNumber)}
                sx={{
                  mb: 3,
                  py: 1.5,
                  borderRadius: "16px",
                  backgroundColor:
                    !phoneNumber ? "#e0e0e0" : "#98b720",
                  color: !phoneNumber ? "#888" : "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "18px",
                  height: "56px",
                  "&:hover": {
                    backgroundColor:
                      !phoneNumber
                        ? "#e0e0e0"
                        : "#98b720",
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
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
         <GoogleCustomButton onSuccess={handleGoogleSuccess} onError={handleGoogleError}/>
        </GoogleOAuthProvider>
                 
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
  )
};

const PinCreation = ({phoneNumber}) => {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const navigate = useNavigate()
  const context = useBookingContext()
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (pin.length === 6 ) {
      let result = await Login({
        "platform": "ios",
        "type": "phone",
        "value": "0"+phoneNumber,
        "password": pin
    })
    if(result.access_token){
      localStorage.setItem("access_token",result.access_token)
      localStorage.setItem("refresh_token",result.refresh_token)
      localStorage.setItem("user",JSON.stringify(result.user))
      context.dispatch({
        type: "LOGIN",
        payload: {
          ...context.state,
          user: { ...result.user },
        },
      });
      toast.success("Login success")
      setTimeout(()=>{
        navigate("/")
      },300)
    }else{
      toast.error(result.message)
    }
     
    }
  };

  const toggleShowPin = () => setShowPin(!showPin);

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", alignItems: "center",py:8 }}
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
        <Grid item xs={12} display={"flex"} justifyContent={"end"} md={6}>
          <Box
            sx={{
              
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", sm: "400px", md: "486px" },
              
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
               Hi,+84{phoneNumber}
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

                    cursor: "pointer",
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

            


              <Button
                type="submit"
                fullWidth
                disabled={pin.length !== 6 }
                sx={{
                  py: 1.6,
                  borderRadius: "30px",
                  backgroundColor:
                    pin.length === 6 
                      ? "#9AC700"
                      : "#e0e0e0",
                  color:
                    pin.length === 6  ? "#fff" : "#888",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "18px",
                  height: "56px",
                  "&:hover": {
                    backgroundColor:
                      pin.length === 6 
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


// GoogleCustomButton.tsx
import { useGoogleLogin } from '@react-oauth/google';

interface GoogleCustomButtonProps {
  onSuccess: (response: any) => void;
  onError: () => void;
}

 function GoogleCustomButton({ onSuccess, onError }: GoogleCustomButtonProps) {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log('Google Login Success:', codeResponse);
      onSuccess(codeResponse);
    },
    onError: () => {
      console.error('Google Login Failed');
      onError();
    },
  });

  return (
    <Button
                    variant='outlined'
                    onClick={()=>{
                      login()
                    }}
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
  );
}