import { Stack, Typography } from "@mui/material";
import { Input, Modal, Select, notification } from "antd";
import { useState } from "react";
import { api } from "../../api";

interface EditUserModalProps {
  showModal: boolean;
  onClose: () => void;
  userToEdit: {
    id: string;
    fName: string;
    lName: string;
    email: string;
    role: string;
  } | null;
}

const EditUserModal = ({ showModal, onClose, userToEdit }: EditUserModalProps) => {
  const [firstName, setFirstName] = useState(userToEdit?.fName || "");
  const [lastName, setLastName] = useState(userToEdit?.lName || "");
  const [role, setRole] = useState(userToEdit?.role || "");
  const [loading, setLoading] = useState(false);

  const handleEditUser = async () => {
    if (!firstName || !lastName || !role) {
      notification.error({
        message: "Missing Fields",
        description: "Please fill in all fields before saving changes.",
      });
      return;
    }

    setLoading(true);
    try {
      await api.updateUser(userToEdit?.id || "", { firstName, lastName, role });
      notification.success({
        message: "User Updated",
        description: "User information has been updated successfully.",
      });
      onClose(); // Close the modal after saving changes
    } catch (error) {
      console.error("Error updating user:", error);
      notification.error({
        message: "Error",
        description: "There was an error updating the user. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showModal}
      onCancel={onClose}
      title="Edit User"
      onOk={handleEditUser}
      confirmLoading={loading}
    >
      <div className="modal-upper">
        <Typography variant="subtitle2" fontWeight={500}>
          First Name
        </Typography>
        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
      </div>
      <div className="modal-lower">
        <Stack spacing={2}>
          <Typography variant="subtitle2" fontWeight={500}>
            Last Name
          </Typography>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </Stack>
        <Stack spacing={2}>
          <Typography variant="subtitle2" fontWeight={500}>
            Role
          </Typography>
          <Select
            value={role}
            onChange={(value) => setRole(value)}
            placeholder="Select Role"
            style={{ width: "100%" }}
          >
            <Select.Option value="User">User</Select.Option>
            <Select.Option value="Admin">Admin</Select.Option>
          </Select>
        </Stack>
      </div>
    </Modal>
  );
};

export default EditUserModal;
