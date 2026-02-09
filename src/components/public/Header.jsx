import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function Header({ onNavigate }) {
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => base44.entities.SiteSettings.list(),
    select: (data) => data[0]
  });

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          {settings?.logo_url && (
            <img src={settings.logo_url} alt="Logo" className="h-12" />
          )}
        </div>
        
        <nav className="hidden md:flex gap-8">
          <button onClick={() => onNavigate('greeting')} className="hover:text-blue-600 transition font-semibold">
            ご挨拶
          </button>
          <button onClick={() => onNavigate('business')} className="hover:text-blue-600 transition font-semibold">
            私たちの仕事
          </button>
          <button onClick={() => onNavigate('news')} className="hover:text-blue-600 transition font-semibold">
            ニュース
          </button>
          <button onClick={() => onNavigate('company')} className="hover:text-blue-600 transition font-semibold">
            会社情報
          </button>
          <button onClick={() => onNavigate('contact')} className="hover:text-blue-600 transition font-semibold">
            お問い合わせ
          </button>
        </nav>
      </div>
    </header>
  );
}