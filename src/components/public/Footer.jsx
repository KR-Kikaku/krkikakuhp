import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';

export default function Footer({ onNavigate }) {
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => base44.entities.SiteSettings.list(),
    select: (data) => data[0]
  });

  const navItems = [
    { id: 'greeting', label: 'ごあいさつ' },
    { id: 'business', label: '私たちの仕事' },
    { id: 'news', label: 'ニュース', link: createPageUrl('NewsList') },
    { id: 'company', label: '会社情報' },
    { id: 'contact', label: 'お問い合わせ' }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 mt-20 notranslate" translate="no" lang="ja">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            {settings?.footer_logo_url ? (
              <img src={settings.footer_logo_url} alt="Logo" className="h-12 w-auto mb-4 brightness-0 invert" />
            ) : (
              <div className="text-xl font-bold mb-4">株式会社KR</div>
            )}
            {settings?.company_name && (
              <p className="text-sm text-gray-400 mb-2">{settings.company_name}</p>
            )}
            {settings?.address && (
              <p className="text-sm text-gray-400">{settings.address}</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">サイトマップ</h3>
            <nav className="space-y-2">
              {navItems.map((item) => (
                item.link ? (
                  <Link
                    key={item.id}
                    to={item.link}
                    className="block text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className="block text-gray-400 hover:text-white transition-colors text-sm text-left"
                  >
                    {item.label}
                  </button>
                )
              ))}
              <Link
                to={createPageUrl('PrivacyPolicy')}
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                プライバシーポリシー
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">お問い合わせ</h3>
            {settings?.phone && (
              <p className="text-gray-400 text-sm mb-2">
                TEL: {settings.phone}
              </p>
            )}
            <button
              onClick={() => onNavigate('contact')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
            >
              お問い合わせフォーム
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {settings?.company_name || '株式会社KR'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}