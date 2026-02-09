import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Footer({ onNavigate }) {
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => base44.entities.SiteSettings.list(),
    initialData: []
  });

  const setting = settings[0] || {};

  return (
    <footer className="bg-gray-900 text-white px-4 md:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <img 
              src={setting.footer_logo_url || setting.logo_url || '/placeholder-logo.png'} 
              alt="Logo" 
              className="h-12 object-contain mb-4 brightness-0 invert"
            />
            <p className="text-sm text-gray-400">{setting.company_name}</p>
          </div>

          <div>
            <h3 className="mb-4">サイトマップ</h3>
            <div className="flex flex-col gap-2 text-sm">
              {['ご挨拶', '私たちの仕事', 'お知らせ', '会社情報', 'お問い合わせ'].map(item => (
                <button 
                  key={item}
                  onClick={() => onNavigate(item)} 
                  className="text-left text-gray-400 hover:text-white transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4">お問い合わせ</h3>
            <p className="text-sm text-gray-400 mb-2">{setting.address}</p>
            <p className="text-sm text-gray-400">TEL: {setting.phone}</p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {setting.company_name}. All rights reserved.</p>
          <Link to={createPageUrl('PrivacyPolicy')} className="hover:text-white transition-colors">
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </footer>
  );
}