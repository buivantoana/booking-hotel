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
  Rating,
} from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  DeleteOutline as DeleteIcon,
  Close as CloseIcon,
  PhotoCamera,
  Clear as ClearIcon,
} from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";

import building from "../../images/building.png";
import remove from "../../images/delete.png";
import { format } from "date-fns";
import { reviewBooking } from "../../service/booking";

// ==================== HELPER FUNCTIONS ====================
const parseJsonField = (field: string) => {
  try {
    const parsed = JSON.parse(field);
    return parsed.vi || parsed.en || "Không có tên";
  } catch {
    return field;
  }
};

const formatVND = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDateTime = (iso: string) => {
  return format(new Date(iso), "HH:mm, dd/MM/yyyy");
};

const getThumbnail = (booking: any) => {
  if (booking.thumbnail_url) return booking.thumbnail_url;
  const imagesStr = booking.rooms[0]?.images;
  if (imagesStr) {
    try {
      const arr = JSON.parse(imagesStr.replace(/\\"/g, '"'));
      return arr[0] || "";
    } catch { }
  }
  return "";
};

// Map backend status → UI status + label
const getBookingStatus = (booking: any) => {
  const paymentStatus = booking.payments?.[0]?.status;
  const bookingStatus = booking.status;

  if (bookingStatus === "checked_out") {
    return { label: "Hoàn thành", color: "#1A9A50", bg: "#E8F5E9" };
  }
  if (bookingStatus === "cancelled") {
    return { label: "Đã hủy", color: "#E91E1E", bg: "#FFEBEE" };
  }
  if (bookingStatus === "confirmed" && paymentStatus === "paid") {
    return { label: "Chờ nhận phòng", color: "#0066CC", bg: "#E6F0FA" };
  }
  if (paymentStatus === "paid") {
    return { label: "Hoàn thành", color: "#1A9A50", bg: "#E8F5E9" };
  }
  if (paymentStatus === "failed" || paymentStatus === "pending" || bookingStatus === "pending") {
    return { label: "Chờ thanh toán", color: "#FF6D00", bg: "#FFF4E5" };
  }
  return { label: "Chờ thanh toán", color: "#FF6D00", bg: "#FFF4E5" };
};

// ==================== BOOKING CARD (dùng data thật) ====================
const BookingCard = ({
  booking,
  setDetailBooking,
}: {
  booking: any;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const statusConfig = getBookingStatus(booking);
  const hotelName = parseJsonField(booking.hotel_name);
  const roomCount = booking.rooms.length;
  const timeDisplay = `${formatDateTime(booking.check_in)} - ${formatDateTime(booking.check_out)}`;
  const isCompleted = statusConfig.label === "Hoàn thành";
  const isWaitingPayment = statusConfig.label === "Chờ thanh toán";
  const isCancelled = statusConfig.label === "Đã hủy";
  console.log("AAA booking ",booking)
  return (
    <>
      <ReviewModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        hotelName={hotelName}
        roomType={`${roomCount} phòng`}
        bookingTime={timeDisplay}
        id={booking.booking_id}
      />

      <Box
        sx={{
          background: "#fff",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          mb: 2,
          border: "1px solid #eee",
        }}
      >
        {/* Header */}
        <Box sx={{ px: 2.5, pt: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography fontSize="13px" color="#666">
              Mã đặt phòng: {booking.booking_code}
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <Chip
                label={statusConfig.label}
                size="small"
                sx={{
                  bgcolor: statusConfig.bg,
                  color: statusConfig.color,
                  fontWeight: 600,
                  fontSize: "12px",
                  height: "26px",
                  borderRadius: "13px",
                }}
              />
              <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)} size="small">
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
            alignItems={isMobile ? "stretch" : "center"}
          >
            {/* Ảnh */}
            <Avatar
              variant="rounded"
              src={getThumbnail(booking)}
              alt="hotel"
              sx={{
                width: isMobile ? "100%" : 140,
                height: isMobile ? 120 : 105,
                borderRadius: "12px",
                flexShrink: 0,
              }}
            />

            {/* Thông tin */}
            <Box flex={1}>
              <Typography fontSize="16px" fontWeight={700} lineHeight={1.3} mb={0.5}>
                {hotelName}
              </Typography>
              <Typography fontSize="15px" fontWeight={500} color="#333" mb={1}>
                {roomCount} phòng {booking.rent_type === "hourly" ? "(theo giờ)" : ""}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <AccessTimeIcon sx={{ fontSize: 16, color: "#999" }} />
                <Typography fontSize="13px" color="#666">
                  {timeDisplay}
                </Typography>
              </Stack>
              {booking.note && (
                <Typography fontSize="12px" color="#888" mt={1}>
                  Ghi chú: {booking.note}
                </Typography>
              )}
            </Box>

            {/* Giá + hành động */}
            <Box textAlign="right">
              <Typography fontSize="18px" fontWeight={700} color="#FF6D00">
                {formatVND(booking.total_price)}
              </Typography>
              <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={2}>
                <Box
                  component="span"
                  sx={{
                    color: "rgba(93, 102, 121, 1)",
                    py: 0.5,
                    borderRadius: "6px",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <img src={building} alt="" style={{ height: 16 }} />
                  {booking.payments[0]?.method === "momo" ? "Thanh toán MoMo" : "Thanh toán VNPay"}
                </Box>
              </Stack>
              <Typography
                onClick={() => setDetailBooking(booking)}
                fontSize="14px"
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                color="rgba(72, 80, 94, 1)"
              >
                Chi tiết
              </Typography>
            </Box>
          </Stack>

          {/* Divider */}
          {(isCompleted || isWaitingPayment || isCancelled) && <Divider sx={{ my: 2.5 }} />}

          {/* Nút hành động */}
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            {isCompleted && (
              <>
                <Button
                  onClick={() => setReviewModalOpen(true)}
                  variant="outlined"
                  sx={{
                    borderRadius: "24px",
                    textTransform: "none",
                    fontWeight: 600,
                    color: "#666",
                    borderColor: "#ddd",
                    minWidth: 120,
                  }}
                >
                  Đánh giá
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "24px",
                    textTransform: "none",
                    minWidth: 120,
                    bgcolor: "#98b720",
                    "&:hover": { bgcolor: "#8ab020" },
                  }}
                >
                  Đặt lại
                </Button>
              </>
            )}

            {(isWaitingPayment || isCancelled) && (
              <Button
                variant="contained"
                sx={{
                  borderRadius: "24px",
                  textTransform: "none",
                  minWidth: 120,
                  bgcolor: "#98b720",
                  "&:hover": { bgcolor: "#8ab020" },
                }}
              >
                {isWaitingPayment ? "Thanh toán" : "Đặt lại"}
              </Button>
            )}
          </Stack>
        </Box>
      </Box>

      {/* Menu MoreVert */}
      <Menu
        anchorEl={menuAnchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        PaperProps={{
          sx: { borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", mt: 1,padding:0 },
        }}
      >
        <MenuItem
          onClick={() => {
            setMenuAnchor(null);
            setDeleteDialogOpen(true);
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: "rgba(93, 102, 121, 1)" }} />
          </ListItemIcon>
          <ListItemText>
            <Typography fontSize="14px" color="rgba(93, 102, 121, 1)">
              Xóa lịch sử đặt phòng
            </Typography>
          </ListItemText>
        </MenuItem>
      </Menu>

      {/* Dialog xóa */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: "16px" } }}>
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
              }}
            >
              <img src={remove} alt="" />
            </Box>
            <IconButton onClick={() => setDeleteDialogOpen(false)} sx={{ position: "absolute", top: -40, left: -30 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", px: 4, pb: 3 }}>
          <Typography fontWeight={600} fontSize="18px" mb={1}>
            Xóa lịch sử đặt phòng
          </Typography>
          <Typography fontSize="14px" color="#666">
            Theo tác này không thể hoàn tác. Bạn có thực sự muốn xóa lịch sử đặt phòng?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 4, gap: 2, flexDirection: "column" }}>
          <Button
            onClick={() => {
              console.log("Xóa booking:", booking.booking_id);
              setDeleteDialogOpen(false);
            }}
            variant="contained"
            sx={{
              borderRadius: "24px",
              textTransform: "none",
              bgcolor: "#98b720",
              "&:hover": { bgcolor: "#8ab020" },
              width: "100%",
            }}
          >
            Đồng ý
          </Button>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            sx={{
              borderRadius: "24px",
              textTransform: "none",
              borderColor: "#ddd",
              color: "#666",
              width: "100%",
            }}
          >
            Hủy bỏ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// ==================== SORT BUTTON ====================
const SortButton = ({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const sortOptions = [
    { label: "Tất cả các trạng thái", value: "all" },
    { label: "Chờ nhận phòng", value: "waiting_checkin" },
    { label: "Chờ thanh toán", value: "waiting_payment" },
    { label: "Hoàn thành", value: "completed" },
    { label: "Đã hủy", value: "cancelled" },
  ];

  const selectedLabel = sortOptions.find((o) => o.value === selected)?.label || "Sắp xếp";

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        onClick={(e) => setAnchorEl(e.currentTarget)}
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
          "&:hover": { borderColor: "#98b720", bgcolor: "transparent" },
        }}
        startIcon={<SwapVertIcon sx={{ fontSize: "22px !important" }} />}
        endIcon={open ? <ArrowDropUpIcon sx={{ fontSize: "30px !important", color: "#98b720" }} /> : <ArrowDropDownIcon sx={{ fontSize: "30px !important", color: "#666" }} />}
      >
        {selectedLabel}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} PaperProps={{ sx: { mt: 1, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: 260 } }}>
        {sortOptions.map((opt) => (
          <MenuItem
            key={opt.value}
            onClick={() => {
              onSelect(opt.value);
              setAnchorEl(null);
            }}
            sx={{ height: 48, bgcolor: selected === opt.value ? "#f9f9f9" : "white" }}
          >
            <ListItemText>
              <Typography fontSize="0.9rem" color={selected === opt.value ? "#98b720" : "#666"} fontWeight={selected === opt.value ? 600 : 400}>
                {opt.label}
              </Typography>
            </ListItemText>
            {selected === opt.value && <CheckIcon sx={{ fontSize: 18, color: "#98b720", ml: 1 }} />}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

// ==================== REVIEW MODAL (giữ nguyên) ====================
function ReviewModal({ open, onClose, hotelName, roomType, bookingTime, id }: { open: boolean; onClose: () => void; hotelName: string; roomType: string; bookingTime: string }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [rating, setRating] = useState<number | null>(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [fileObjects, setFileObjects] = useState<File[]>([]); // ← Thêm state này

  const tags = [
    { label: "Đẹp đẽ", value: "roombeautiful" },
    { label: "Giá hợp lý", value: "good" },
    { label: "Mùi phòng thơm", value: "nice_smell" },
    // Thêm bao nhiêu tag cũng được, chỉ cần map đúng value tiếng Anh
  ];

  const handleTagClick = (item: { label: string; value: string }) => {
    setSelectedTags((prev) =>
      prev.includes(item.value)
        ? prev.filter((t) => t !== item.value)
        : [...prev, item.value]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setFileObjects((prev) => [...prev, ...newFiles]);
    setUploadedImages((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    setFileObjects((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!rating || rating === 0 || reviewText.trim() === "") return;
  
    const formData = new FormData();
  
    // 1. rate
    formData.append("rate", rating.toString());
  
    // 2. hashtags → mảng tiếng Anh, không dấu, không khoảng trắng → JSON string
    if (selectedTags.length > 0) {
      formData.append("hashtags", JSON.stringify(selectedTags));
      // Ví dụ: ["roombeautiful", "good", "nice_smell"]
    }
  
    // 3. comment
    formData.append("comment", reviewText.trim());
  
    // 4. files
    fileObjects.forEach((file) => {
      formData.append("files", file);
    });
  
    // Kiểm tra in ra console giống hệt ảnh bạn chụp
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {
      const res = await reviewBooking(id,formData);
      console.log("AAA res",res)
     
    } catch (err) {
      console.error(err);
      alert("Lỗi mạng");
    }
  };

  const isSubmitDisabled = !rating || rating === 0 || reviewText.trim().length === 0;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth fullScreen={isMobile} PaperProps={{ sx: { borderRadius: isMobile ? 0 : "24px", overflow: "hidden" } }}>
      <DialogTitle sx={{ pb: 1, position: "relative" }}>
        <Typography variant="h6" fontWeight={700}>Đánh giá khách sạn</Typography>
        <Typography variant="body2" color="#666" sx={{ mt: 1 }}>Bạn hài lòng với trải nghiệm của khách sạn chứ</Typography>
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8, color: "#999" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography fontWeight={600} mb={2}>Viết đánh giá</Typography>
        <Box textAlign="center" mb={3}>
          <Rating
            name="hotel-rating"
            value={rating}
            onChange={(e, v) => setRating(v)}
            sx={{
              fontSize: { xs: "2.8rem", sm: "3.8rem", md: "4.2rem" },
              gap: "12px",
              "& .MuiRating-iconFilled": { color: "#FFB400" },
              "& .MuiRating-iconHover": { color: "#FFB400" },
            }}
          />
        </Box>

        <Stack direction="row" gap={1} flexWrap="wrap" mb={3}>
          {tags.map((item) => (
            <Chip
              key={item.value}
              label={item.label}
              onClick={() => handleTagClick(item)}
              color={selectedTags.includes(item.value) ? "success" : "default"}
              variant={selectedTags.includes(item.value) ? "filled" : "outlined"}
              sx={{
                borderRadius: "20px",
                bgcolor: selectedTags.includes(item.value) ? "#98b720 !important" : "transparent",
                color: selectedTags.includes(item.value) ? "white" : "#666",
                borderColor: "#ddd",
                fontWeight: 500,
              }}
            />
          ))}
        </Stack>

        <TextField
          multiline
          rows={4}
          placeholder="Viết suy nghĩ cảm nhận của bạn"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          fullWidth
          variant="outlined"
          inputProps={{ maxLength: 1000 }}
          helperText={`${reviewText.length}/1000`}
          sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
        />

        <Box>
          <Typography fontWeight={600} mb={2}>Tải ảnh hoặc video</Typography>
          <Stack direction="row" gap={2} flexWrap="wrap">
            <label htmlFor="upload-images">
              <input accept="image/*,video/*" id="upload-images" multiple type="file" style={{ display: "none" }} onChange={handleImageUpload} />
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
                  "&:hover": { borderColor: "#98b720", bgcolor: "#f0f8f0" },
                }}
              >
                <PhotoCamera sx={{ color: "#999", fontSize: 32 }} />
              </Box>
            </label>

            {uploadedImages.map((src, i) => (
              <Box key={i} sx={{ position: "relative" }}>
                <Avatar variant="rounded" src={src} sx={{ width: 80, height: 80, borderRadius: "12px" }} />
                <IconButton size="small" onClick={() => handleRemoveImage(i)} sx={{ position: "absolute", top: 3, right: 3, bgcolor: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
                  <ClearIcon sx={{ color: "#e91e63", fontSize: "12px" }} />
                </IconButton>
              </Box>
            ))}
          </Stack>
        </Box>
      </DialogContent>

      <Box sx={{ p: 3, pt: 2 }}>
        <Button
          fullWidth
          variant="contained"
          size="large"
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
            "&.Mui-disabled": { bgcolor: "#ccc", color: "#999" },
          }}
        >
          Gửi đánh giá
        </Button>
      </Box>
    </Dialog>
  );
}

// ==================== MAIN PAGE ====================
export default function MyBookingsPage({
  setDetailBooking,
  historyBooking = [],
}: {
  setDetailBooking: (open: boolean) => void;
  historyBooking?: any[];
}) {
  const [sortValue, setSortValue] = useState("all");

  const filtered = historyBooking.filter((booking) => {
    if (sortValue === "all") return true;
    const status = getBookingStatus(booking).label;
    if (sortValue === "waiting_checkin" && status === "Chờ nhận phòng") return true;
    if (sortValue === "waiting_payment" && status === "Chờ thanh toán") return true;
    if (sortValue === "completed" && status === "Hoàn thành") return true;
    if (sortValue === "cancelled" && status === "Đã hủy") return true;
    return false;
  });

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3} justifyContent="space-between">
        <Typography variant="h5" fontWeight={600} color="#212529">
          Đặt phòng của tôi
        </Typography>
        <SortButton selected={sortValue} onSelect={setSortValue} />
      </Box>

      <Box>
        {filtered.length === 0 ? (
          <Typography textAlign="center" color="#999" mt={8} fontSize="1.1rem">
            Bạn chưa có lịch sử đặt phòng
          </Typography>
        ) : (
          filtered.map((booking) => (
            <BookingCard key={booking.booking_id} booking={booking} setDetailBooking={setDetailBooking} />
          ))
        )}
      </Box>
    </Box>
  );
}