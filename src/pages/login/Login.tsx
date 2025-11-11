import React from "react";
import { Button, Box, Typography, Stack } from "@mui/material";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import AppleLogin from "react-apple-login";

const GOOGLE_CLIENT_ID = "285312507829-8puo8pp5kikc3ahdivtr9ehq1fm3kkks.apps.googleusercontent.com";
const APPLE_CLIENT_ID = "YOUR_APPLE_CLIENT_ID";
const APPLE_REDIRECT_URI = "https://yourdomain.com/auth/apple/callback";

export default function Login() {
  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google login success:", credentialResponse);
    // Gửi credentialResponse.credential về backend để xác thực token
  };

  const handleGoogleError = () => {
    console.log("Google login failed");
  };

  const handleAppleSuccess = (response) => {
    console.log("Apple login success:", response);
    // Gửi response.authorization.id_token về backend để xác thực
  };

  const handleAppleError = (error) => {
    console.error("Apple login error:", error);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Stack
        spacing={3}
        sx={{
          p: 4,
          bgcolor: "#fff",
          borderRadius: 3,
          boxShadow: 3,
          width: 350,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Đăng nhập
        </Typography>

        {/* --- Google Login --- */}
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            shape="pill"
            theme="outline"
            width="100%"
          />
        </GoogleOAuthProvider>

        {/* --- Apple Login --- */}
        <AppleLogin
          clientId={APPLE_CLIENT_ID}
          redirectURI={APPLE_REDIRECT_URI}
          responseType="code id_token"
          responseMode="form_post"
          usePopup={true}
          callback={(res) =>
            res.error ? handleAppleError(res) : handleAppleSuccess(res)
          }
          render={(props) => (
            <Button
              variant="contained"
              color="inherit"
              onClick={props.onClick}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "999px",
                bgcolor: "black",
                color: "white",
                "&:hover": { bgcolor: "#333" },
              }}
              fullWidth
            >
               Đăng nhập với Apple
            </Button>
          )}
        />
      </Stack>
    </Box>
  );
}
