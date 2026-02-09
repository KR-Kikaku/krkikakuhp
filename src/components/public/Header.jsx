import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Menu, X } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function Header({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await base44.entities.SiteSettings.list();
      if (data.length > 0) {
        setSettings(data[0]);
      }
    };
    fetchSettings();
  }, []);

  const handleNavClick = (id) => {
    setIsOpen(false);
    onNavigate(id);
  };

  const navLinks = [
    { label: 'ご挨拶', id: 'greeting' },
    { label: '事業紹介', id: 'business' },
    { label: 'お知らせ', id: 'news' },
    { label: '会社情報', id: 'company' },
    { label: 'お問い合わせ', id: 'contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 notranslate" translate="no" lang="ja">
      <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6">
        {/* ロゴ */}
        <div className="flex items-center">
          {settings?.logo_url && (
            <img src={settings.logo_url} alt="ロゴ" className="h-8 md:h-10" />
          )}
        </div>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* モバイルメニューボタン */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* モバイルナビゲーション */}
      {isOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="block w-full text-left text-gray-700 hover:text-gray-900 py-2"
              >
                {link.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}