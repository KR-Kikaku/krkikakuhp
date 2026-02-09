import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export default function GreetingSection() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const settingsList = await base44.entities.SiteSettings.list();
      if (settingsList.length > 0) {
        setSettings(settingsList[0]);
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  if (loading) {
    return <div className="h-96 bg-gray-100 animate-pulse"></div>;
  }

  if (!settings) {
    return null;
  }

  return (
    <section id="greeting" className="py-16 md:py-24 px-4 md:px-12">
      <div className="max-w-[1280px] mx-auto">
        {/* メインセクション */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          {/* 左側：テキスト */}
          <div className="space-y-6">
            {settings.greeting_title && (
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {settings.greeting_title}
              </h2>
            )}
            {settings.greeting_text && (
              <p className="text-base md:text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
                {settings.greeting_text}
              </p>
            )}
          </div>

          {/* 右側：画像 */}
          {settings.greeting_image_url && (
            <div className="flex justify-center">
              <img
                src={settings.greeting_image_url}
                alt="ご挨拶画像"
                className="w-full max-w-md object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>

        {/* 社長メッセージセクション */}
        {settings.ceo_title || settings.ceo_message || settings.ceo_name ? (
          <div className="bg-gray-50 rounded-lg p-8 md:p-12">
            {settings.ceo_title && (
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {settings.ceo_title}
              </h3>
            )}
            {settings.ceo_message && (
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 whitespace-pre-wrap">
                {settings.ceo_message}
              </p>
            )}
            {settings.ceo_name && (
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  {settings.ceo_name}
                </p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}