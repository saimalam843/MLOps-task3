import { Avatar, Button } from 'antd'
import { Header } from 'antd/es/layout/layout'
import PopoverProfile from '../Popover/PopoverProfile'
import { UserOutlined, } from '@ant-design/icons'
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import "./Navbar.css"
import logo from "../assets/logo.svg";



const Navbar = () => (
    <Header className="header-user">
         <div className="header-left">
          <img src={logo} />
         </div>
        <div className="header-right">
            <Button
                type="text"
                icon={<NotificationsNoneOutlinedIcon />}
                className="menu-btn" />

            <PopoverProfile>
                <Avatar size={48} icon={<UserOutlined />} className="avatar" />
            </PopoverProfile>
        </div>
    </Header>
)

export default Navbar