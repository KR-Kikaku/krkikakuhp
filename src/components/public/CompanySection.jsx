import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

export default function CompanySection() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await base44.entities.SiteSettings.list();
        if (data.length > 0) {
          setSettings(data[0]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  if (loading) return <div className="h-96 bg-gray-100" />;

  return (
    <section id="company" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* バナー */}
        {settings?.company_banner_url && (
          <div className="mb-12 rounded-lg overflow-hidden">
            <img
              src={settings.company_banner_url}
              alt="会社情報バナー"
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">会社情報</h2>

        {/* 社長メッセージ */}
        {settings?.ceo_message && (
          <div className="mb-16 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {settings.ceo_title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {settings.ceo_name}
            </p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {settings.ceo_message}
            </p>
          </div>
        )}

        {/* 企業情報 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">会社名</h4>
            <p className="text-gray-600">{settings?.company_name}</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">代表</h4>
            <p className="text-gray-600">{settings?.representative}</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">設立日</h4>
            <p className="text-gray-600">{settings?.established_date}</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">所在地</h4>
            <p className="text-gray-600">{settings?.address}</p>
          </div>
        </div>
      </div>
    </section>
  );
}