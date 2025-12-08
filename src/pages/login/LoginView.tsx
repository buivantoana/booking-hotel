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
  CircularProgress,
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
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Login,
  LoginApple,
  LoginGoogle,
  checkUser,
  sendOtp,
  userUpdate,
  verifyOtp,
} from "../../service/admin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../App";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import AppleLogin from "react-apple-login";

const GOOGLE_CLIENT_ID =
  "285312507829-8puo8pp5kikc3ahdivtr9ehq1fm3kkks.apps.googleusercontent.com";
const LoginView = () => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState("register"); // 'register' or 'pin'
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [dataUser, setDataUser] = useState(null);
  const [timer, setTimer] = useState(55);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [dataLoginGoogle, setDataLoginGoogle] = useState(null);
  const [isLoginGoogle, setIsLoginGoogle] = useState(false);
  const [pin, setPin] = useState("");
  const context = useBookingContext();
  const navigate = useNavigate();
  const goToPin = (result) => {
    if (dataLoginGoogle.access_token) {
      setCurrentStep("pin_google");
    } else {
      localStorage.setItem("access_token", result.access_token);
      localStorage.setItem("refresh_token", result.refresh_token);
      localStorage.setItem("user", JSON.stringify(result.user));
      context.dispatch({
        type: "LOGIN",
        payload: {
          ...context.state,
          user: { ...result.user },
        },
      });
      toast.success("Login success");
      setTimeout(() => {
        navigate("/");
      }, 300);
    }
  };
  const goBack = () => {
    setIsLoginGoogle(false);
    setCurrentStep("register");
  };

  const handleResend = () => {
    setTimer(55);
    setIsResendEnabled(false);
    setOtp("");
  };

  return (
    <>
      {currentStep === "register" && (
        <RegistrationForm
          dataLoginGoogle={dataLoginGoogle}
          setDataLoginGoogle={setDataLoginGoogle}
          setIsLoginGoogle={setIsLoginGoogle}
          isLoginGoogle={isLoginGoogle}
          setPhoneNumber={setPhoneNumber}
          phoneNumber={phoneNumber}
          setCurrentStep={setCurrentStep}
        />
      )}

      {currentStep === "pin" && (
        <PinCreation
          setCurrentStep={setCurrentStep}
          phoneNumber={phoneNumber}
        />
      )}
      {currentStep === "otp" && (
        <OtpVerification
          phoneNumber={phoneNumber}
          otp={otp}
          setOtp={setOtp}
          timer={timer}
          isResendEnabled={isResendEnabled}
          onResend={handleResend}
          onSuccess={goToPin}
          onBack={goBack}
          dataLoginGoogle={dataLoginGoogle}
        />
      )}
      {currentStep === "pin_google" && (
        <PinCreationGoogle
          onNext={() => setCurrentStep("cofirm_pin")}
          onBack={() => setCurrentStep("otp")}
          setPin={setPin}
          pin={pin}
        />
      )}
      {currentStep === "cofirm_pin" && (
        <PinCreationConfirm
          onSuccess={() => navigate("/?from=register&msg=success")}
          onBack={() => setCurrentStep("pin_google")}
          pinConfirm={pin}
          dataUser={dataLoginGoogle}
          phoneNumber={phoneNumber}
        />
      )}
    </>
  );
};

export default LoginView;

const PinCreationGoogle = ({ onNext, onBack, pin, setPin }) => {
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 6) {
      onNext();
    }
  };

  return (
    <Container
      maxWidth='lg'
      sx={{ display: "flex", alignItems: "center", py: 8 }}>
      <Grid container sx={{ alignItems: "center", minHeight: "60vh" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}>
          <Box
            component='img'
            src={image_left}
            alt='illustration'
            sx={{ width: "592px", height: "557px", maxWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={12} display={"flex"} justifyContent={"end"} md={6}>
          <Box sx={{ width: { xs: "100%", sm: "400px", md: "486px" } }}>
            <Typography
              sx={{
                fontSize: { xs: "26px", md: "30px" },
                fontWeight: 700,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}>
              {onBack && (
                <ArrowBackIosNewIcon
                  onClick={onBack}
                  sx={{ cursor: "pointer" }}
                />
              )}
              Tạo mã PIN của bạn
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography fontSize={14} color='#5D6679' fontWeight={500}>
                Mã PIN sẽ được dùng để đăng nhập
              </Typography>
              <Typography
                onClick={() => setShowPin(!showPin)}
                sx={{ cursor: "pointer", fontSize: 14, color: "#5D6679" }}>
                {showPin ? "Ẩn" : "Hiện"}
              </Typography>
            </Box>

            <Box component='form' onSubmit={handleSubmit}>
              <MuiOtpInput
                value={pin}
                onChange={setPin}
                length={6}
                TextFieldsProps={{ type: showPin ? "text" : "password" }}
                sx={{
                  gap: 1.5,
                  justifyContent: "space-between",
                  mb: 3,
                  "& .MuiOtpInput-TextField .MuiOutlinedInput-root": {
                    width: { xs: 50, sm: 60 },
                    height: { xs: 50, sm: 60 },
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    "& fieldset": { borderColor: "#9AC700" },
                  },
                  "& input": {
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#9AC700",
                  },
                }}
              />

              <Button
                type='submit'
                fullWidth
                disabled={pin.length !== 6}
                sx={{
                  py: 1.6,
                  borderRadius: "30px",
                  backgroundColor: pin.length === 6 ? "#9AC700" : "#e0e0e0",
                  color: pin.length === 6 ? "#fff" : "#888",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "18px",
                  height: "56px",
                  "&:hover": {
                    backgroundColor: pin.length === 6 ? "#7cb400" : "#e0e0e0",
                  },
                }}>
                Tiếp tục
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

const PinCreationConfirm = ({
  onSuccess,
  onBack,
  pinConfirm,
  dataUser,
  phoneNumber,
}) => {
  const [pin, setPin] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const context = useBookingContext();
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (pin.length === 6 && pinConfirm == pin) {
      try {
        let result = await userUpdate(
          {
            password: pin,
            phone: "+84" + phoneNumber,
          },
          dataUser?.access_token
        );
        if (result.code == "OK") {
          localStorage.setItem("access_token", dataUser.access_token);
          localStorage.setItem("refresh_token", dataUser.refresh_token);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...dataUser.user, phone: "+84" + phoneNumber })
          );
          context.dispatch({
            type: "LOGIN",
            payload: {
              ...context.state,
              user: { ...{ ...dataUser.user, phone: "+84" + phoneNumber } },
            },
          });
          onSuccess();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowConfirm(true);
    }
    setLoading(false);
  };

  return (
    <Container
      maxWidth='lg'
      sx={{ display: "flex", alignItems: "center", py: 8 }}>
      <Grid container sx={{ alignItems: "center", minHeight: "60vh" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}>
          <Box
            component='img'
            src={image_left}
            alt='illustration'
            sx={{ width: "592px", height: "557px", maxWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={12} display={"flex"} justifyContent={"end"} md={6}>
          <Box sx={{ width: { xs: "100%", sm: "400px", md: "486px" } }}>
            <Typography
              sx={{
                fontSize: { xs: "26px", md: "30px" },
                fontWeight: 700,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}>
              {onBack && (
                <ArrowBackIosNewIcon
                  onClick={onBack}
                  sx={{ cursor: "pointer" }}
                />
              )}
              Xác nhận lại mã PIN
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography fontSize={14} color='#5D6679' fontWeight={500}>
                Mã PIN sẽ được dùng để đăng nhập
              </Typography>
              <Typography
                onClick={() => setShowPin(!showPin)}
                sx={{ cursor: "pointer", fontSize: 14, color: "#5D6679" }}>
                {showPin ? "Ẩn" : "Hiện"}
              </Typography>
            </Box>

            <Box component='form' onSubmit={handleSubmit}>
              <MuiOtpInput
                value={pin}
                onChange={setPin}
                length={6}
                TextFieldsProps={{ type: showPin ? "text" : "password" }}
                sx={{
                  gap: 1.5,
                  justifyContent: "space-between",
                  mb: 3,
                  "& .MuiOtpInput-TextField .MuiOutlinedInput-root": {
                    width: { xs: 50, sm: 60 },
                    height: { xs: 50, sm: 60 },
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    "& fieldset": { borderColor: "#9AC700" },
                  },
                  "& input": {
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#9AC700",
                  },
                }}
              />

              {showConfirm && pinConfirm && pin !== pinConfirm && (
                <Typography
                  sx={{
                    color: "#f44336",
                    fontSize: "14px",
                    mb: 2,
                    fontWeight: 500,
                  }}>
                  Mã PIN không khớp. Vui lòng nhập lại.
                </Typography>
              )}

              <Button
                type='submit'
                fullWidth
                disabled={pin.length !== 6 || loading}
                sx={{
                  py: 1.6,
                  borderRadius: "30px",
                  backgroundColor:
                    pin.length !== 6 || loading ? "#e0e0e0" : "#9AC700",
                  color: pin.length !== 6 || loading ? "#888" : "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "18px",
                  height: "56px",
                  "&:hover": {
                    backgroundColor:
                      pin.length !== 6 || loading ? "#e0e0e0" : "#7cb400",
                  },
                  position: "relative",
                }}>
                {loading ? (
                  <>
                    <CircularProgress size={20} sx={{ color: "#fff", mr: 1 }} />
                    Đang hoàn tất...
                  </>
                ) : (
                  "Hoàn tất đăng ký"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
const OtpVerification = ({
  phoneNumber,
  otp,
  setOtp,
  timer,
  isResendEnabled,
  onResend,
  onSuccess,
  onBack,
  dataLoginGoogle,
}) => {
  const [loading, setLoading] = useState(false);
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (otp.length === 4) {
      try {
        let result = await verifyOtp(
          {
            platform: "ios",
            type: "phone",
            value: "+84" + normalizePhoneForAPI(phoneNumber),
            otp: otp,
          },
          dataLoginGoogle.access_token
        );
        if (result.access_token) {
          onSuccess(result);
        } else {
          toast.error(getErrorMessage(result.code) || result.detail);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth='lg'
      sx={{ display: "flex", alignItems: "center", py: 8 }}>
      <Grid container sx={{ alignItems: "center", minHeight: "60vh" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}>
          <Box
            component='img'
            src={image_left}
            alt='illustration'
            sx={{ width: "592px", height: "557px", maxWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={12} display={"flex"} justifyContent={"end"} md={6}>
          <Box sx={{ width: { xs: "100%", sm: "400px", md: "486px" } }}>
            <Typography
              sx={{
                fontSize: { xs: "26px", md: "30px" },
                fontWeight: 700,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}>
              <ArrowBackIosNewIcon
                onClick={onBack}
                sx={{ cursor: "pointer" }}
              />
              Nhập mã xác nhận
            </Typography>

            <Typography
              sx={{ fontSize: "16px", mb: 4, color: "text.secondary" }}>
              Mã xác nhận đã được gửi đến số{" "}
              <b>+84{normalizePhoneForAPI(phoneNumber)}</b>
            </Typography>

            <Box component='form' onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <MuiOtpInput
                  value={otp}
                  onChange={setOtp}
                  length={4}
                  sx={{
                    gap: 2,
                    "& .MuiOtpInput-TextField .MuiOutlinedInput-root": {
                      width: { xs: 50, sm: 60 },
                      height: { xs: 50, sm: 60 },
                      borderRadius: "16px",
                      backgroundColor: "#fff",
                      "& fieldset": { borderColor: "#9AC700" },
                      "&:hover fieldset": { borderColor: "#7cb400" },
                      "&.Mui-focused fieldset": { borderColor: "#9AC700" },
                    },
                    "& input": {
                      textAlign: "center",
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#9AC700",
                    },
                  }}
                />
              </Box>

              <Typography
                sx={{
                  mb: 4,
                  color: "#FF7A00",
                  fontSize: "14px",
                  fontWeight: 500,
                }}>
                {isResendEnabled ? (
                  <Link onClick={onResend} sx={{ cursor: "pointer" }}>
                    Gửi lại mã
                  </Link>
                ) : (
                  `Gửi lại mã trong (${formatTime(timer)})`
                )}
              </Typography>

              <Button
                type='submit'
                fullWidth
                disabled={otp.length !== 4 || loading}
                sx={{
                  py: 1.6,
                  borderRadius: "30px",
                  backgroundColor:
                    otp.length !== 4 || loading ? "#e0e0e0" : "#9AC700",
                  color: otp.length !== 4 || loading ? "#888" : "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "18px",
                  height: "56px",
                  "&:hover": {
                    backgroundColor:
                      otp.length !== 4 || loading ? "#e0e0e0" : "#7cb400",
                  },
                  position: "relative",
                }}>
                {loading ? (
                  <>
                    <CircularProgress size={20} sx={{ color: "#fff", mr: 1 }} />
                    Đang xác nhận...
                  </>
                ) : (
                  "Xác nhận OTP"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
const RegistrationForm = ({
  setCurrentStep,
  setPhoneNumber,
  phoneNumber,
  isLoginGoogle,
  setIsLoginGoogle,
  dataLoginGoogle,
  setDataLoginGoogle,
}) => {
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [errorExits, setErrorExits] = useState(false);

  const context = useBookingContext();
  const navigate = useNavigate();
  const handleRegister = async () => {
    setLoading(true);
    try {
      let result = await checkUser({
        type: "phone",
        value: "+84" + normalizePhoneForAPI(phoneNumber),
      });
      if (result.code == "OK") {
        setCurrentStep("pin");
      } else {
        toast.error(getErrorMessage(result.code) || result.message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const isValidPhone = (phoneNumber) => {
    return /^[1-9][0-9]{8,9}$/.test(phoneNumber);
  };
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      let result = await LoginGoogle({
        platform: "ios",
        id_token: credentialResponse?.access_token,
        location: "hanoi",
      });
      if (!result?.user?.phone) {
        setIsLoginGoogle(true);
        setDataLoginGoogle(result);
        return;
      }
      if (result.access_token) {
        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("refresh_token", result.refresh_token);
        localStorage.setItem("user", JSON.stringify(result.user));
        context.dispatch({
          type: "LOGIN",
          payload: {
            ...context.state,
            user: { ...result.user },
          },
        });
        toast.success("Login success");
        setTimeout(() => {
          navigate("/");
        }, 300);
      } else {
        toast.error(getErrorMessage(result.code) || result.message);
      }
    } catch (error) {
      console.log(error);
    }
    console.log("Google login success:", credentialResponse);
    // Gửi credentialResponse.credential về backend để xác thực token
  };

  const handleGoogleError = () => {
    toast.error("Google login failed");
  };
  const handleUpdatePhoneGoogle = async () => {
    setLoading(true);
    try {
      let checkUserResult = await checkUser({
        type: "phone",
        value: "+84" + normalizePhoneForAPI(phoneNumber),
      });
      if (checkUserResult.code == "OK") {
        setErrorExits(true);
        setLoading(false);
        return;
      }
      let result = await sendOtp({
        platform: "ios",
        type: "phone",
        value: "+84" + normalizePhoneForAPI(phoneNumber),
      });
      if (result.success) {
        setCurrentStep("otp");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleAppleResponse = async (response) => {
    try {
      console.log("Apple login response:", response);

      // Nếu login thành công có response.authorization.code
      if (response?.authorization?.id_token) {
        let result = await LoginApple({
          platform: "ios",
          id_token: response?.authorization?.id_token,
          location: "hanoi",
        });
        if (!result?.user?.phone) {
          setIsLoginGoogle(true);
          setDataLoginGoogle(result);
          return;
        }
        if (result.access_token) {
          localStorage.setItem("access_token", result.access_token);
          localStorage.setItem("refresh_token", result.refresh_token);
          localStorage.setItem("user", JSON.stringify(result.user));
          context.dispatch({
            type: "LOGIN",
            payload: {
              ...context.state,
              user: { ...result.user },
            },
          });
          toast.success("Login success");
          setTimeout(() => {
            navigate("/");
          }, 300);
        } else {
          toast.error(getErrorMessage(result.code) || result.message);
        }
      }
    } catch (error) {}
  };
  const normalizePhone = (phone) => {
    if (!phone) return "";
    let p = phone.trim().replace(/\D/g, "");

    // Nếu bắt đầu bằng 84 → thay thành 0
    if (p.startsWith("84")) {
      p = "0" + p.slice(2);
    }

    // Nếu không có 84 và người dùng không nhập 0 ở đầu → tự thêm 0
    if (!p.startsWith("0")) {
      p = "0" + p;
    }

    return p;
  };

  const isValidVietnamPhone = (phone) => {
    if (!phone) return false;

    const normalized = normalizePhone(phone);

    // chỉ cho phép đúng 10 hoặc 11 số
    if (normalized.length !== 10 && normalized.length !== 11) return false;

    // đầu số VN hợp lệ
    if (!/^0[35789]/.test(normalized)) return false;

    return true;
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
        <Grid
          item
          sx={{ display: "flex", justifyContent: "end" }}
          xs={12}
          md={6}>
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
              {isLoginGoogle ? (
                <>
                  <ArrowBackIosNewIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => setIsLoginGoogle(false)}
                  />{" "}
                  Số điện thoại của bạn
                </>
              ) : (
                "Hotel Booking xin chào!"
              )}
            </Typography>
            {isLoginGoogle ? (
              <Typography
                sx={{ fontSize: "16px" }}
                mb={4}
                color='text.secondary'>
                Nhập số điện thoại của bạn để tiếp tục.
              </Typography>
            ) : (
              <Typography
                sx={{ fontSize: "16px" }}
                mb={4}
                color='text.secondary'>
                Đăng nhập để đặt phòng với những ưu đãi độc quyền dành cho thành
                viên.
              </Typography>
            )}

            <Box>
              {/* SỐ ĐIỆN THOẠI */}
              <Typography fontSize={14} fontWeight={500} mb={0.5}>
                Số điện thoại
              </Typography>
              <TextField
                fullWidth
                placeholder='Nhập số điện thoại'
                variant='outlined'
                value={phoneNumber}
                onChange={(e) => {
                  let val = e.target.value.replace(/\D/g, ""); // chỉ giữ số
                  // loại bỏ 0 đầu tiên
                  if (val.length > 20) val = val.slice(0, 20);
                  setPhoneNumber(val);
                }}
                onBlur={() => setTouched(true)} // chỉ validate khi blur
                error={touched && !isValidVietnamPhone(phoneNumber)}
                helperText={
                  touched && !isValidVietnamPhone(phoneNumber)
                    ? "Số điện thoại không hợp lệ, vui lòng nhập lại."
                    : ""
                }
                sx={{
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
                    <InputAdornment position='start'>
                      <img
                        src={vn}
                        alt='vn'
                        style={{
                          width: 28,
                          height: 20,
                          borderRadius: 4,
                          objectFit: "cover",
                          marginRight: 8,
                        }}
                      />
                      <Typography sx={{ fontSize: 14, marginRight: 1 }}>
                        +84
                      </Typography>
                    </InputAdornment>
                  ),
                  endAdornment:
                    touched && !isValidVietnamPhone(phoneNumber) ? (
                      <InputAdornment position='end'>
                        <Box
                          sx={{
                            cursor: "pointer",
                            fontSize: 22,
                            color: "#999",
                          }}
                          onClick={() => {
                            setPhoneNumber("");
                            setTouched(false); // reset error khi xóa
                          }}>
                          ✕
                        </Box>
                      </InputAdornment>
                    ) : null,
                }}
              />
              <Typography sx={{ mb: 3, mt: 0.5 }} fontSize={"12px"} color='red'>
                {errorExits && "Số điện thoại này đã đăng ký tài khoản"}
              </Typography>
              {/* TÊN */}

              {/* NGÀY SINH */}

              {/* AGREEMENT */}

              {/* REGISTER BUTTON */}
              {isLoginGoogle ? (
                <Button
                  onClick={handleUpdatePhoneGoogle}
                  variant='contained'
                  fullWidth
                  disabled={!phoneNumber || !isValidPhone(phoneNumber)}
                  sx={{
                    mb: 3,
                    py: 1.5,
                    borderRadius: "16px",
                    backgroundColor: !phoneNumber ? "#e0e0e0" : "#98b720",
                    color: !phoneNumber ? "#888" : "#fff",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "18px",
                    height: "56px",
                    "&:hover": {
                      backgroundColor: !phoneNumber ? "#e0e0e0" : "#98b720",
                    },
                    boxShadow: "none",
                  }}>
                  {loading ? (
                    <>
                      <CircularProgress
                        size={20}
                        sx={{ color: "#fff", mr: 1 }}
                      />
                      Tiếp tục...
                    </>
                  ) : (
                    "Tiếp tục"
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleRegister}
                  variant='contained'
                  fullWidth
                  disabled={!phoneNumber || !isValidVietnamPhone(phoneNumber)}
                  sx={{
                    mb: 3,
                    py: 1.5,
                    borderRadius: "16px",
                    backgroundColor: !phoneNumber ? "#e0e0e0" : "#98b720",
                    color: !phoneNumber ? "#888" : "#fff",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "18px",
                    height: "56px",
                    "&:hover": {
                      backgroundColor: !phoneNumber ? "#e0e0e0" : "#98b720",
                    },
                    boxShadow: "none",
                  }}>
                  {loading ? (
                    <>
                      <CircularProgress
                        size={20}
                        sx={{ color: "#fff", mr: 1 }}
                      />
                      Đăng nhập...
                    </>
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>
              )}
              {!isLoginGoogle && (
                <>
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
                      <AppleLogin
                        clientId='com.zeezoo.hotelbooking.login'
                        redirectURI='https://booking-hotel-liard.vercel.app'
                        responseType='code'
                        responseMode='query'
                        usePopup={true}
                        scope='name email'
                        callback={handleAppleResponse}
                        render={(renderProps) => (
                          <Button
                            variant='outlined'
                            onClick={renderProps.onClick}
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
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                        <GoogleCustomButton
                          onSuccess={handleGoogleSuccess}
                          onError={handleGoogleError}
                        />
                      </GoogleOAuthProvider>
                    </Grid>
                  </Grid>

                  {/* LOGIN LINK */}
                  <Typography sx={{ fontSize: "14px" }} color='text.secondary'>
                    Bạn chưa có tài khoản Booking Hotel?
                    <Link
                      onClick={() => navigate("/register")}
                      sx={{
                        color: "#ff7a00",
                        fontWeight: 500,
                        textDecoration: "underline",
                        "&:hover": { textDecoration: "underline" },
                        cursor: "pointer",
                      }}>
                      Đăng ký ngay
                    </Link>
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

const PinCreation = ({ phoneNumber, setCurrentStep }) => {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const context = useBookingContext();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (pin.length === 6) {
      let result = await Login({
        platform: "ios",
        type: "phone",
        value: "+84" + normalizePhoneForAPI(phoneNumber),
        password: pin,
      });
      if (result.access_token) {
        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("refresh_token", result.refresh_token);
        localStorage.setItem("user", JSON.stringify(result.user));
        context.dispatch({
          type: "LOGIN",
          payload: {
            ...context.state,
            user: { ...result.user },
          },
        });
        toast.success("Login success");
        setTimeout(() => {
          navigate("/");
        }, 300);
      } else {
        toast.error(getErrorMessage(result.code) || result.message);
      }
    }
    setLoading(false);
  };

  const toggleShowPin = () => setShowPin(!showPin);

  return (
    <Container
      maxWidth='lg'
      sx={{ display: "flex", alignItems: "center", py: 8 }}>
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

        {/* RIGHT PIN FORM */}
        <Grid item xs={12} display={"flex"} justifyContent={"end"} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", sm: "400px", md: "486px" },
            }}>
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
                }}>
                <ArrowBackIosNewIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setCurrentStep("register");
                  }}
                />
                Hi,+84{normalizePhoneForAPI(phoneNumber)}
              </Typography>
            </Box>

            {/* DESCRIPTION */}

            {/* PIN INPUT FORM */}
            <Box component='form' onSubmit={handleSubmit}>
              {/* NHẬP MÃ PIN */}
              <Box display={"flex"} mb={2} justifyContent={"space-between"}>
                <Typography
                  fontSize={14}
                  color='#5D6679'
                  fontWeight={500}
                  mb={1.5}>
                  Mã PIN của sẽ được dùng để đăng nhập
                </Typography>
                <Typography
                  color='#5D6679'
                  onClick={toggleShowPin}
                  fontSize={14}
                  sx={{
                    cursor: "pointer",
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}>
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
                }}>
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
                variant='body2'
                sx={{
                  mb: 4,
                  color: "#FF7A00",
                  fontSize: "14px",
                  fontWeight: 500,
                }}>
                <Link
                  href='/forgot-password'
                  sx={{
                    cursor: "pointer",
                    color: "#FF7A00",
                    textDecoration: "underline",
                  }}>
                  Quên mã PIN?
                </Link>
              </Typography>

              <Button
                type='submit'
                fullWidth
                disabled={pin.length !== 6}
                sx={{
                  py: 1.6,
                  borderRadius: "30px",
                  backgroundColor: pin.length === 6 ? "#9AC700" : "#e0e0e0",
                  color: pin.length === 6 ? "#fff" : "#888",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "18px",
                  height: "56px",
                  "&:hover": {
                    backgroundColor: pin.length === 6 ? "#7cb400" : "#e0e0e0",
                  },
                }}>
                {loading ? (
                  <>
                    <CircularProgress size={20} sx={{ color: "#fff", mr: 1 }} />
                    Đang xác thực...
                  </>
                ) : (
                  "Tiếp tục"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

// GoogleCustomButton.tsx
import { useGoogleLogin } from "@react-oauth/google";
import { getErrorMessage, normalizePhoneForAPI } from "../../utils/utils";

interface GoogleCustomButtonProps {
  onSuccess: (response: any) => void;
  onError: () => void;
}

function GoogleCustomButton({ onSuccess, onError }: GoogleCustomButtonProps) {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log("Google Login Success:", codeResponse);
      onSuccess(codeResponse);
    },
    onError: () => {
      console.error("Google Login Failed");
      onError();
    },
  });

  return (
    <Button
      variant='outlined'
      onClick={() => {
        login();
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
      <Box component='img' src={google} alt='Google' sx={{ width: 23 }} />
      Sign up with Google
    </Button>
  );
}
