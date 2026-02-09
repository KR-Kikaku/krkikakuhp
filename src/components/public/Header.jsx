import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Menu, X } from 'lucide-react';

export default function Header({ onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => base44.entities.SiteSettings.list(),
    initialData: []
  });

  const setting = settings[0] || {};
  const menuItems = ['ご挨拶', '私たちの仕事', 'お知らせ', '会社情報', 'お問い合わせ'];

  return (
    <header className="bg-white border-b fixed top-0 left-0 right-0 z-50 max-w-[1280px] mx-auto">
      <div className="px-4 md:px-8 py-4 flex items-center justify-between">
        <img 
          src={setting.logo_url || '/placeholder-logo.png'} 
          alt="Logo" 
          className="h-12 object-contain cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />

        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden md:flex gap-8">
          {menuItems.map(item => (
            <button
              key={item}
              onClick={() => onNavigate(item)}
              className="hover:text-blue-600 transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">
          {menuItems.map(item => (
            <button
              key={item}
              onClick={() => {
                onNavigate(item);
                setIsMenuOpen(false);
              }}
              className="text-left hover:text-blue-600 transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}