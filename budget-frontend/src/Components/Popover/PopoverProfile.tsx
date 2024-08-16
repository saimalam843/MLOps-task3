import { Avatar, Popover } from "antd";
import { ReactNode } from "react";
import "./PopoverProfile.css";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface PopoverProfileProps {
  name: string;
  email: string;
  children: ReactNode;
}

const PopoverProfile = ({ name, email, children }: PopoverProfileProps) => {
  const content = (
    <>    
      <div className="container-popover">
        <Avatar className="avatar-popover" />
        <div className="email-container">
          <span><strong>{name}</strong></span>
          <span id="email">{email}</span>
        </div>
      </div>
      <div>
        <Link to="/profile" className="text"><p className="text"><UserOutlined />Profile</p></Link>
        <p className="text"><LogoutOutlined />Logout</p>
      </div>
    </>
  );

  return (
    <Popover placement="bottomLeft" content={content} className="popover">
      {children}
    </Popover>
  );
}

export default PopoverProfile;
