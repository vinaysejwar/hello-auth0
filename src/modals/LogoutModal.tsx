import React from "react";
import { Button, Modal } from "antd";

interface LogoutModalProps {
  isOpen: boolean;
  handleCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  handleCancel,
  onConfirm,
  loading,
}) => {
  return (
    <>
      <Modal
        centered
        title={false}
        open={isOpen}
        onCancel={handleCancel}
        footer={null}
        className="p-0 !w-[424px] max-sm:!w-full"
      >
        <div className="p-[6px] w-full max-sm:px-0">
          
          <h2 className="text-xl font-semibold text-center mb-2">
            {'Logout'}
          </h2>
          <p className="text-gray-500 text-center text-[16px] mb-5">
            {'Are you sure you want to logout?'}
          </p>
          <div className="flex justify-center">
          <Button
            type="primary"
            size="large"
            className="w-auto min-w-[140px] bg-primary text-white font-semibold"
            htmlType="submit"
            onClick={onConfirm}
            loading={loading}
          >
            {'Logout'}
          </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LogoutModal;
