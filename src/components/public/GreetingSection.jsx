import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export default function GreetingSection() {
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
    <section id="greeting" className="py-16 md:py-24 bg-gray-50 notranslate" translate="no" lang="ja">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          {settings?.greeting_title || 'ご挨拶'}
        </h2>

        <p className="text-center text-sm md:text-base text-gray-600 mb-12">
          あなたの日常を明るく、楽しいものへ
        </p>

        <div className="bg-white rounded-lg p-8 md:p-12 border border-gray-200">
          {settings?.greeting_text && (
            <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line">
              {settings.greeting_text}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}