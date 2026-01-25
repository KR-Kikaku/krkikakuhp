import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Footer({ onNavigate }) {
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      const data = await base44.entities.SiteSettings.list();
      return data.length > 0 ? data[0] : null;
    },
  });

  const menuItems = [
    { label: 'ご挨拶', id: 'greeting' },
    { label: '私たちの仕事', id: 'work' },
    { label: 'お知らせ', id: 'news' },
    { label: '会社情報', id: 'company' },
    { label: 'お問い合わせ', id: 'contact' },
  ];

  const handleClick = (id) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-12 notranslate" translate="no" lang="ja">
      <div className="max-w-[1920px] mx-auto px-4">
        {/* Menu */}
        <nav className="flex flex-wrap justify-center items-center gap-8 pb-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="text-sm font-medium text-white hover:text-gray-300 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logo */}
        <div className="flex justify-center py-6">
          {settings?.footer_logo_url ? (
            <img src={settings.footer_logo_url} alt="KR企画" className="h-16 max-w-full object-contain" />
          ) : settings?.logo_url ? (
            <img src={settings.logo_url} alt="KR企画" className="h-16 max-w-full object-contain" />
          ) : (
            <div className="text-2xl font-semibold tracking-wider">
              <span className="font-bold">KR</span>企画
            </div>
          )}
        </div>

        {/* Privacy Policy */}
        <div className="text-center py-4">
          <Link
            to={createPageUrl('PrivacyPolicy')}
            className="text-xs text-gray-300 hover:text-white transition-colors"
          >
            プライバシーポリシー
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs text-gray-400">
            ©2025 合同会社 KR企画
          </p>
        </div>
      </div>
    </footer>
  );
}