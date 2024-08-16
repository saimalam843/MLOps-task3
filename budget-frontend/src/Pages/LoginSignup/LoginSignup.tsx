import { ChangeEvent, useState } from "react";
import { Divider, Typography } from "@mui/material";
import logo from "../../Components/assets/logo.svg";
import loginHero from "../../Components/assets/loginHero.png";
import signupHero from "../../Components/assets/signupHero.png";
import "../CSS/LoginSignup.css";
import { Checkbox, Flex, Input, notification } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import LoginSignupBtn from "../../Components/LoginSignupBtn/LoginSignupBtn";
import { Link, useNavigate } from "react-router-dom";
import { validateLogin, validateSignup } from "./validation";
import { api } from "../../api"; // Import API utilities

const LoginSignup = () => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(true); // State to toggle between login and signup
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [signupFormData, setSignupFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    budget: "",
  });

  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });

  const [signupErrors, setSignupErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    budget: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (loginState) {
      setLoginFormData({ ...loginFormData, [name]: value });
    } else {
      setSignupFormData({ ...signupFormData, [name]: value });
    }
  };

  const handleLogin = async () => {
    const { valid, errors } = validateLogin(loginFormData);
    setLoginErrors(errors);

    if (!valid) return;

    try {
      const responseData = await api.login(loginFormData);
      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        notification.success({
          message: "Login Successful",
          description: "You have been logged in.",
          duration: 2,
          onClose: () => navigate("/homepage"),
        });
      } else {
        notification.error({
          message: "Login Failed",
          description: responseData.error,
        });
      }
    } catch (error) {
      notification.error({
        message: "Login Failed",
        description: "Server Error",
      });
    }
  };

  const handleSignup = async () => {
    const { valid, errors } = validateSignup(signupFormData);
    setSignupErrors(errors);

    if (!valid) return;

    try {
      const responseData = await api.signup(signupFormData);
      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        notification.success({
          message: "Signup Successful",
          description: "You have been registered.",
          onClose: () => navigate("/homepage"), // Redirect to homepage after signup
        });
      } else {
        notification.error({
          message: "Signup Failed",
          description: responseData.message,
        });
      }
    } catch (error) {
      notification.error({
        message: "Signup Failed",
        description: "Email already exists",
      });
    }
  };

  return (
    <div className="loginSignup">
      <div className="login-left">
        <img src={logo} alt="Logo" />
        <div className="login-box">
          {loginState ? (
            <>
              <Typography variant="h3">Welcome Back!</Typography>
              <Typography variant="subtitle1">
                Sign in to continue to Budget Tracker
              </Typography>
              <div className="login-form">
                <Typography variant="subtitle2">Email</Typography>
                <Input
                  name="email"
                  value={loginFormData.email}
                  onChange={handleChange}
                  placeholder="test@gmail.com"
                  size="large"
                  suffix={<MailOutlined />}
                  className={loginErrors.email ? "input error" : "input"}
                />
                {loginErrors.email && (
                  <div className="error-message">{loginErrors.email}</div>
                )}

                <Typography variant="subtitle2">Password</Typography>
                <Input.Password
                  name="password"
                  value={loginFormData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  size="large"
                  suffix={<UserOutlined />}
                  className={loginErrors.password ? "input error" : "input"}
                />
                {loginErrors.password && (
                  <div className="error-message">{loginErrors.password}</div>
                )}

                <Flex gap="middle" justify="space-between" className="flex">
                  <Checkbox className="checkbox">Remember me</Checkbox>
                  <Link to="/forget-password">
                    <Typography
                      variant="subtitle2"
                      className="color-primary signup-toggle"
                      fontWeight={500}
                    >
                      Forgot Password?
                    </Typography>
                  </Link>
                </Flex>
                <LoginSignupBtn onClick={handleLogin}>LOG IN</LoginSignupBtn>

                <Flex justify="center" gap={"5px"} className="filler">
                  <Typography variant="subtitle2">
                    Don't have an account?
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    className="color-primary signup-toggle"
                    fontWeight={600}
                    onClick={() => setLoginState(false)}
                  >
                    Sign Up
                  </Typography>
                </Flex>
              </div>
            </>
          ) : (
            <>
              <Typography variant="h3">Sign Up</Typography>
              <Typography variant="subtitle1">
                Welcome to our community
              </Typography>
              <div className="login-form">
                <Flex gap="10px">
                  <div className="container">
                    <Typography variant="subtitle2">First Name</Typography>
                    <Input
                      name="firstName"
                      value={signupFormData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      size="large"
                      className={
                        signupErrors.firstName
                          ? "input signup-input error"
                          : "input signup-input"
                      }
                    />
                    {signupErrors.firstName && (
                      <div className="error-message">
                        {signupErrors.firstName}
                      </div>
                    )}
                  </div>
                  <div className="container">
                    <Typography variant="subtitle2">Last Name</Typography>
                    <Input
                      name="lastName"
                      value={signupFormData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      size="large"
                      className={
                        signupErrors.lastName
                          ? "input signup-input error"
                          : "input signup-input"
                      }
                    />
                  </div>
                </Flex>
                <Typography variant="subtitle2">Email</Typography>
                <Input
                  name="email"
                  value={signupFormData.email}
                  onChange={handleChange}
                  placeholder="test@gmail.com"
                  size="large"
                  suffix={<MailOutlined />}
                  className={
                    signupErrors.email
                      ? "input signup-input error"
                      : "input signup-input"
                  }
                />

                <Typography variant="subtitle2">Password</Typography>
                <Input.Password
                  name="password"
                  value={signupFormData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  size="large"
                  className={
                    signupErrors.password ? "input error" : "input"
                  }
                />
                {signupErrors.password && (
                  <div className="error-message">{signupErrors.password}</div>
                )}

                <Typography variant="subtitle2">Confirm Password</Typography>
                <Input.Password
                  name="confirmPassword"
                  value={signupFormData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  size="large"
                  className={
                    signupErrors.confirmPassword
                      ? "input error"
                      : "input"
                  }
                />
                {signupErrors.confirmPassword && (
                  <div className="error-message">
                    {signupErrors.confirmPassword}
                  </div>
                )}

                <Typography variant="subtitle2">Budget Limit</Typography>
                <Input
                  name="budget"
                  value={signupFormData.budget}
                  onChange={handleChange}
                  placeholder="Enter Amount"
                  size="large"
                  className={
                    signupErrors.confirmPassword
                      ? "input signup-input error"
                      : "input signup-input"
                  }
                />
                {signupErrors.budget && (
                  <div className="error-message">{signupErrors.budget}</div>
                )}

                <LoginSignupBtn onClick={handleSignup}>
                  SIGN UP
                </LoginSignupBtn>
                <Flex gap="5px" justify="center">
                  <Typography variant="subtitle2">
                    Already have an account?
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    className="color-primary signup-toggle"
                    fontWeight={600}
                    onClick={() => setLoginState(true)}
                  >
                    Sign In
                  </Typography>
                </Flex>
              </div>
            </>
          )}
        </div>
      </div>
      <Divider orientation="vertical" flexItem className="divider" />
      <div className="login-right">
        <img
          src={loginState ? loginHero : signupHero}
          alt="Hero"
          className="hero-image"
        />
      </div>
    </div>
  );
};

export default LoginSignup;
