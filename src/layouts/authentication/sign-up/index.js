import { useState } from "react";
import { Link } from "react-router-dom";
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
import bgSignUp from "assets/images/signUpImage.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "firebase.js";

const signData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
};

const SignUp = () => {
  const [rememberMe, setRememberMe] = useState(true);
  const [signUpData, setSignUpData] = useState(signData);
  const [error, setError] = useState("");

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const currentUser = auth.currentUser;
      if (!currentUser || (await currentUser.getIdTokenResult()).claims.role !== "ADMIN") {
        setError("Only Admin (COE) can create accounts. Please log in as Admin.");
        return;
      }

      const { email, password, name, role } = signUpData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, "users", user.uid), { role, email, name });
      setSignUpData(signData);
      setError("Account created successfully!");
    } catch (e) {
      setError(`Sign Up failed: ${e.message}`);
    }
  };

  return (
    <CoverLayout
      title="Welcome!"
      color="white"
      description=""
      image={bgSignUp}
      premotto="INSPIRED BY THE FUTURE:"
      motto="THE BAKERY DASHBOARD"
    >
      <VuiBox component="form" role="form" onSubmit={handleSubmit} mt={4}>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Role
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
            <select
              value={signUpData.role}
              onChange={(e) => setSignUpData({ ...signUpData, role: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: borders.borderRadius.lg,
                border: "none",
                backgroundColor: palette.secondary.focus,
                color: "white",
                fontSize: "16px",
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='white' viewBox='0 0 16 16'%3E%3Cpath d='M8 12l-4-4h8l-4 4z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
              }}
            >
              <option value="" disabled>Select your role</option>
              <option value="ADMIN">Admin (COE)</option>
              <option value="SALESMANAGER">Sales Manager</option>
              <option value="PRODUCTIONMANAGER">Production Manager</option>
              <option value="EMPLOYEE">Employee</option>
            </select>
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Name
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
            <VuiInput
              placeholder="Your full name..."
              value={signUpData.name}
              onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Email
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
            <VuiInput
              type="email"
              placeholder="Your email..."
              value={signUpData.email}
              onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
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
            <VuiInput
              type="password"
              placeholder="Your password..."
              value={signUpData.password}
              onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Confirm Password
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
            <VuiInput
              type="password"
              placeholder="Confirm password..."
              value={signUpData.confirmPassword}
              onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
            />
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
          <VuiTypography color={error.includes("successfully") ? "success" : "error"} variant="caption">
            {error}
          </VuiTypography>
        )}
        <VuiBox mt={4} mb={1}>
          <VuiButton color="info" fullWidth type="submit">
            SIGN UP
          </VuiButton>
        </VuiBox>
        <VuiBox mt={3} textAlign="center">
          <VuiTypography variant="button" color="text" fontWeight="regular">
            Already have an account?{" "}
            <VuiTypography
              component={Link}
              to="/authentication/sign-in"
              variant="button"
              color="white"
              fontWeight="medium"
            >
              Sign in
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
};

export default SignUp;