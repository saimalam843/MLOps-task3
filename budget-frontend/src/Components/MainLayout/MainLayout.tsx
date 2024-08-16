import { Link } from "react-router-dom";
import { Avatar, Button, Layout, Menu, notification } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { ReactNode, useEffect, useState } from "react";
import InsightsIcon from "@mui/icons-material/Insights";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
//import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import logo1 from "../assets/logo1.svg";
import logo from "../assets/logo.svg";
import "./MainLayout.css";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import PopoverProfile from "../Popover/PopoverProfile";
import { api as apiService } from "../../api";  // Renamed this import to avoid conflict with notification api

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [notificationApi, contextHolder] = notification.useNotification();
  const [notifications, setNotifications] = useState<{ message: string; createdAt: Date }[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    // Fetch the user profile to determine the role and other details
    const fetchUserProfile = async () => {
      try {
        const userProfile = await apiService.getProfile();
        setUserType(userProfile.role);
        setUserName(`${userProfile.firstName} ${userProfile.lastName}`);
        setUserEmail(userProfile.email);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    // Fetch notifications
    const fetchNotifications = async () => {
      try {
        const response = await apiService.getNotifications();
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchUserProfile();
    fetchNotifications();
  }, []);

  const openNotification = () => {
    notifications.forEach(notification => {
      notificationApi.open({
        message: notification.message,
        description: new Date(notification.createdAt).toLocaleString(),
        icon: <UserOutlined style={{ color: 'black' }} />,
      });
    });
  };

  return (
    <Layout className="main-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={300}
        className="sider"
        theme="light"
      >
        <div className="logo">
          <img src={collapsed ? logo1 : logo} alt="Logo" />
        </div>
        <Menu mode="inline">
          <Menu.Item key="1" icon={<InsightsIcon />}>
            <Link to="/homepage/analysis">Analysis</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AttachMoneyIcon />}>
            <Link to="/homepage/expenses">Expenses</Link>
          </Menu.Item>
          {userType === "Admin" && (
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to="/homepage/users">Users</Link>
            </Menu.Item>
          )}
          <Menu.Item key="4" icon={<ExitToAppIcon />}>
            <Link to="/login">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="header">
          <Button
            type="text"
            icon={<MenuIcon />}
            onClick={() => setCollapsed(!collapsed)}
            className="menu-btn"
          />
          <div className="header-right">
            <div>
              {contextHolder}
              <Button type="text" icon={<BellOutlined />} onClick={openNotification} />
            </div>
            <PopoverProfile name={userName} email={userEmail}>
              <Avatar size={48} icon={<UserOutlined />} className="avatar" />
            </PopoverProfile>
          </div>
        </Header>
        <Content className="content">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
