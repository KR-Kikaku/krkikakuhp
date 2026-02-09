import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function GreetingSection() {
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => base44.entities.SiteSettings.list(),
    initialData: []
  });

  const setting = settings[0] || {};

  return (
    <section id="ご挨拶" className="px-4 md:px-8 py-16 max-w-6xl mx-auto">
      <h2 className="text-center mb-12">{setting.greeting_title || 'ご挨拶'}</h2>
      
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="greeting-text">
          <p className="leading-relaxed whitespace-pre-line">
            {setting.greeting_text}
          </p>
        </div>

        {setting.greeting_image_url && (
          <div className="order-first md:order-last">
            <img 
              src={setting.greeting_image_url} 
              alt="Greeting" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>

      {setting.ceo_message && (
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h3 className="mb-6">{setting.ceo_title || '社長の言葉'}</h3>
          <div className="ceo-message">
            <p className="leading-relaxed whitespace-pre-line mb-6">
              {setting.ceo_message}
            </p>
          </div>
          <p className="text-right">
            <span className="company-label">{setting.company_name}</span>
            <br />
            <span className="company-label">{setting.representative}</span> <span className="company-value">{setting.ceo_name}</span>
          </p>
        </div>
      )}
    </section>
  );
}