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
    <footer className="w-full bg-white border-t border-gray-200 mt-16 md:mt-24">
      <div className="py-12 md:py-16 px-6 md:px-12 max-w-[1280px] mx-auto">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20 mb-12">
          {/* Logo and Company Info */}
          <div className="space-y-4">
            <button
              onClick={handleLogoClick}
              className="hover:opacity-70 transition-opacity duration-200 active:scale-95 inline-block"
            >
              {settings?.footer_logo_url ? (
                <img
                  src={settings.footer_logo_url}
                  alt="ロゴ"
                  className="h-10 w-10 object-contain"
                />
              ) : (
                <div className="h-10 w-10 bg-gray-300 rounded"></div>
              )}
            </button>
            <div className="space-y-1 text-xs text-gray-600">
              {settings?.company_name && (
                <p className="font-bold text-gray-900">{settings.company_name}</p>
              )}
              {settings?.address && (
                <p className="leading-relaxed">{settings.address}</p>
              )}
              {settings?.phone && (
                <p>Tel: {settings.phone}</p>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-xs">メニュー</h3>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="block text-xs text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Additional Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-xs">その他</h3>
            <nav className="space-y-2">
              <button
                onClick={() => navigate(createPageUrl('PrivacyPolicy'))}
                className="block text-xs text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                プライバシーポリシー
              </button>
              <button
                onClick={() => navigate(createPageUrl('NewsList'))}
                className="block text-xs text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                お知らせ
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="text-center text-xs text-gray-400">
            <p>&copy; 2026 {settings?.company_name || 'Company'}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}