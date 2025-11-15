"use client";

import React from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const destinations = [
  { name: "Hà Nội", hotels: "100 khách sạn" },
  { name: "Hồ Chí Minh", hotels: "100 khách sạn" },
  { name: "An Giang", hotels: "100 khách sạn" },
  { name: "Bà Rịa - Vũng Tàu", hotels: "100 khách sạn" },
  { name: "Bình Dương", hotels: "100 khách sạn" },
  { name: "Bình Định", hotels: "100 khách sạn" },
  { name: "Bắc Ninh", hotels: "100 khách sạn" },
  { name: "Bắc Giang", hotels: "100 khách sạn" },
  { name: "Cần Thơ", hotels: "100 khách sạn" },
  { name: "Đà Nẵng", hotels: "100 khách sạn" },
  { name: "Đắk Lắk", hotels: "100 khách sạn" },
  { name: "Đồng Nai", hotels: "100 khách sạn" },
];

const DestinationItem = ({
  name,
  hotels,
}: {
  name: string;
  hotels: string;
}) => (
  <Box>
    <Typography
      variant='subtitle1'
      fontWeight='600'
      color='rgba(43, 47, 56, 1)'
      sx={{
        fontSize: { xs: "0.95rem", md: "1rem" },
        mb: 0.5,
        "&:hover": { textDecoration: "underline", cursor: "pointer" },
      }}>
      {name}
    </Typography>
    <Typography
      variant='body2'
      color='#999'
      sx={{ fontSize: { xs: "0.8rem", md: "0.85rem" } }}>
      {hotels}
    </Typography>
  </Box>
);

const PopularDestinations = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Tính số cột
  const columns = isMobile ? 2 : isTablet ? 3 : 4;

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "#fff" }}>
      <Box sx={{}}>
        {/* Tiêu đề */}
        <Typography
          variant='h4'
          fontWeight='bold'
          color='#333'
          gutterBottom
          sx={{
            fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
            textAlign: { xs: "center", md: "left" },
          }}>
          Các địa điểm thu hút nhất Việt Nam
        </Typography>

        {/* Grid địa điểm */}
        <Stack
          direction='row'
          flexWrap='wrap'
          gap={{ xs: 3, md: 4 }}
          justifyContent='flex-start'
          sx={{
            mt: 4,
            "& > *": {
              flex: `1 1 calc(${100 / columns}% - ${theme.spacing(
                columns === 2 ? 3 : 4
              )})`,
              minWidth: { xs: "130px", sm: "140px" },
            },
          }}>
          {destinations.map((dest, index) => (
            <DestinationItem key={index} {...dest} />
          ))}
        </Stack>

        {/* Nút Xem tất cả */}
        <Box sx={{ mt: 5 }}>
          <Button
            endIcon={<ExpandMore />}
            sx={{
              color: "#999",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
              px: "0",
              "&:hover": {
                bgcolor: "transparent",
                textDecoration: "underline",
              },
            }}>
            Xem tất cả
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PopularDestinations;
