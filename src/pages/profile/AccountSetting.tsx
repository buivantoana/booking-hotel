import React, { useState } from "react";
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  Modal,
  Stack,
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  LockOutlined,
  LinkOutlined,
  Google,
  Apple,
  Close,
} from "@mui/icons-material";
import google from "../../images/Social media logo.png";
import apple from "../../images/Group.png";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Login, userUpdate } from "../../service/admin";
import { useBookingContext } from "../../App";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/utils";

const AccountSettingsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const [state, setState] = useState("verify");
  const [showConfirm, setShowConfirm] = useState(false);
  const context = useBookingContext()
  const handleSubmit = async(e) => {
    setLoading(true)
    e.preventDefault();
    if (pin.length === 6 ) {
      let result = await Login({
        "platform": "ios",
        "type": "phone",
        "value": context?.state?.user?.phone,
        "password": pin
    })
    if(result.access_token){
        setPin("")
        setState("create")
    }else{
      toast.error(getErrorMessage(result.code)|| result.message)
    }
     
    }
    setLoading(false)
  };
  const handleChangePassword = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (pin.length === 6 && pinConfirm == pin) {
      try {
        let result = await userUpdate({
          "password": pin,
        })
        if (result.code == "OK") {
          toast.success(result.message)
          setState("verify");
          setPin("");
          setPinConfirm("");
          setOpenModal(false)
        }else{
          toast.error(getErrorMessage(result.code)|| result.message)
        }

      } catch (error) {
        console.log(error)
      }
      setLoading(false);

    }else{
      setShowConfirm(true)
    }
    setLoading(false);
  };
  return (
    <Box
      sx={{
        backgroundColor: "#f8f9fa",
      }}>
      {/* Tiêu đề */}
      <Typography
        variant='h5'
        fontWeight={600}
        color='#212529'
        mb={3}
        textAlign={isMobile ? "center" : "left"}>
        Thiết lập tài khoản
      </Typography>

      {/* Card chính */}
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}>
        <List disablePadding>
          {/* Đổi mã PIN */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setOpenModal(true)}
              sx={{ py: 2.5, px: 3 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <LockOutlined sx={{ color: "#6c757d" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography fontWeight={600} color='#212529'>
                    Đổi mã PIN
                  </Typography>
                }
                secondary={
                  <Typography variant='body2' color='#adb5bd' mt={0.5}>
                    Đổi mã PIN thường xuyên để nâng cấp tính bảo mật của tài
                    khoản
                  </Typography>
                }
              />
              <Box sx={{ ml: 2 }}>
                <Typography color='#6c757d' fontSize='1.5rem'>
                  ›
                </Typography>
              </Box>
            </ListItemButton>
          </ListItem>

          {/* <Divider sx={{ mx: 3 }} /> */}

          {/* Liên kết tài khoản */}
          {/* <ListItem disablePadding>
            <ListItemButton sx={{ py: 3, px: 3 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <LinkOutlined sx={{ color: "#6c757d" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography fontWeight={600} color='#212529'>
                    Liên kết tài khoản
                  </Typography>
                }
              />
              <Box sx={{ ml: 2 }}>
                <Typography color='#6c757d' fontSize='1.5rem'>
                  ›
                </Typography>
              </Box>
            </ListItemButton>
          </ListItem> */}

          {/* Google */}
          {/* <ListItem disablePadding>
            <ListItemButton sx={{ py: 3, px: 3 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <img src={google} alt='' />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography fontWeight={500} color='#212529'>
                    Google
                  </Typography>
                }
              />
              <Typography
                color='rgba(93, 102, 121, 1)'
                sx={{ fontSize: "0.95rem", textDecoration: "underline" }}>
                Liên kết
              </Typography>
            </ListItemButton>
          </ListItem> */}

          {/* Apple */}
          {/* <ListItem disablePadding>
            <ListItemButton sx={{ py: 3, px: 3 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <img src={apple} alt='' />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography fontWeight={500} color='#212529'>
                    Apple
                  </Typography>
                }
              />
              <Typography
                color='rgba(93, 102, 121, 1)'
                sx={{ fontSize: "0.95rem", textDecoration: "underline" }}>
                Liên kết
              </Typography>
            </ListItemButton>
          </ListItem> */}
        </List>
      </Box>
      <Modal open={openModal} onClose={() => {
        setState("verify");
        setPin("");
        setPinConfirm("");
        setOpenModal(false)}}>
        <>
        {state == "verify" && <Box
          className='hidden-add-voice'
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: 500 },
            maxHeight: "90vh",
            bgcolor: "white",
            borderRadius: "16px",
            boxShadow: 24,
            p: 4,
            overflow: "auto",
          }}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            mb={3}>
            <Typography fontWeight={700} fontSize='1.25rem' color='#333'>
            Nhập mã PIN của bạn
            </Typography>
            <IconButton onClick={() => {setState("verify");
          setPin("");
          setPinConfirm("");
          setOpenModal(false)}}>
              <Close />
            </IconButton>
          </Stack>
          <Typography fontSize={"14px"} color='rgba(93, 102, 121, 1)'>
          Bạn cần xác thực mã PIN của mình trước khi đổi mã PIN mới
          </Typography>
          <Box
            sx={{
              my: 3,
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
                type: "password",
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

          <Button
               onClick={handleSubmit}
                fullWidth
                disabled={pin.length !== 6||loading }
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
                {loading ? (
                  <>
                    <CircularProgress size={20} sx={{ color: "#fff", mr: 1 }} />
                    Đang xác thực...
                  </>
                ) : (
                  "Xác thực"
                )}
              </Button>
        </Box>}
        {state == "create" && <Box
          className='hidden-add-voice'
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: 500 },
            maxHeight: "90vh",
            bgcolor: "white",
            borderRadius: "16px",
            boxShadow: 24,
            p: 4,
            overflow: "auto",
          }}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            mb={3}>
            <Typography fontWeight={700} fontSize='1.25rem' color='#333'>
            Tạo mã PIN của bạn
            </Typography>
            <IconButton onClick={() => {
        setState("verify");
        setPin("");
        setPinConfirm("");
        setOpenModal(false)}}>
              <Close />
            </IconButton>
          </Stack>
          <Typography fontSize={"14px"} color='rgba(93, 102, 121, 1)'>
          Bạn cần xác thực mã PIN của mình trước khi đổi mã PIN mới
          </Typography>
          <Box
            sx={{
              my: 3,
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
                type: "password",
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

          <Button
                onClick={()=>setState("confirm")}
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
        </Box>}
        {state == "confirm" && <Box
          className='hidden-add-voice'
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: 500 },
            maxHeight: "90vh",
            bgcolor: "white",
            borderRadius: "16px",
            boxShadow: 24,
            p: 4,
            overflow: "auto",
          }}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            mb={3}>
            <Typography fontWeight={700} fontSize='1.25rem' color='#333'>
            Xác thực mã PIN mới của bạn
            </Typography>
            <IconButton onClick={() => {
        setState("verify");
        setPin("");
        setPinConfirm("");
        setOpenModal(false)}}>
              <Close />
            </IconButton>
          </Stack>
          <Typography fontSize={"14px"} color='rgba(93, 102, 121, 1)'>
          Bạn cần xác thực mã PIN của mình trước khi đổi mã PIN mới
          </Typography>
          <Box
            sx={{
              my: 3,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <MuiOtpInput
              value={pinConfirm}
              onChange={setPinConfirm}
              length={6}
              TextFieldsProps={{
                type: "password",
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

          {showConfirm && pinConfirm && pin !== pinConfirm && (
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
                  onClick={handleChangePassword}
                fullWidth
                disabled={pin.length !== 6 ||loading}
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
              {loading ? (
                  <>
                    <CircularProgress size={20} sx={{ color: "#fff", mr: 1 }} />
                    Đang thay đổi...
                  </>
                ) : (
                  "Thay đổi"
                )}
                  
                
              </Button>
        </Box>}
        
        </>
      </Modal>
    </Box>
  );
};

export default AccountSettingsPage;
