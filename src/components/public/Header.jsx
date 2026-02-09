import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X } from 'lucide-react';

export default function Header({ onNavigate }) {
  const [logoUrl, setLogoUrl] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { id: 'greeting', label: 'ご挨拶' },
    { id: 'business', label: '私たちの仕事' },
    { id: 'news', label: 'お知らせ' },
    { id: 'company', label: '会社情報' },
    { id: 'contact', label: 'お問い合わせ' }
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
        {/* Logo - Clickable */}
        <button
          onClick={handleLogoClick}
          className="flex items-center hover:opacity-80 transition-opacity duration-200"
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-gray-700" />
          ) : (
            <Menu size={24} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="max-w-[1280px] mx-auto px-4 py-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}