import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { LocationOn, ArrowForwardIos } from "@mui/icons-material";
import qr from "../../images/image 5.png";
import left from "../../images/Frame 1321317998.png";
import { useNavigate } from "react-router-dom";



// === NGƯỜI ĐANG CẦM ĐIỆN THOẠI ===
const PhonePerson = () => (
  <svg width='100' height='100' viewBox='0 0 100 100' fill='none'>
    <circle cx='50' cy='35' r='15' fill='#4caf50' />
    <path
      d='M35 50 Q50 60 65 50 L65 80 Q65 90 50 90 Q35 90 35 80 Z'
      fill='#81c784'
    />
    <rect x='42' y='55' width='16' height='25' rx='2' fill='#fff' />
    <circle cx='50' cy='65' r='3' fill='#4caf50' />
    <text
      x='50'
      y='30'
      fontSize='12'
      fill='#fff'
      textAnchor='middle'
      fontWeight='bold'>
      !
    </text>
  </svg>
);

const FirstTimeExplore = ({ location,setAddress,address }) => {
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openLocation, setOpenLocation] = useState(false);
  const navigate = useNavigate()
  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <LocationModal
        open={openLocation}
        onClose={() => setOpenLocation(false)}
        location={location}
        address={address}
        onSelect={(location) => {
          setAddress(location)
        }}
      />
      <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
        {/* Tiêu đề + Khu vực */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent='space-between'
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={2}
          mb={4}>
          <Typography
            variant='h4'
            fontWeight='bold'
            color='#333'
            sx={{
              fontSize: { xs: "1.5rem", md: "1.875rem" },
            }}>
            Lần đầu khám phá
          </Typography>

          <Chip
            onClick={() => setOpenLocation(true)}
            icon={
              <LocationOn
                sx={{ fontSize: 18, color: "rgba(152, 183, 32, 1) !important" }}
              />
            }
            label={address?"Khu vực:"+" "+address?.name?.vi :'Khu vực: Hà Nội'}
            clickable
            deleteIcon={
              <ArrowForwardIos sx={{ fontSize: "14px !important" }} />
            }
            onDelete={() => { }}
            sx={{
              bgcolor: "white",
              color: "rgba(152, 183, 32, 1)",
              fontWeight: 600,
              fontSize: "0.9rem",

              "& .MuiChip-deleteIcon": {
                color: "rgba(152, 183, 32, 1)",
                ml: 0.5,
              },
              "&:hover": { bgcolor: "#f1f8e9" },
            }}
          />
        </Stack>

        {/* 2 Card */}
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems='stretch'>
          {/* Card 1: Thành viên mới */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: "rgba(236, 240, 218, 1)",
                borderRadius: "24px",
                p: { xs: 3, md: 4 },
                height: "70%",
                boxShadow: "0 8px 24px rgba(76, 175, 80, 0.1)",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 32px rgba(76, 175, 80, 0.15)",
                },
              }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                  <Typography
                    variant='h6'
                    fontWeight='bold'
                    color='#2e7d32'
                    gutterBottom
                    sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}>
                    Thành viên mới? Quà chất đang đợi!
                  </Typography>
                  <Typography
                    variant='body2'
                    color='#555'
                    sx={{ mb: 3, fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>
                    Giá phòng hợp lý kèm theo nhiều ưu đãi
                  </Typography>
                  <Button
                    onClick={() => navigate("/register")}
                    variant='contained'
                    sx={{
                      bgcolor: "rgba(152, 183, 32, 1)",
                      color: "white",
                      borderRadius: "16px",
                      px: 4,
                      py: 1.5,
                      fontWeight: "bold",
                      textTransform: "none",
                      fontSize: "1rem",
                      boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
                      "&:hover": { bgcolor: "#43a047" },
                    }}>
                    Đăng ký ngay
                  </Button>
                </Grid>
                <Grid item xs={12} sm={5} sx={{ textAlign: "center" }}>
                  <Box sx={{ position: "relative" }}>
                    <Box component='img' src={left} alt='QR Code' />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* Card 2: Tải app */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: "#fff8e1",
                borderRadius: "24px",
                p: { xs: 3, md: 4 },
                height: "70%",
                boxShadow: "0 8px 24px rgba(255, 193, 7, 0.1)",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 32px rgba(255, 193, 7, 0.15)",
                },
              }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                  <Typography
                    variant='h6'
                    fontWeight='bold'
                    color='#ff8f00'
                    gutterBottom
                    sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}>
                    Nhận ưu đãi liền tay khi tải app!
                  </Typography>
                  <Typography
                    variant='body2'
                    color='#555'
                    sx={{ mb: 2, fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>
                    Sử dụng ứng dụng để săn deal mới ngay
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={5} sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: "16px",
                      p: 2,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                      display: "inline-block",
                    }}>
                    <Box
                      component='img'
                      src={qr}
                      alt='QR Code'
                      sx={{ width: 120, height: 120 }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FirstTimeExplore;


'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  IconButton,
  Divider,
  Slide,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckIcon from '@mui/icons-material/Check';


function LocationModal({ open, onClose, onSelect, location,address }: any) {
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState([])
  // Tự động focus input khi mở modal
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);
  const removeVietnameseTones = (str: string): string => {
    return str
      .normalize('NFD')                    // Tách dấu ra khỏi chữ cái
      .replace(/[\u0300-\u036f]/g, '')     // Xóa hết các dấu
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  };
  useEffect(() => {
    if (search) {
      setFilter(location.filter((item) => {
        const searchNoTone = removeVietnameseTones(search);
        const nameNoTone = removeVietnameseTones(item.name.vi);
        return nameNoTone.includes(searchNoTone);
      }))
    } else {
      setFilter(location)
    }
  }, [location, search])


  const handleSelect = (data: string) => {
    onSelect(data);
    onClose();
  };

  const handleClearSearch = () => {
    setSearch('');
    inputRef.current?.focus();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen // Mobile: full màn hình
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' } as any}
      PaperProps={{
        sx: {
          borderRadius: { xs: '20px 20px 0 0', sm: '16px' },
          maxWidth: { sm: 680 },
          width: { sm: '90%' },
          m: { sm: 2 },
          height: { xs: '90vh', sm: 'auto' },
          maxHeight: { xs: 'none', sm: '90vh' },
        },
      }}
    >
      <DialogContent sx={{ p: 2, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{  pb: 2 }}>
          <Typography variant="h6" fontWeight={700} textAlign="center">
            Hãy chọn địa điểm của bạn
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" mt={1}>
            Hotel Booking sẽ gợi ý những khách sạn phù hợp gần nhất với ưu đãi hấp dẫn
            nhất dựa theo khu vực bạn chọn
          </Typography>

          {/* Search Input */}
          <TextField
            inputRef={inputRef}
            fullWidth
            placeholder="Tên khu vực của bạn"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mt: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#98b720' }} />
                </InputAdornment>
              ),
              endAdornment: search ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClearSearch}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
              sx: {
                borderRadius: '12px',
                bgcolor: '#f9f9f9',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#98b720' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#98b720' },
              },
            }}
          />
        </Box>

       

        {/* Scrollable List */}
        <Box sx={{ flex: 1, overflowY: 'auto', pb: 5 }}>
          <List>
            {/* Phổ biến */}
            {/* <Typography sx={{ bgcolor: 'transparent', fontWeight: 600, color: 'text.primary' }}>
              Phổ biến
            </Typography>
            {location.map((loc) => (
              <ListItem button key={loc} sx={{justifyContent:"space-between"}} onClick={() => handleSelect(loc)}>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                <LocationOnIcon sx={{ mr: 2, color: '#98b720', fontSize: 20 }} />
                <ListItemText primary={loc.name.vi} primaryTypographyProps={{ fontWeight: 500 }} />
                </Box>
                {address && ( address?.id == loc.id) && <CheckIcon sx={{color:"#98b720"}}/>}
              </ListItem>
            ))} */}

        

            {/* Địa điểm khác */}
            <Typography sx={{ bgcolor: 'transparent', fontWeight: 600, color: 'text.primary' }}>
              Địa điểm khác
            </Typography>
            {filter.length > 0 ? (
              filter.map((loc) => (
                <>
                 <ListItem button key={loc} sx={{justifyContent:"space-between"}} onClick={() => handleSelect(loc)}>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                <LocationOnIcon sx={{ mr: 2, color: '#98b720', fontSize: 20 }} />
                <ListItemText primary={loc.name.vi} primaryTypographyProps={{ fontWeight: 500 }} />
                </Box>
                {address && ( address?.id == loc.id) && <CheckIcon sx={{color:"#98b720"}}/>}
               
              </ListItem>
                 <Divider />
                </>
               
              ))
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ px: 4, py: 2 }}>
                Không tìm thấy địa điểm nào
              </Typography>
            )}
          </List>
        </Box>

        {/* Fixed Bottom Button */}
        {/* <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 3,
            bgcolor: 'background.paper',
            borderTop: '1px solid #e0e0e0',
          }}
        >
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#98b720',
              color: 'white',
              borderRadius: '12px',
              py: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1.1rem',
              boxShadow: '0 4px 12px rgba(152, 183, 32, 0.3)',
              '&:hover': { bgcolor: '#85a11c' },
            }}
            onClick={onClose} // Có thể thay bằng hành động tiếp theo
          >
            Tiếp tục
          </Button>
        </Box> */}
      </DialogContent>
    </Dialog>
  );
}