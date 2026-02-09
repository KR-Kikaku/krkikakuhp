import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Footer({ onNavigate }) {
  const [settings, setSettings] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSettings = async () => {
      const settingsList = await base44.entities.SiteSettings.list();
      if (settingsList.length > 0) {
        setSettings(settingsList[0]);
      }
    };
    fetchSettings();
  }, []);

  const handleLogoClick = () => {
    navigate(createPageUrl('Home'));
  };

  const menuItems = [
    { id: 'greeting', label: 'ご挨拶' },
    { id: 'business', label: '私たちの仕事' },
    { id: 'news', label: 'お知らせ' },
    { id: 'company', label: '会社情報' },
    { id: 'contact', label: 'お問い合わせ' }
  ];

  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-16 md:mt-24">
      <div className="py-12 md:py-16 px-4 md:px-12 max-w-[1280px] mx-auto">
        {/* Footer Grid */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 mb-12">
          {/* Logo and Company Info */}
          <div className="flex-1 space-y-4">
            <button
              onClick={handleLogoClick}
              className="hover:opacity-70 transition-opacity duration-200 active:scale-95"
            >
              {settings?.footer_logo_url ? (
                <img
                  src={settings.footer_logo_url}
                  alt="ロゴ"
                  className="h-12 object-contain"
                />
              ) : (
                <div className="h-12 w-32 bg-gray-300 rounded"></div>
              )}
            </button>
            <div className="space-y-2 text-sm text-gray-600">
              {settings?.company_name && (
                <p className="font-medium text-gray-900">{settings.company_name}</p>
              )}
              {settings?.address && (
                <p>{settings.address}</p>
              )}
              {settings?.phone && (
                <p>Tel: {settings.phone}</p>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">メニュー</h3>
            <nav className="space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="block text-sm text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 active:scale-95"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Additional Links */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">その他</h3>
            <nav className="space-y-3">
              <button
                onClick={() => navigate(createPageUrl('PrivacyPolicy'))}
                className="block text-sm text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 active:scale-95"
              >
                プライバシーポリシー
              </button>
              <button
                onClick={() => navigate(createPageUrl('NewsList'))}
                className="block text-sm text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 active:scale-95"
              >
                お知らせ
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="text-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} {settings?.company_name || 'Company'}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}