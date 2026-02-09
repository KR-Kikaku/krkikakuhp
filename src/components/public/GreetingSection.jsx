import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

export default function GreetingSection() {
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
    <section id="greeting" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* テキスト */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {settings?.greeting_title || 'あなたの日常を明るく'}
            </h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {settings?.greeting_text || 'ご挨拶の内容をここに記載します'}
            </p>
          </div>

          {/* 画像 */}
          {settings?.greeting_image_url && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={settings.greeting_image_url}
                alt="ご挨拶画像"
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}