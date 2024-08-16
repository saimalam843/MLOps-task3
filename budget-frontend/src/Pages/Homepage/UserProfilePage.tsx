import { Stack, Typography } from "@mui/material";
import Navbar from "../../Components/Navbar/Navbar";
import "../CSS/UserProfilePage.css";
import { UserOutlined } from "@ant-design/icons";
import { EmailOutlined, KeyboardBackspaceOutlined, LocalPhoneOutlined } from "@mui/icons-material";
import { Anchor, Avatar, Card, Input, notification } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api as apiService } from "../../api"; // Import your API service
import { Button as MUIButton } from "@mui/material";

const items = [
  {
    key: "profile",
    href: "#profile",
    title: "Profile",
  },
  {
    key: "account",
    href: "#account",
    title: "My Account",
  },
];

// Personal Details Card Component
const PersonalDetailsCard = ({ user, onChange }: { user: any, onChange: any }) => {
  return (
    <Card className="card" title="Personal Details">
      <div className="details-container-profile">
        <div className="details-column">
          <Stack>
            <Typography variant="h5">First Name</Typography>
            <Input
              className="input-field"
              value={user.firstName}
              onChange={(e) => onChange('firstName', e.target.value)}
            />
          </Stack>
          <Stack>
            <Typography variant="h5">Last Name</Typography>
            <Input
              className="input-field"
              value={user.lastName}
              onChange={(e) => onChange('lastName', e.target.value)}
            />
          </Stack>
          <Stack>
            <Typography variant="h5">Email</Typography>
            <Input
              className="input-field"
              value={user.email}
              onChange={(e) => onChange('email', e.target.value)}
            />
          </Stack>
          <Stack>
            <Typography variant="h5">Budget Limit (PKR)</Typography>
            <Input
              className="input-field"
              type="number"
              value={user.budget}
              onChange={(e) => onChange('budget', e.target.value)}
            />
          </Stack>
        </div>
      </div>
    </Card>
  );
};

// Account Information Card Component
const AccountInformationCard = ({ user, onChange }: { user: any, onChange: any }) => {
  return (
    <Card title={"My Account"} className="account-card">
      <div className="details-container-account">
        <div className="detail-div">
          <Typography variant="subtitle2" fontWeight={600}>
            Name & Job
          </Typography>
          <div className="forminput-div">
            <Stack>
              <Typography variant="subtitle2">First Name</Typography>
              <Input className="input-field" value={user.firstName} onChange={(e) => onChange('firstName', e.target.value)} />
            </Stack>
            <Stack>
              <Typography variant="subtitle2">Last Name</Typography>
              <Input className="input-field" value={user.lastName} onChange={(e) => onChange('lastName', e.target.value)} />
            </Stack>
            <Stack>
              <Typography variant="subtitle2">Budget</Typography>
              <Input className="input-field" type="number" value={user.budget} onChange={(e) => onChange('budget', e.target.value)} />
            </Stack>
          </div>
        </div>
      </div>
    </Card>
  );
};

const UserProfilePage = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notificationApi, contextHolder] = notification.useNotification();

  useEffect(() => {
    // Fetch user profile on component mount
    const fetchUserProfile = async () => {
      try {
        const response = await apiService.getProfile();
        setUser(response);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLElement>,
    link: { title: React.ReactNode; href: string }
  ) => {
    const key = items.find((item) => item.href === link.href)?.key;
    if (key) {
      setActiveSection(key);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiService.updateProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        budget: user.budget,
      });
      notificationApi.success({
        message: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      notificationApi.error({
        message: "Update Failed",
        description: "There was an error updating your profile. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      {contextHolder}
      <div className="profile-top">
        <div className="navigate-back">
          <Link to="/homepage">
            <KeyboardBackspaceOutlined />
          </Link>
          <Typography variant="h3">Profile</Typography>
        </div>
        <div className="anchor-container">
          <Anchor
            direction="horizontal"
            items={items}
            className="anchor"
            onClick={handleAnchorClick}
          />
        </div>
      </div>
      <div className="content-user">
        <div className="content-left">
          <Card className="card-user">
            <div className="card-top">
              <Avatar size={100} icon={<UserOutlined />} className="avatar" />
              <Typography variant="h4">{user.firstName} {user.lastName}</Typography>
              <Typography variant="h5">{user.role}</Typography>
            </div>
            <div className="card-bottom">
              <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                <LocalPhoneOutlined className="color" />
                <Typography variant="h5">{user.phone || "N/A"}</Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                <EmailOutlined className="color" />
                <Typography variant="h5">{user.email}</Typography>
              </Stack>
              {/* You can add more details here if available */}
            </div>
          </Card>
        </div>
        <div className="content-right">
          {activeSection === "profile" && (
            <Stack gap={2}>
              <Card className="card" title="About me">
                <Typography variant="h5">This section can be customized further</Typography>
              </Card>
              <PersonalDetailsCard user={user} onChange={handleInputChange} />
              <MUIButton
                variant="contained"  // Material-UI uses variant for styling ("contained", "outlined", etc.)
                color="primary"  // Use the color prop to define primary or secondary styling
                onClick={handleSave}  // The function to call on button click
                style={{ marginTop: "20px" }}  // Custom styling if needed
                disabled={saving}  // Disable the button while saving
              >
                {saving ? "Saving..." : "Save Changes"}
    </MUIButton>
            </Stack>
          )}
          {activeSection === "account" && (
            <AccountInformationCard user={user} onChange={handleInputChange} />
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
