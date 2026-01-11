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
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Logo */}
        <div className="flex justify-center py-6 border-b border-gray-100">
          {settings?.logo_url ? (
            <img src={settings.logo_url} alt="KR企画" className="h-16 object-contain" />
          ) : (
            <div className="text-2xl font-semibold tracking-wider text-gray-800">
              <span className="font-bold">KR</span>企画
            </div>
          )}
        </div>

        {/* Menu */}
        <div className="flex items-center justify-between py-4">
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center justify-center gap-12 w-full">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 ml-auto"
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