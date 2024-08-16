import { Stack, Typography } from "@mui/material";
import { DatePicker, Input, Modal, notification } from "antd";
import { useState } from "react";
import "./AddExpenseModal.css";
import { api } from "../../api"; // Import the API utilities

interface AddExpenseModalProps {
  showModal: boolean;
  onClose: () => void;
  onExpenseAdded: () => void; // Callback to refresh expenses after adding
}

const AddExpenseModal = ({ showModal, onClose, onExpenseAdded }: AddExpenseModalProps) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [date, setDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddExpense = async () => {
    if (!title || !price || !date) {
      notification.error({
        message: "Missing Fields",
        description: "Please fill in all fields before adding an expense.",
      });
      return;
    }
  
    setLoading(true);
    try {
      await api.createExpense({ title, price, date });
      notification.success({
        message: "Expense Added",
        description: "Your expense has been added successfully.",
      });
      onExpenseAdded();
      onClose(); // Close the modal after adding expense
    } catch (error) {
      console.error("Error adding expense:", error);
      notification.error({
        message: "Error",
        description: "There was an error adding the expense. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Modal open={showModal} onCancel={onClose} title="Add Expense" onOk={handleAddExpense} confirmLoading={loading}>
      <div className="modal-upper">
        <Typography variant="subtitle2" fontWeight={500}>
          Title
        </Typography>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      </div>
      <div className="modal-lower">
        <Stack>
          <Typography variant="subtitle2" fontWeight={500}>
            Price (PKR)
          </Typography>
          <Input
            value={price}
            type="number"
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            placeholder="Price"
          />
        </Stack>
        <Stack>
          <Typography variant="subtitle2" fontWeight={500}>
            Date
          </Typography>
          <DatePicker onChange={(value) => setDate(value ? value.toDate() : null)} placeholder="Select Date" />
        </Stack>
      </div>
    </Modal>
  );
};

export default AddExpenseModal;
