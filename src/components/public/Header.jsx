import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header({ onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => base44.entities.SiteSettings.list(),
    select: (data) => data[0]
  });

  const navItems = [
    { id: 'greeting', label: 'ごあいさつ' },
    { id: 'business', label: '私たちの仕事' },
    { id: 'news', label: 'ニュース' },
    { id: 'company', label: '会社情報' },
    { id: 'contact', label: 'お問い合わせ' }
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 notranslate" translate="no" lang="ja">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to={createPageUrl('Home')} className="flex items-center">
            {settings?.logo_url ? (
              <img src={settings.logo_url} alt="Logo" className="h-10 md:h-12 w-auto" />
            ) : (
              <div className="text-xl md:text-2xl font-bold text-gray-900">株式会社KR</div>
            )}
          </Link>

          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-200 mt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
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