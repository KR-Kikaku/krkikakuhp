import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Footer({ onNavigate }) {
  const navigate = useNavigate();
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => base44.entities.SiteSettings.list(),
    select: (data) => data[0]
  });

  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          {settings?.footer_logo_url && (
            <img src={settings.footer_logo_url} alt="Logo" className="h-12 mb-4" />
          )}
          {settings?.company_name && (
            <p className="font-semibold">{settings.company_name}</p>
          )}
        </div>
        
        <div>
          <h3 className="mb-4 font-semibold">メニュー</h3>
          <div className="space-y-2">
            <button onClick={() => onNavigate('greeting')} className="block hover:text-blue-400 transition font-semibold">
              ご挨拶
            </button>
            <button onClick={() => onNavigate('business')} className="block hover:text-blue-400 transition font-semibold">
              私たちの仕事
            </button>
            <button onClick={() => onNavigate('news')} className="block hover:text-blue-400 transition font-semibold">
              ニュース
            </button>
            <button onClick={() => onNavigate('company')} className="block hover:text-blue-400 transition font-semibold">
              会社情報
            </button>
            <button onClick={() => onNavigate('contact')} className="block hover:text-blue-400 transition font-semibold">
              お問い合わせ
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="mb-4 font-semibold">リンク</h3>
          <button
            onClick={() => navigate(createPageUrl('PrivacyPolicy'))}
            className="block hover:text-blue-400 transition font-semibold"
          >
            プライバシーポリシー
          </button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700 text-center text-sm">
        <p className="font-semibold">© 2024 {settings?.company_name || ''}. All rights reserved.</p>
      </div>
    </footer>
  );
}