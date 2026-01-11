import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ children, currentPage }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adminSession = sessionStorage.getItem('adminSession');
    if (!adminSession) {
      navigate(createPageUrl('AdminLogin'));
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar currentPage={currentPage} />
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}