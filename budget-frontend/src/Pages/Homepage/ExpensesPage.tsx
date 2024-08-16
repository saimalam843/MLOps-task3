import { Typography } from "@mui/material";
import "../CSS/ExpensesPage.css";
import LoginSignupBtn from "../../Components/LoginSignupBtn/LoginSignupBtn";
import { DatePicker, Input, Progress, Select, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import AddExpenseModal from "../../Components/Modals/AddExpenseModal";
import EditExpenseModal from "../../Components/Modals/EditExpenseModal"; // Import the EditExpenseModal
import { api } from "../../api"; // Import the API utilities
import { ColumnsType } from "antd/es/table";

interface DataType {
  id: string;
  key: string;
  title: string;
  expenditure: number;
  price: number;
  date: string;
}

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // State to manage the edit modal visibility
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  const [userBudget, setUserBudget] = useState<number>(0);
  const [expenseToEdit, setExpenseToEdit] = useState<DataType | null>(null); // State to hold the expense being edited

  // Fetch user profile to get the budget
  const fetchUserProfile = async () => {
    try {
      const userProfile = await api.getProfile();
      setUserBudget(userProfile.budget);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Fetch expenses data from backend
  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await api.getExpenses();
      const expensesData = response.data.map((expense: any) => ({
        id: expense._id,
        key: expense._id,
        title: expense.title,
        expenditure: parseFloat(((expense.price / userBudget) * 100).toFixed(2)), // based on user's budget
        price: expense.price,
        date: new Date(expense.date).toLocaleDateString(),
      }));
      setExpenses(expensesData);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile(); // First fetch the user profile to get the budget
  }, []);

  useEffect(() => {
    if (userBudget > 0) {
      fetchExpenses(); // Fetch expenses only after budget is available
    }
  }, [userBudget]);

  const handleTableChange = (pagination: any) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleExpenseAdded = () => {
    fetchExpenses(); // Refresh the list after adding a new expense
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteExpense(id);
      fetchExpenses(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEdit = (id: string) => {
    const expense = expenses.find((expense) => expense.key === id);
    if (expense) {
      setExpenseToEdit(expense);
      setShowEditModal(true);
    }
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    setExpenseToEdit(null);
  };

  const handleExpenseUpdated = () => {
    fetchExpenses(); // Refresh the list after updating an expense
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Expense",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Total Expenditure",
      dataIndex: "expenditure",
      key: "expenditure",
      render: (expenditure: number) => <Progress percent={expenditure} />,
    },
    {
      title: "Price (PKR)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "Actions",
      key: "action",
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <DeleteOutlined className="delete-btn" onClick={() => handleDelete(record.key)} />
          <EditOutlined className="edit-btn" onClick={() => handleEdit(record.key)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="expenses-top">
        <Typography variant="h3">Expenses</Typography>
        <div className="btn-container">
          <LoginSignupBtn onClick={handleClick}>Add Expenses</LoginSignupBtn>
          <AddExpenseModal showModal={showModal} onClose={handleClose} onExpenseAdded={handleExpenseAdded} />
          <EditExpenseModal
            showModal={showEditModal}
            onClose={handleEditClose}
            onExpenseUpdated={handleExpenseUpdated}
            expenseToEdit={expenseToEdit}
          />
        </div>
      </div>
      <div className="table-div">
        <Table
          columns={columns}
          dataSource={expenses}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          title={() => (
            <div className="custom-header">
              <div className="header-left">Expenses</div>
              <div className="header-right">
                <Select placeholder="Sort by" style={{ width: "180px" }} />
                <DatePicker />
                <Input placeholder="Search" style={{ width: 200 }} suffix={<SearchOutlined />} />
              </div>
            </div>
          )}
          footer={(currentPageData) => (
            <div className="custom-footer">
              Showing {currentPageData.length} / {expenses.length}
            </div>
          )}
          rowClassName="rows"
        />
      </div>
    </div>
  );
};

export default ExpensesPage;
