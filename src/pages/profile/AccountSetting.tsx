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

const AccountSettingsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openModal, setOpenModal] = useState(false);
  const [pin, setPin] = useState("");
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

          <Divider sx={{ mx: 3 }} />

          {/* Liên kết tài khoản */}
          <ListItem disablePadding>
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
          </ListItem>

          {/* Google */}
          <ListItem disablePadding>
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
          </ListItem>

          {/* Apple */}
          <ListItem disablePadding>
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
          </ListItem>
        </List>
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
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
              Xác nhận lại mã PIN
            </Typography>
            <IconButton onClick={() => setOpenModal(false)}>
              <Close />
            </IconButton>
          </Stack>
          <Typography fontSize={"14px"} color='rgba(93, 102, 121, 1)'>
            Mã PIN của sẽ được dùng để đăng nhập
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
        </Box>
      </Modal>
    </Box>
  );
};

export default AccountSettingsPage;
