'use client'
import LogoutModal from '@/modals/LogoutModal'
import { Button } from 'antd'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Logout = () => {
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const router = useRouter();


    const handleLogout = () => {
        setIsLogoutOpen(true);
    }
    const handleConfirm = () => {
        setIsLogoutOpen(false);
        localStorage.clear();
        router.push("/api/auth/logout");
        toast.success("Logged out successfully");
    }

  return (
    <>
            <Button onClick={handleLogout} type="primary" danger>
              Logout
            </Button>

            <LogoutModal 
                isOpen={isLogoutOpen}
                handleCancel={() => setIsLogoutOpen(false)}
                onConfirm={handleConfirm}
                loading={false}
            />
            </>
  )
}

export default Logout
