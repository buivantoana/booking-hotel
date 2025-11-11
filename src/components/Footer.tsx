import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Link,
  IconButton,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";

import { Instagram, Facebook, YouTube, LinkedIn } from "@mui/icons-material";
import Logo from "../images/dabeb7fcebd00c596297e51a1cf6134d57e64622-removebg-preview.png";
import { RiTiktokFill } from "react-icons/ri";
import { getAllCompanies } from "../service/company";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [companies, setCompanies] = useState(null);
  const navigate = useNavigate();
  const fetchCompanies = async () => {
    try {
      const res = await getAllCompanies();
      if (res.status === 0 && res.data && res.data[0]) {
        setCompanies(res.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);
  return (
    <Box sx={{ backgroundColor: "#fff" }}>
      <Container maxWidth='lg' sx={{ pt: 6, pb: 2 }}>
        <Grid container spacing={4} justifyContent='space-between'>
          {/* Thông tin công ty */}
          <Grid item xs={12} md={4}>
            <Box display='flex' alignItems='center' mb={3}>
              <Box
                display='flex'
                onClick={() => navigate("/")}
                alignItems='center'
                gap={1}>
                <img src={Logo} width={48} height={48} alt='PAM Media' />
                <Typography fontWeight={"bold"} fontSize={"16px"}>
                  PAM Media
                </Typography>
              </Box>
            </Box>

            <Typography variant='body2' color='black' fontWeight={700} mb={3}>
              Địa chỉ:{" "}
              <Typography
                variant='body2'
                color='textSecondary'
                fontWeight={500}>
                {companies && companies?.address}
              </Typography>
            </Typography>
            <Typography variant='body2' color='black' fontWeight={700} mb={3}>
              Mail:{" "}
              <Typography
                variant='body2'
                color='textSecondary'
                fontWeight={500}>
                {companies && companies?.email}
              </Typography>
            </Typography>
            <Typography variant='body2' color='black' fontWeight={700} mb={2}>
              Điện thoại:{" "}
              <Typography
                variant='body2'
                color='textSecondary'
                fontWeight={500}>
                {companies && companies?.phone}
              </Typography>
            </Typography>

            <Box>
              {[
                { icon: <Instagram />, color: "#E4405F" },
                { icon: <Facebook />, color: "#1877F2" },
                { icon: <RiTiktokFill />, color: "#000000" },
                { icon: <LinkedIn />, color: "#0077B5" },
                { icon: <YouTube />, color: "#FF0000" },
              ].map((item, idx) => (
                <IconButton key={idx} sx={{ color: item.color }} size='large'>
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Menu giữa */}
          <Grid item xs={6} md={4}>
            <Box display='flex' flexDirection='column' gap={3}>
              <Link href='/' underline='none' color='textPrimary'>
                Về chúng tôi
              </Link>
              <Link href='/product' underline='none' color='textPrimary'>
                Sản phẩm
              </Link>
              <Link href='cooperate' underline='none' color='textPrimary'>
                Hợp tác
              </Link>
            </Box>
          </Grid>

          {/* Menu phải */}
          <Grid item xs={6} md={4}>
            <Box display='flex' flexDirection='column' gap={3}>
              <Link href='/recruitment' underline='none' color='textPrimary'>
                Tuyển dụng
              </Link>
              <Link href='/news?type=news' underline='none' color='textPrimary'>
                Tin tức
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Dòng cuối */}
        <Grid
          container
          justifyContent='space-between'
          alignItems='center'
          sx={{ mt: 4 }}>
          <Grid item>
            <Typography
              fontWeight={"bold"}
              variant='body2'
              style={{ fontWeight: "bold" }}>
              © 2025 PAM Media. Bảo lưu mọi quyền
            </Typography>
          </Grid>
          <Grid item>
            <Box display='flex' fontWeight={"bold"} gap={2}>
              <Link
                href='#'
                underline='none'
                variant='body2'
                style={{ fontWeight: "bold", color: "black" }}>
                Điều khoản
              </Link>
              <Link
                href='#'
                underline='none'
                variant='body2'
                style={{ fontWeight: "bold", color: "black" }}>
                Bảo mật
              </Link>
              <Link
                href='#'
                underline='none'
                variant='body2'
                style={{ fontWeight: "bold", color: "black" }}>
                Cookie
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
