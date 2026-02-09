import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Header({ onNavigate }) {
  const [logoUrl, setLogoUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await base44.entities.SiteSettings.list();
      if (settings.length > 0 && settings[0].logo_url) {
        setLogoUrl(settings[0].logo_url);
      }
    };
    fetchSettings();
  }, []);

  const handleLogoClick = () => {
    navigate(createPageUrl('Home'));
  };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-[1280px] mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
        {/* Logo - Clickable */}
        <button
          onClick={handleLogoClick}
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="ロゴ"
              className="h-16 object-contain"
            />
          ) : (
            <div className="h-16 w-40 bg-gray-200 rounded"></div>
          )}
        </button>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('greeting')}
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            ご挨拶
          </button>
          <button
            onClick={() => onNavigate('business')}
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            私たちの仕事
          </button>
          <button
            onClick={() => onNavigate('news')}
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            お知らせ
          </button>
          <button
            onClick={() => onNavigate('company')}
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            会社情報
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            お問い合わせ
          </button>
        </nav>
      </div>
    </header>
  );
}