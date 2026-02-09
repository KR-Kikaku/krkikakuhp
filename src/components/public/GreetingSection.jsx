import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function GreetingSection() {
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => base44.entities.SiteSettings.list(),
    select: (data) => data[0]
  });

  if (!settings?.greeting_text) return null;

  return (
    <section id="greeting" className="py-16 md:py-24 px-4 md:px-8 notranslate" translate="no" lang="ja">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          {settings?.greeting_title || 'ごあいさつ'}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {settings?.greeting_image_url && (
            <div className="order-2 md:order-1">
              <img 
                src={settings.greeting_image_url} 
                alt="Greeting" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}
          
          <div className={`order-1 md:order-2 ${!settings?.greeting_image_url ? 'md:col-span-2' : ''}`}>
            <div className="greeting-text prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {settings.greeting_text}
              </p>
            </div>
          </div>
        </div>

        {settings?.ceo_message && (
          <div className="mt-16 bg-gray-50 rounded-lg p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              {settings?.ceo_title || '社長の言葉'}
            </h3>
            <div className="ceo-message prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-6">
                {settings.ceo_message}
              </p>
            </div>
            {settings?.ceo_name && (
              <p className="text-right text-gray-600 font-medium">
                {settings.ceo_name}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}