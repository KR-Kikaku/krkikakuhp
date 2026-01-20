import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AdminSidebar from './AdminSidebar';
import { Toaster } from '@/components/ui/sonner';

export default function AdminLayout({ children, currentPage }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center notranslate" translate="no" lang="ja">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 notranslate" translate="no" lang="ja">
      <Toaster position="top-center" richColors />
      <AdminSidebar 
        currentPage={currentPage} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main className="md:ml-64 p-4 md:p-8 overflow-auto pt-20 md:pt-8">
        {children}
      </main>
    </div>
  );
}