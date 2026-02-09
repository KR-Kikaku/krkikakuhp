import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';

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

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* ロゴ・会社情報 */}
          <div>
            {settings?.footer_logo_url && (
              <img src={settings.footer_logo_url} alt="フッターロゴ" className="h-8 mb-4" />
            )}
            <h3 className="font-bold text-white mb-2">{settings?.company_name || '合同会社 KR企画'}</h3>
            <p className="text-sm text-gray-400">〒{settings?.address || 'アドレス'}</p>
            <p className="text-sm text-gray-400 mt-1">{settings?.phone}</p>
          </div>

          {/* ナビゲーション */}
          <div>
            <h4 className="font-semibold text-white mb-4">コンテンツ</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('greeting')} className="text-sm hover:text-white transition">
                  ご挨拶
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('business')} className="text-sm hover:text-white transition">
                  私たちの仕事
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('news')} className="text-sm hover:text-white transition">
                  お知らせ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('company')} className="text-sm hover:text-white transition">
                  会社情報
                </button>
              </li>
            </ul>
          </div>

          {/* ポリシー */}
          <div>
            <h4 className="font-semibold text-white mb-4">法的情報</h4>
            <ul className="space-y-2">
              <li>
                <a href={createPageUrl('PrivacyPolicy')} className="text-sm hover:text-white transition">
                  プライバシーポリシー
                </a>
              </li>
            </ul>
          </div>

          {/* お問い合わせ */}
          <div>
            <h4 className="font-semibold text-white mb-4">お問い合わせ</h4>
            <p className="text-sm text-gray-400">ご質問やご相談は、</p>
            <button onClick={() => onNavigate('contact')} className="text-sm text-blue-400 hover:text-blue-300 transition mt-2">
              お問い合わせフォーム →
            </button>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {settings?.company_name || '合同会社 KR企画'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}