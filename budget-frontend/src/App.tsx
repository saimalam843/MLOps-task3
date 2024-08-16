import { useState } from "react";
import "./App.css";
import LoginSignup from "./Pages/LoginSignup/LoginSignup";
import { ThemeProvider } from "@mui/material/styles";
import themeMUI from "./themeMUI";
import themeAntd from "./themeAntd"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ForgetPassword from "./Pages/LoginSignup/ForgetPassword";
import Homepage from "./Pages/Homepage/Homepage";
import ExpensesPage from "./Pages/Homepage/ExpensesPage";
import AnalysisPage from "./Pages/Homepage/AnalysisPage";
import { ConfigProvider } from "antd";
import UsersPage from "./Pages/Homepage/UsersPage";
import UserProfilePage from "./Pages/Homepage/UserProfilePage";

function App() {
  return (
    <>
      <ThemeProvider theme={themeMUI}>
        <ConfigProvider theme = {themeAntd}>
        <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/homepage" />} />
          <Route path="/homepage" element={<Homepage />}>
            <Route path="analysis" element={<AnalysisPage />} />
            <Route path="expenses" element={<ExpensesPage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/sign-up" element={<LoginSignup />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        </Router>
        </ConfigProvider>

      </ThemeProvider>1
    </>
  );
}

export default App;
