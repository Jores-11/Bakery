import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignIn from "assets/images/signInImage.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase.js";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const logInDataInitial = {
  email: "",
  password: "",
};

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [logInData, setLogInData] = useState(logInDataInitial);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { email, password } = logInData;
    if (!email || !password) {
      setError("Email and password are required!");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const tokenResult = await user.getIdTokenResult();
      const role = tokenResult.claims.role || "EMPLOYEE";

      if (role === "ADMIN") {
        history.push("/dashboard");
      } else {
        history.push("/dashboard"); // Adjust based on role if needed
      }
    } catch (e) {
      switch (e.code) {
        case "auth/invalid-email":
          setError("Invalid email format.");
          break;
        case "auth/user-not-found":
          setError("No account found for this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Wait and retry.");
          break;
        case "auth/network-request-failed":
          setError("Network error. Check your connection.");
          break;
        default:
          setError(`Login failed: ${e.message || "Unknown error"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CoverLayout
      title="Nice to see you!"
      color="white"
      description="Enter your email and password to sign in"
      premotto="INSPIRED BY THE FUTURE:"
      motto="THE BAKERY DASHBOARD"
      image={bgSignIn}
    >
      <VuiBox component="form" role="form" onSubmit={handleSubmit} mt={4}>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Email
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              type="email"
              placeholder="Your email..."
              value={logInData.email}
              onChange={(e) => setLogInData({ ...logInData, email: e.target.value })}
              required
              disabled={loading}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Password
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiBox sx={{ display: "flex", alignItems: "center" }}>
              <VuiInput
                type={showPassword ? "text" : "password"}
                placeholder="Your password..."
                value={logInData.password}
                onChange={(e) => setLogInData({ ...logInData, password: e.target.value })}
                required
                disabled={loading}
                sx={{ flexGrow: 1, marginRight: "10px" }}
              />
              <IconButton
                onClick={handleTogglePassword}
                disabled={loading}
                sx={{ color: "white" }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </VuiBox>
          </GradientBorder>
        </VuiBox>
        <VuiBox display="flex" alignItems="center">
          <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
              Remember me
          </VuiTypography>
        </VuiBox>
        {error && (
          <VuiTypography color="error" variant="caption">
            {error}
          </VuiTypography>
        )}
        {loading && (
          <VuiTypography color="info" variant="caption">
            Signing in, please wait...
          </VuiTypography>
        )}
        <VuiBox mt={4} mb={1}>
          <VuiButton color="info" fullWidth type="submit" disabled={loading}>
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </VuiButton>
        </VuiBox>
        <VuiBox mt={2} textAlign="center">
          <VuiTypography
            variant="button"
            color="white"
            fontWeight="medium"
            sx={{ cursor: "pointer" }}
          >
            Forgot Password?
          </VuiTypography>
        </VuiBox>
        <VuiBox mt={3} textAlign="center">
          <VuiTypography variant="button" color="text" fontWeight="regular">
            Don't have an account?{" "}
            <VuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="white"
              fontWeight="medium"
            >
              Sign up
            </VuiTypography>
          </VuiTypography>
        </VuiBox>
        {/* Added Dashboard and Profile links */}
        <VuiBox mt={3} textAlign="center">
          <VuiTypography
            component={Link}
            to="/dashboard"
            variant="button"
            color="white"
            fontWeight="medium"
            sx={{ marginRight: "20px" }}
          >
            Dashboard
          </VuiTypography>
          <VuiTypography
            component={Link}
            to="/profile"
            variant="button"
            color="white"
            fontWeight="medium"
          >
            Profile
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </CoverLayout>
  );
}

export default SignIn;