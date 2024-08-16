import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import LoginSignupBtn from "../../Components/LoginSignupBtn/LoginSignupBtn";
import { Input, Space, Table, Select } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import "../CSS/UsersPage.css";
import { api } from "../../api";
import EditUserModal from "../../Components/Modals/EditUserModal";

interface DataType {
  id: string;
  key: string;
  fName: string;
  lName: string;
  email: string;
  role: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState<DataType | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.getUsers();
      const usersData = response.map((user: any) => ({
        id: user._id,      // Use _id from backend response
        key: user._id,
        fName: user.firstName,
        lName: user.lastName,
        email: user.email,
        role: user.role,
      }));
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleTableChange = (pagination: any) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const handleEdit = (user: DataType) => {
    setUserToEdit(user);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setUserToEdit(null);
    fetchUsers(); // Refresh the list after editing a user
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "First Name",
      dataIndex: "fName",
      key: "fName",
    },
    {
      title: "Last Name",
      dataIndex: "lName",
      key: "lName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined className="edit-btn" onClick={() => handleEdit(record)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="users-top">
        <Typography variant="h3">Users</Typography>
        <div className="btn-container">
          <LoginSignupBtn onClick={() => console.log("Add user clicked")}>
            Add User
          </LoginSignupBtn>
        </div>
      </div>
      <div className="table-div">
        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          title={() => (
            <div className="custom-header">
              <div className="header-left">Users</div>
              <div className="header-right">
                <Select placeholder="Sort by" style={{ width: "180px" }} />
                <Input placeholder="Search" style={{ width: 200 }} suffix={<SearchOutlined />} />
              </div>
            </div>
          )}
          footer={(currentPageData) => (
            <div className="custom-footer">
              Showing {currentPageData.length} / {users.length}
            </div>
          )}
          rowClassName="rows"
        />
      </div>
      {userToEdit && (
        <EditUserModal
          showModal={showEditModal}
          onClose={handleEditModalClose}
          userToEdit={userToEdit}
        />
      )}
    </div>
  );
};

export default UsersPage;
