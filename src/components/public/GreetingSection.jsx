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
    <section id="greeting" className="py-12 md:py-20 notranslate" translate="no" lang="ja">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {settings?.greeting_image_url && (
          <img
            src={settings.greeting_image_url}
            alt="ご挨拶"
            className="w-full h-auto rounded-lg object-cover aspect-square"
          />
        )}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {settings?.greeting_title || 'ご挨拶'}
          </h2>
          <div className="text-gray-600 text-sm md:text-base leading-relaxed">
            {settings?.greeting_text?.split('\n').map((line, idx) => (
              <p key={idx} className="mb-4">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}