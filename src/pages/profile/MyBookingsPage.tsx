"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Avatar,
  Chip,
  Divider,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  DeleteOutline as DeleteIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";

import building from "../../images/building.png";

import remove from "../../images/delete.png";

// Dữ liệu mẫu
const bookingId = "1234566";
const hotelName = "Hoàng gia Luxury hotel";
const roomType = "Deluxe room";
const time = "10:00 - 12:00, 4/11/2025";
const price = "160.000đ";

type StatusType =
  | "completed"
  | "waiting_checkin"
  | "waiting_payment"
  | "cancelled"
  | "no_show";

interface StatusConfig {
  label: string;
  color: string;
  bg: string;
}

const statusMap: Record<StatusType, StatusConfig> = {
  completed: { label: "Hoàn thành", color: "#1A9A50", bg: "#E8F5E9" },
  waiting_checkin: { label: "Chờ nhận phòng", color: "#0066CC", bg: "#E6F0FA" },
  waiting_payment: { label: "Chờ thanh toán", color: "#FF6D00", bg: "#FFF4E5" },
  cancelled: { label: "Đã hủy", color: "#E91E1E", bg: "#FFEBEE" },
  no_show: { label: "Không nhận phòng", color: "#E91E1E", bg: "#FFEBEE" },
};
const sortOptions = [
  { label: "Tất cả các trạng thái", value: "all" },
  { label: "Chờ nhận phòng", value: "waiting_checkin" },
  { label: "Chờ thanh toán", value: "waiting_payment" },
  { label: "Hoàn thành", value: "completed" },
  { label: "Không nhận phòng", value: "no_show" },
  { label: "Đã hủy", value: "cancelled" },
];
// Component Card Đặt Phòng
const BookingCard = ({ status, setDetailBooking }: { status: StatusType }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const config = statusMap[status];
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  // Menu MoreVert
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(menuAnchor);

  // Dialog xác nhận xóa
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleOpenDeleteDialog = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("Đã xóa lịch sử đặt phòng:", bookingId);
    // TODO: Gọi API xóa ở đây
    setDeleteDialogOpen(false);
    // Có thể thêm toast: "Đã xóa thành công"
  };

  return (
    <>
      <ReviewModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        hotelName={hotelName}
        roomType={roomType}
        bookingTime={time}
      />
      <Box
        sx={{
          background: "#fff",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          mb: 2,
          border: "1px solid #eee",
        }}>
        {/* Header */}
        <Box sx={{ px: 2.5, pt: 3 }}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'>
            <Typography fontSize='13px' color='#666'>
              Mã đặt phòng: {bookingId}
            </Typography>
            <Box display='flex' alignItems='center' gap={2}>
              <Chip
                label={config.label}
                size='small'
                sx={{
                  bgcolor: config.bg,
                  color: config.color,
                  fontWeight: 600,
                  fontSize: "12px",
                  height: "26px",
                  borderRadius: "13px",
                }}
              />
              <IconButton onClick={handleMenuClick} size='small'>
                <MoreVertIcon sx={{ color: "rgba(93, 102, 121, 1)" }} />
              </IconButton>
            </Box>
          </Stack>
        </Box>

        {/* Body */}
        <Box sx={{ p: 3 }}>
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={isMobile ? 2 : 3}
            alignItems={isMobile ? "stretch" : "center"}>
            {/* Ảnh phòng */}
            <Avatar
              variant='rounded'
              src='https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'
              alt='room'
              sx={{
                width: isMobile ? "100%" : 140,
                height: isMobile ? 120 : 105,
                borderRadius: "12px",
                flexShrink: 0,
              }}
            />

            {/* Thông tin */}
            <Box flex={1}>
              <Typography
                fontSize='16px'
                fontWeight={700}
                lineHeight={1.3}
                mb={0.5}>
                {hotelName}
              </Typography>
              <Typography fontSize='15px' fontWeight={500} color='#333' mb={1}>
                {roomType}
              </Typography>
              <Stack direction='row' alignItems='center' spacing={1}>
                <AccessTimeIcon sx={{ fontSize: 16, color: "#999" }} />
                <Typography fontSize='13px' color='#666'>
                  {time}
                </Typography>
              </Stack>
            </Box>

            {/* Giá + hành động */}
            <Box textAlign='right'>
              <Typography fontSize='18px' fontWeight={700} color='#FF6D00'>
                {price}
              </Typography>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='flex-end'
                mb={2}>
                <Box
                  component='span'
                  sx={{
                    color: "rgba(93, 102, 121, 1)",
                    py: 0.5,
                    borderRadius: "6px",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}>
                  <img src={building} alt='' style={{ height: 16 }} />
                  Trả tại khách sạn
                </Box>
              </Stack>
              <Typography
                onClick={() => setDetailBooking(true)}
                fontSize='14px'
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                color='rgba(72, 80, 94, 1)'>
                Chi tiết
              </Typography>
            </Box>
          </Stack>

          {/* Divider cho một số trạng thái */}
          {(status === "completed" ||
            status === "waiting_payment" ||
            status === "no_show" ||
            status === "cancelled") && <Divider sx={{ my: 2.5 }} />}

          {/* Nút hành động theo trạng thái */}
          <Stack direction='row' justifyContent='flex-end' spacing={1}>
            {status === "completed" && (
              <>
                <Button
                  onClick={() => setReviewModalOpen(true)}
                  variant='outlined'
                  sx={{
                    borderRadius: "24px",
                    textTransform: "none",
                    fontWeight: 600,
                    color: "#666",
                    borderColor: "#ddd",
                    minWidth: 120,
                  }}>
                  Đánh giá
                </Button>
                <Button
                  variant='contained'
                  sx={{
                    borderRadius: "24px",
                    textTransform: "none",
                    minWidth: 120,
                    bgcolor: "#98b720",
                    "&:hover": { bgcolor: "#8ab020" },
                  }}>
                  Đặt lại
                </Button>
              </>
            )}

            {(status === "waiting_payment" ||
              status === "no_show" ||
              status === "cancelled") && (
              <Button
                variant='contained'
                sx={{
                  borderRadius: "24px",
                  textTransform: "none",
                  minWidth: 120,
                  bgcolor: "#98b720",
                  "&:hover": { bgcolor: "#8ab020" },
                }}>
                {status === "waiting_payment" ? "Thanh toán" : "Đặt lại"}
              </Button>
            )}
          </Stack>
        </Box>
      </Box>

      {/* Menu MoreVert */}
      <Menu
        anchorEl={menuAnchor}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openMenu}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            mt: 1,
            p: 0,
          },
        }}>
        <MenuItem onClick={handleOpenDeleteDialog}>
          <ListItemIcon>
            <DeleteIcon
              fontSize='small'
              sx={{ color: "rgba(93, 102, 121, 1)" }}
            />
          </ListItemIcon>
          <ListItemText>
            <Typography fontSize={"14px"} color='rgba(93, 102, 121, 1)'>
              Xóa lịch sử đặt phòng
            </Typography>
          </ListItemText>
        </MenuItem>
      </Menu>

      {/* Dialog xác nhận xóa - giống hệt hình bạn gửi */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        maxWidth='xs'
        fullWidth
        PaperProps={{
          sx: { borderRadius: "16px" },
        }}>
        <DialogTitle sx={{ textAlign: "center", pt: 4, pb: 1 }}>
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                bgcolor: "#ffebee",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}>
              <img src={remove} alt='' />
            </Box>
            <IconButton
              onClick={handleCloseDeleteDialog}
              sx={{ position: "absolute", top: -40, left: -30 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center", px: 4, pb: 3 }}>
          <Typography fontWeight={600} fontSize='18px' mb={1}>
            Xóa lịch sử đặt phòng
          </Typography>
          <Typography fontSize='14px' color='#666'>
            Theo tác này không thể hoàn tác. Bạn có thực sự muốn xóa lịch sử đặt
            phòng?
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            pb: 4,
            gap: 2,
            flexDirection: "column",
          }}>
          <Button
            onClick={handleConfirmDelete}
            variant='contained'
            sx={{
              borderRadius: "24px",
              textTransform: "none",
              bgcolor: "#98b720",
              "&:hover": { bgcolor: "#8ab020" },
              width: "100%",
            }}>
            Đồng ý
          </Button>
          <Button
            onClick={handleCloseDeleteDialog}
            variant='outlined'
            sx={{
              borderRadius: "24px",
              textTransform: "none",
              borderColor: "#ddd",
              color: "#666",
              width: "100%",
              ml: "0px !important",
            }}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Component Sort (giữ nguyên như cũ)
const SortButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState(sortOptions[0].value);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    handleClose();
  };

  const selectedLabel = sortOptions.find(
    (opt) => opt.value === selected
  )?.label;

  return (
    <>
      <Button
        variant='outlined'
        size='small'
        onClick={handleClick}
        sx={{
          borderColor: "#eee",
          color: "#333",
          textTransform: "none",
          borderRadius: "12px",
          fontSize: "0.9rem",
          minWidth: 140,
          height: 48,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          bgcolor: "white",
          "&:hover": {
            borderColor: "#98b720",
            bgcolor: "transparent",
          },
        }}
        startIcon={<SwapVertIcon sx={{ fontSize: "22px !important" }} />}
        endIcon={
          open ? (
            <ArrowDropUpIcon
              sx={{ fontSize: "30px !important", color: "#98b720" }}
            />
          ) : (
            <ArrowDropDownIcon
              sx={{ fontSize: "30px !important", color: "#666" }}
            />
          )
        }>
        {selectedLabel}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            width: 260,
            overflow: "hidden",
          },
        }}
        MenuListProps={{
          sx: { p: 0 },
        }}>
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleSelect(option.value)}
            sx={{
              height: 48,
              bgcolor: selected === option.value ? "#f9f9f9" : "white",
              "&:hover": {
                bgcolor: selected === option.value ? "#f0f8f0" : "#f5f5f5",
              },
            }}>
            <ListItemText
              primary={
                <Typography
                  fontSize='0.9rem'
                  color={selected === option.value ? "#98b720" : "#666"}
                  fontWeight={selected === option.value ? 600 : 400}>
                  {option.label}
                </Typography>
              }
            />
            {selected === option.value && (
              <ListItemIcon sx={{ minWidth: 24, justifyContent: "flex-end" }}>
                <CheckIcon sx={{ fontSize: 18, color: "#98b720" }} />
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

// Trang chính
export default function MyBookingsPage({ setDetailBooking }) {
  return (
    <Box sx={{}}>
      <Box
        display='flex'
        alignItems='center'
        mb={3}
        justifyContent='space-between'>
        <Typography
          variant='h5'
          fontWeight={600}
          color='#212529'
          mb={1}
          textAlign={"left"}>
          Đặt phòng của tôi
        </Typography>
        <SortButton />
      </Box>

      <Box>
        <BookingCard setDetailBooking={setDetailBooking} status='completed' />
        <BookingCard status='waiting_checkin' />
        <BookingCard status='waiting_payment' />
        <BookingCard status='cancelled' />
        <BookingCard status='no_show' />
      </Box>
    </Box>
  );
}

import { Rating } from "@mui/material";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ClearIcon from "@mui/icons-material/Clear";

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  hotelName: string;
  roomType: string;
  bookingTime: string;
}

function ReviewModal({
  open,
  onClose,
  hotelName,
  roomType,
  bookingTime,
}: ReviewModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [rating, setRating] = useState<number | null>(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const tags = ["Đẹp đẽ", "Giá hợp lý", "Mùi phòng thơm"];

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setUploadedImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!rating || rating === 0) return;

    console.log("Gửi đánh giá:", {
      rating,
      reviewText,
      tags: selectedTags,
      images: uploadedImages,
    });

    // TODO: Gọi API gửi đánh giá ở đây

    onClose();
    // Reset form
    setRating(0);
    setReviewText("");
    setSelectedTags([]);
    setUploadedImages([]);
  };

  const isSubmitDisabled =
    !rating || rating === 0 || reviewText.trim().length === 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : "24px",
          overflow: "hidden",
        },
      }}>
      <DialogTitle sx={{ pb: 1, position: "relative" }}>
        <Typography variant='h6' fontWeight={700}>
          Đánh giá khách sạn
        </Typography>

        <Typography variant='body2' color='#666' sx={{ mt: 1 }}>
          Bạn hài lòng với trải nghiệm của khách sạn chứ
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8, color: "#999" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {/* Đánh giá sao */}
        <Typography fontWeight={600} mb={2}>
          Viết đánh giá
        </Typography>
        <Box textAlign='center' mb={3}>
          <Rating
            name='hotel-rating'
            value={rating}
            onChange={(e, v) => setRating(v)}
            sx={{
              fontSize: { xs: "2.8rem", sm: "3.8rem", md: "4.2rem" },
              gap: "12px",
              "& .MuiRating-iconFilled": { color: "#FFB400" },
              "& .MuiRating-iconHover": { color: "#FFB400" },
              "& .MuiRating-iconEmpty": { color: "#e0e0e0" },
            }}
          />
        </Box>

        {/* Tag nhanh */}
        <Stack direction='row' gap={1} flexWrap='wrap' mb={3}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onClick={() => handleTagClick(tag)}
              color={selectedTags.includes(tag) ? "success" : "default"}
              variant={selectedTags.includes(tag) ? "filled" : "outlined"}
              sx={{
                borderRadius: "20px",
                bgcolor: selectedTags.includes(tag)
                  ? "#98b720 !important"
                  : "transparent",
                color: selectedTags.includes(tag) ? "white" : "#666",
                borderColor: "#ddd",
                fontWeight: 500,
              }}
            />
          ))}
        </Stack>

        {/* Ô nhập nội dung */}
        <TextField
          multiline
          rows={4}
          placeholder='Viết suy nghĩ cảm nhận của bạn'
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          fullWidth
          variant='outlined'
          inputProps={{ maxLength: 1000 }}
          helperText={`${reviewText.length}/1000`}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        />

        {/* Upload ảnh/video */}
        <Box>
          <Typography fontWeight={600} mb={2}>
            Tải ảnh hoặc video
          </Typography>
          <Stack direction='row' gap={2} flexWrap='wrap'>
            {/* Nút upload */}
            <label htmlFor='upload-images'>
              <input
                accept='image/*,video/*'
                id='upload-images'
                multiple
                type='file'
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  border: "2px dashed #ccc",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  bgcolor: "#fafafa",
                  transition: "all 0.2s",
                  "&:hover": { borderColor: "#98b720", bgcolor: "#f0f8f0" },
                }}>
                <PhotoCamera sx={{ color: "#999", fontSize: 32 }} />
              </Box>
            </label>

            {/* Ảnh đã upload */}
            {uploadedImages.map((src, index) => (
              <Box key={index} sx={{ position: "relative" }}>
                <Avatar
                  variant='rounded'
                  src={src}
                  sx={{ width: 80, height: 80, borderRadius: "12px" }}
                />
                <IconButton
                  size='small'
                  onClick={() => handleRemoveImage(index)}
                  sx={{
                    position: "absolute",
                    top: 3,
                    right: 3,
                    bgcolor: "white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    "&:hover": { bgcolor: "#ffebee" },
                  }}>
                  <ClearIcon sx={{ color: "#e91e63", fontSize: "12px" }} />
                </IconButton>
              </Box>
            ))}
          </Stack>
        </Box>
      </DialogContent>

      {/* Nút gửi */}
      <Box sx={{ p: 3, pt: 2 }}>
        <Button
          fullWidth
          variant='contained'
          size='large'
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          sx={{
            borderRadius: "30px",
            py: 1.8,
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            bgcolor: "#98b720",
            "&:hover": { bgcolor: "#8ab020" },
            "&.Mui-disabled": {
              bgcolor: "#ccc",
              color: "#999",
            },
          }}>
          Gửi đánh giá
        </Button>
      </Box>
      {/* Hiệu ứng check xanh góc trên bên phải khi gửi thành công công (tùy chọn thêm sau) */}
    </Dialog>
  );
}
