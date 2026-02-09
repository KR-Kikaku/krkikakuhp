import React from 'react';
import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Menu, X } from 'lucide-react';

export default function Header({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const fetchLogo = async () => {
      const settings = await base44.entities.SiteSettings.list();
      if (settings.length > 0) {
        setLogoUrl(settings[0].logo_url || '');
      }
    };
    fetchLogo();
  }, []);

  const handleNavigation = (id) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          {logoUrl && <img src={logoUrl} alt="ロゴ" className="h-8" />}
          <span className="font-bold text-lg">KR企画</span>
        </div>

        {/* デスクトップメニュー */}
        <nav className="hidden md:flex gap-8">
          <button onClick={() => handleNavigation('greeting')} className="text-gray-700 hover:text-gray-900 transition">
            ご挨拶
          </button>
          <button onClick={() => handleNavigation('business')} className="text-gray-700 hover:text-gray-900 transition">
            私たちの仕事
          </button>
          <button onClick={() => handleNavigation('news')} className="text-gray-700 hover:text-gray-900 transition">
            お知らせ
          </button>
          <button onClick={() => handleNavigation('company')} className="text-gray-700 hover:text-gray-900 transition">
            会社情報
          </button>
          <button onClick={() => handleNavigation('contact')} className="text-gray-700 hover:text-gray-900 transition">
            お問い合わせ
          </button>
        </nav>

        {/* モバイルメニューボタン */}
        <button md:hidden onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* モバイルメニュー */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col p-4 gap-4">
            <button onClick={() => handleNavigation('greeting')} className="text-left text-gray-700 hover:text-gray-900">
              ご挨拶
            </button>
            <button onClick={() => handleNavigation('business')} className="text-left text-gray-700 hover:text-gray-900">
              私たちの仕事
            </button>
            <button onClick={() => handleNavigation('news')} className="text-left text-gray-700 hover:text-gray-900">
              お知らせ
            </button>
            <button onClick={() => handleNavigation('company')} className="text-left text-gray-700 hover:text-gray-900">
              会社情報
            </button>
            <button onClick={() => handleNavigation('contact')} className="text-left text-gray-700 hover:text-gray-900">
              お問い合わせ
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}