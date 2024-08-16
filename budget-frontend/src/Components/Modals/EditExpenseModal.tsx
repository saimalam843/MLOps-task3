import { Stack, Typography } from "@mui/material";
import { DatePicker, Input, Modal, notification } from "antd";
import { useState, useEffect } from "react";
import moment from "moment"; // Import moment.js if not already imported
import { api } from "../../api";

interface EditExpenseModalProps {
  showModal: boolean;
  onClose: () => void;
  onExpenseUpdated: () => void;
  expenseToEdit: { id: string; title: string; price: number; date: string } | null;
}

const EditExpenseModal = ({ showModal, onClose, onExpenseUpdated, expenseToEdit }: EditExpenseModalProps) => {
  const [title, setTitle] = useState(expenseToEdit?.title || "");
  const [price, setPrice] = useState<number | undefined>(expenseToEdit?.price || undefined);
  const [date, setDate] = useState<Date | null>(expenseToEdit ? new Date(expenseToEdit.date) : null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (expenseToEdit) {
      setTitle(expenseToEdit.title);
      setPrice(expenseToEdit.price);
      setDate(new Date(expenseToEdit.date));
    }
  }, [expenseToEdit]);

  const handleUpdateExpense = async () => {
    if (!title || !price || !date) {
      notification.error({
        message: "Missing Fields",
        description: "Please fill in all fields before updating the expense.",
      });
      return;
    }

    setLoading(true);
    try {
      await api.updateExpense(expenseToEdit!.id, { title, price, date });
      notification.success({
        message: "Expense Updated",
        description: "Your expense has been updated successfully.",
      });
      onExpenseUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating expense:", error);
      notification.error({
        message: "Error",
        description: "There was an error updating the expense. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={showModal} onCancel={onClose} title="Edit Expense" onOk={handleUpdateExpense} confirmLoading={loading}>
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
          <DatePicker
            value={date ? moment(date) : undefined} // Convert Date to Moment for DatePicker
            onChange={(value) => setDate(value ? value.toDate() : null)} // Convert Moment back to Date
            placeholder="Select Date"
          />
        </Stack>
      </div>
    </Modal>
  );
};

export default EditExpenseModal;
