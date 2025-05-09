"use client";
import React from "react";
import { Button, Form, Modal, Input } from "antd";
import { User } from "@/app/lib/auth"; // Adjust path to match your actual `User` type

interface AddEditUserModalProps {
  isOpen: boolean;
  handleCancel: () => void;
  onConfirm: (userData: Omit<User, "id">) => void;
  loading?: boolean;
}

const AddEditUserModal: React.FC<AddEditUserModalProps> = ({
  isOpen,
  handleCancel,
  onConfirm,
  loading,
}) => {
  const [form] = Form.useForm();

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      onConfirm(values);
      form.resetFields(); // Reset the form after submission
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      centered
      title="Add/Edit User"
      open={isOpen}
      onCancel={() => {
        form.resetFields();
        handleCancel();
      }}
      footer={null}
      className="p-0 !w-[424px] max-sm:!w-full"
    >
      <div className="p-6">
        <p className="text-gray-500 text-center text-[16px] mb-5">
          Please enter the user&apos;s first name:
        </p>

        <Form form={form} layout="vertical">
          <Form.Item
            label="First Name"
            name="first"
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" placeholder="Enter email (optional)" />
          </Form.Item>

          <div className="flex justify-center mt-4">
            <Button
              type="primary"
              size="large"
              className="min-w-[140px] bg-blue-600 text-white font-semibold"
              onClick={handleFinish}
              loading={loading}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddEditUserModal;
