import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Menu, X } from 'lucide-react';

export default function Header({ onNavigate }) {
  const [settings, setSettings] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Logo and Mobile Menu - Desktop */}
        <div className="hidden md:block">
          <div className="flex justify-center py-6">
            {settings?.logo_url ? (
              <img src={settings.logo_url} alt="KR企画" className="h-16 object-contain" />
            ) : (
              <div className="text-2xl font-semibold tracking-wider text-gray-800">
                <span className="font-bold">KR</span>企画
              </div>
            )}
          </div>
          <div className="flex items-center justify-between py-3">
            <nav className="flex items-center justify-center gap-12 w-full">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors tracking-widest"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Logo and Mobile Menu - Mobile */}
        <div className="md:hidden flex items-center justify-between py-6">
          <div>
            {settings?.logo_url ? (
              <img src={settings.logo_url} alt="KR企画" className="h-12 object-contain" />
            ) : (
              <div className="text-xl font-semibold tracking-wider text-gray-800">
                <span className="font-bold">KR</span>企画
              </div>
            )}
          </div>
          <button
            className="p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className="block w-full text-left py-3 font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}