import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Logo from "../images/dabeb7fcebd00c596297e51a1cf6134d57e64622-removebg-preview.png"; // Replace with actual logo path
import { Popover } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllProducts } from "../service/product";
const Header = () => {
  const [channelAnchorEl, setChannelAnchorEl] = React.useState(null);
  const isChannelOpen = Boolean(channelAnchorEl);
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const handleChannelClick = (event) => {
    setChannelAnchorEl(event.currentTarget);
  };

  const handleChannelClose = () => {
    setChannelAnchorEl(null);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const fetchAll = async () => {
    try {
      const resProducts = await getAllProducts();

      if (resProducts && resProducts.status === 0)
        setProducts(resProducts.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 1000,
        width: "100%",
        py: 2,
        background: "white",
      }}>
      <Container maxWidth='lg' sx={{ padding: "0px !important" }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: isMobile ? "20px !important" : "0px !important",
          }}>
          {/* Logo */}
          <Box display='flex' onClick={()=>navigate("/")} alignItems='center' gap={1}>
            <img src={Logo} width={48} height={48} alt='PAM Media' />
            <Typography fontWeight={"bold"} fontSize={"16px"}>
              PAM Media
            </Typography>
          </Box>

          {isMobile ? (
            <>
              <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <MenuIcon />
              </IconButton>
              {mobileMenuOpen && (
                <Box
                  position='absolute'
                  top={64}
                  left={0}
                  width='100%'
                  bgcolor='white'
                  boxShadow={3}
                  zIndex={1}>
                  <MenuItem
                    onClick={() => {
                      navigate("/");
                      handleMenuClose();
                    }}
                    sx={{
                      cursor: "pointer",
                      color: currentPath === "/" ? "#f26522" : "inherit",
                      fontWeight: currentPath === "/" ? "700" : "500",
                    }}>
                    Về chúng tôi
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/product");
                      handleMenuClose();
                    }}
                    sx={{
                      cursor: "pointer",
                      color: currentPath === "/product" ? "#f26522" : "inherit",
                      fontWeight: currentPath === "/product" ? "700" : "500",
                    }}>
                    Hệ thống sản phẩm
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/cooperate");
                      handleMenuClose();
                    }}
                    sx={{
                      cursor: "pointer",
                      color:
                        currentPath === "/cooperate" ? "#f26522" : "inherit",
                      fontWeight: currentPath === "/cooperate" ? "700" : "500",
                    }}>
                    Hợp tác
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/recruitment");
                      handleMenuClose();
                    }}
                    sx={{
                      cursor: "pointer",
                      color:
                        currentPath === "/recruitment" ? "#f26522" : "inherit",
                      fontWeight:
                        currentPath === "/recruitment" ? "700" : "500",
                    }}>
                    Tuyển dụng
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/news?type=news");
                      handleMenuClose();
                    }}
                    sx={{
                      cursor: "pointer",
                      color: currentPath === "/news" ? "#f26522" : "inherit",
                      fontWeight: currentPath === "/news" ? "700" : "500",
                    }}>
                    Tin tức
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={() => navigate("/contact")}
                      variant='outlined'
                      sx={{
                        borderColor: "#f26522",
                        color: "#f26522",
                        borderRadius: 5,
                        px: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                      endIcon={<ArrowForwardIcon />}>
                      Liên hệ
                    </Button>
                  </MenuItem>
                </Box>
              )}
            </>
          ) : (
            <Box display='flex' alignItems='center' gap={5}>
              <Typography
                variant='body1'
                onClick={() => navigate("/")}
                sx={{
                  cursor: "pointer",
                  color: currentPath === "/" ? "#f26522" : "inherit",
                  fontWeight: currentPath === "/" ? "700" : "500",
                }}>
                Về chúng tôi
              </Typography>
              <Box
                display='flex'
                alignItems='center'
                sx={{
                  cursor: "pointer",
                  color: currentPath === "/product" ? "#f26522" : "inherit",
                  fontWeight: currentPath === "/product" ? "700" : "500",
                }}
                // onClick={handleChannelClick}
                onClick={()=>navigate("/product")}
                >
                <Typography variant='body1' fontWeight={currentPath === "/product" ? 700:500}>
                  Hệ thống sản phẩm
                </Typography>
                {/* <ExpandMoreIcon fontSize='small' /> */}
              </Box>
              <Typography
                variant='body1'
                onClick={() => navigate("/cooperate")}
                fontWeight={500}
                sx={{
                  cursor: "pointer",
                  color: currentPath === "/cooperate" ? "#f26522" : "inherit",
                  fontWeight: currentPath === "/cooperate" ? "700" : "500",
                }}>
                Hợp tác
              </Typography>
              <Typography
                variant='body1'
                onClick={() => navigate("/recruitment")}
                fontWeight={500}
                sx={{
                  cursor: "pointer",
                  color: currentPath === "/recruitment" ? "#f26522" : "inherit",
                  fontWeight: currentPath === "/recruitment" ? "700" : "500",
                }}>
                Tuyển dụng
              </Typography>

              <Typography
                onClick={() => navigate("/news?type=news")}
                variant='body1'
                fontWeight={500}
                sx={{
                  cursor: "pointer",
                  color: currentPath === "/news" ? "#f26522" : "inherit",
                  fontWeight: currentPath === "/news" ? "700" : "500",
                }}>
                Tin tức
              </Typography>
            </Box>
          )}
          {!isMobile && (
            <Button
              variant='outlined'
              onClick={() => navigate("/contact")}
              sx={{
                borderColor: "#f26522",
                color: "#f26522",
                borderRadius: 5,
                px: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontWeight: "bold",
              }}
              endIcon={
                <ArrowForwardIcon
                  sx={{
                    padding: "5px",
                    borderRadius: "50%",
                    background: "#f26522",
                    color: "white",
                  }}
                />
              }>
              Liên hệ
            </Button>
          )}
        </Toolbar>
      </Container>
      <Popover
        open={isChannelOpen}
        anchorEl={channelAnchorEl}
        onClose={handleChannelClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}>
        <Box sx={{ minWidth: 200 }}>
          {products &&
            products.length > 0 &&
            products.map((item) => {
              return (
                <MenuItem
                  onClick={() => {
                    handleChannelClose();
                    navigate("/product");
                  }}>
                  {item.name}
                </MenuItem>
              );
            })}
        </Box>
      </Popover>
    </Box>
  );
};

export default Header;
