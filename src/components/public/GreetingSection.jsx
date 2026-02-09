import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function GreetingSection() {
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => base44.entities.SiteSettings.list(),
    select: (data) => data[0]
  });

  if (!settings?.greeting_title) return null;

  return (
    <section id="greeting" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-12 font-semibold">{settings.greeting_title}</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="greeting-text whitespace-pre-wrap">
            {settings.greeting_text}
          </div>
          
          {settings.greeting_image_url && (
            <div>
              <img src={settings.greeting_image_url} alt="" className="w-full h-auto rounded shadow-lg" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}