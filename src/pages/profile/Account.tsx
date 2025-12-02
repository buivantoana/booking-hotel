import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Flag from "react-country-flag";
import { userUpdate } from "../../service/admin";
import { toast } from "react-toastify";

const Account = ({ context }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading,setLoading] = useState(false)
  // Lấy dữ liệu ban đầu từ context
  const initialData = {
    name: context?.state?.user?.name || "",
    birthday: context?.state?.user?.birthday || "",
    email: context?.state?.user?.email || "",
  };

  // State để chỉnh sửa
  const [formData, setFormData] = useState(initialData);

  // Khi context thay đổi → cập nhật lại form (nếu cần reload từ server)
  useEffect(() => {
    setFormData({
      name: context?.state?.user?.name || "",
      birthday: context?.state?.user?.birthday || "",
      email: context?.state?.user?.email || "",
    });
  }, [context?.state?.user]);

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý submit (bạn có thể gọi API ở đây)
  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Ví dụ gọi API cập nhật
      // await context.updateUserProfile(formData);

      let result = await userUpdate(formData);
      if (result.code == "OK") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("user")),
            ...formData,
          })
        );
        context.dispatch({
          type: "UPDATE_USER",
          payload: {
            ...context.state,
            user: { ...context.state.user, ...formData },
          },
        });
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Cập nhật thất bại!");
    }
    setLoading(false)
  };

  return (
    <Box sx={{ backgroundColor: "#f8f9fa" }}>
      <Typography
        variant='h5'
        fontWeight={600}
        color='#212529'
        mb={3}
        textAlign={isMobile ? "center" : "left"}>
        Hồ sơ của tôi
      </Typography>

      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          p: { xs: 3, sm: 4 },
        }}>
        <Grid container spacing={3}>
          {/* Số điện thoại - KHÔNG CHO SỬA */}
          <Grid item xs={12} sm={6}>
            <Typography variant='body2' color='#6c757d' mb={1}>
              Số điện thoại
            </Typography>
            <TextField
              fullWidth
              value={context?.state?.user?.phone || ""}
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <Flag
                        countryCode='VN'
                        svg
                        style={{ width: 24, height: 24 }}
                      />
                      
                    </Box>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#212529",
                  fontWeight: 500,
                  borderRadius: "16px",
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#212529",
                  fontWeight: 500,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#dee2e6",
                },
              }}
            />
          </Grid>

          {/* Ngày sinh - CHO SỬA */}
          <Grid item xs={12} sm={6}>
            <Typography variant='body2' color='#6c757d' mb={1}>
              Ngày sinh của bạn
            </Typography>
            <TextField
              fullWidth
              type='date'
              name='birthday'
              value={formData.birthday}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",

                  backgroundColor: "#fff",
                  "&.Mui-focused fieldset": {
                    borderColor: "#98b720",
                    borderWidth: 1.5,
                  },
                },
              }}
            />
          </Grid>

          {/* Tên - CHO SỬA */}
          <Grid item xs={12} sm={6}>
            <Typography variant='body2' color='#6c757d' mb={1}>
              Tên của bạn
            </Typography>
            <TextField
              fullWidth
              name='name'
              value={formData.name}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",

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
              }}
            />
          </Grid>

          {/* Email - CHO SỬA */}
          <Grid item xs={12} sm={6}>
            <Typography variant='body2' color='#6c757d' mb={1}>
              Email
            </Typography>
            <TextField
              fullWidth
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Nhập email của bạn'
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",

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
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#dee2e6",
                },
              }}
            />
          </Grid>

          {/* Nút Cập nhật */}
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: isMobile ? "center" : "flex-end",
                mt: 2,
              }}>
              <Button
                variant='contained'
                size='large'
                disabled={loading}
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "rgba(152, 183, 32, 1)",
                  borderRadius: 50,
                  px: 6,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 4px 15px rgba(160, 212, 104, 0.4)",
                  "&:hover": {
                    backgroundColor: "rgba(152, 183, 32, 1)",
                  },
                }}>
                   {loading ? (
                  <>
                    <CircularProgress size={20} sx={{ color: "#fff", mr: 1 }} />
                    Cập nhật
                  </>
                ) : (
                  "Cập nhật"
                )}
                
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Account;
