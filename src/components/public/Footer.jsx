import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Footer({ onNavigate }) {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await base44.entities.SiteSettings.list();
      if (data.length > 0) setSettings(data[0]);
    };
    fetchSettings();
  }, []);

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
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Logo */}
          <div>
            {settings?.logo_url ? (
              <img src={settings.logo_url} alt="KR企画" className="h-12 object-contain invert" />
            ) : (
              <div className="text-2xl font-light tracking-wider">
                <span className="font-medium">KR</span>企画
              </div>
            )}
          </div>

          {/* Menu */}
          <nav className="flex flex-wrap gap-6 md:gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link
            to={createPageUrl('PrivacyPolicy')}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            プライバシーポリシー
          </Link>
          <p className="text-sm text-gray-500">
            ©2025 合同会社 KR企画
          </p>
        </div>
      </div>
    </footer>
  );
}