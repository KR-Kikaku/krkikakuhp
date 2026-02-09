import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';

export default function Footer({ onNavigate }) {
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
    onNavigate(id);
  };

  return (
    <footer className="bg-gray-900 text-white mt-20 notranslate" translate="no" lang="ja">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* ロゴとの会社情報 */}
          <div>
            {settings?.footer_logo_url && (
              <img
                src={settings.footer_logo_url}
                alt="フッターロゴ"
                className="h-8 mb-4"
              />
            )}
            <p className="text-sm text-gray-400 mb-4">
              {settings?.company_name}
            </p>
            {settings?.address && (
              <p className="text-sm text-gray-400 mb-2">{settings.address}</p>
            )}
            {settings?.phone && (
              <p className="text-sm text-gray-400">{settings.phone}</p>
            )}
          </div>

          {/* ナビゲーション */}
          <div>
            <h3 className="text-sm font-semibold mb-4">ナビゲーション</h3>
            <nav className="space-y-2">
              <button
                onClick={() => handleNavClick('greeting')}
                className="text-sm text-gray-400 hover:text-white transition-colors block text-left"
              >
                ご挨拶
              </button>
              <button
                onClick={() => handleNavClick('business')}
                className="text-sm text-gray-400 hover:text-white transition-colors block text-left"
              >
                事業紹介
              </button>
              <button
                onClick={() => handleNavClick('news')}
                className="text-sm text-gray-400 hover:text-white transition-colors block text-left"
              >
                お知らせ
              </button>
              <button
                onClick={() => handleNavClick('company')}
                className="text-sm text-gray-400 hover:text-white transition-colors block text-left"
              >
                会社情報
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="text-sm text-gray-400 hover:text-white transition-colors block text-left"
              >
                お問い合わせ
              </button>
            </nav>
          </div>

          {/* ポリシー等 */}
          <div>
            <h3 className="text-sm font-semibold mb-4">情報</h3>
            <nav className="space-y-2">
              <Link
                to={createPageUrl('PrivacyPolicy')}
                className="text-sm text-gray-400 hover:text-white transition-colors block"
              >
                プライバシーポリシー
              </Link>
            </nav>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-xs text-gray-400">
            © {new Date().getFullYear()} {settings?.company_name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}