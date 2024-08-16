import { useState } from 'react';
import { Divider, Typography } from "@mui/material";
import logo from "../../Components/assets/logo.svg";
import forgetHero from "../../Components/assets/forgetHero.svg"
import "../CSS/ForgetPassword.css";
import { Flex, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import LoginSignupBtn from "../../Components/LoginSignupBtn/LoginSignupBtn";

import { Link } from 'react-router-dom';


const ForgetPassword = () => {
  return (
    <div className="forgetpassword">
      <div className="forget-left">
        <img src={logo} alt="Logo" />
        <div className="forget-box">
              <Typography variant="h3">Reset Password</Typography>
              <Typography variant="subtitle1">
                Enter your email for a reset link
              </Typography>
              <div className="forget-form">
                <Typography variant="subtitle2">Email</Typography>
                <Input
                  placeholder="test@gmail.com"
                  size="large"
                  suffix={<MailOutlined />}
                  className="input"
                />
                
                <LoginSignupBtn>Send Reset Password Link</LoginSignupBtn>

                <Flex justify='center' gap={"5px"} className = "filler">
                  <Typography variant="subtitle2">Don't have an account?</Typography>
                  <Link to= "/sign-up">
                  <Typography
                    variant="subtitle2"
                    className="color-primary signup-toggle"
                    fontWeight={600}
                  >
                    Sign Up
                  </Typography>
                  </Link>
                  </Flex>
              </div>
        </div>
      </div>
      <Divider orientation="vertical" flexItem className="divider" />
      <div className="login-right">
        <img src={forgetHero} alt="Hero" className="hero-image" />
      </div>
    </div>
  );
};

export default ForgetPassword;



