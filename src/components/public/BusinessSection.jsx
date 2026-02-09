import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function BusinessSection() {
  const { data: businesses } = useQuery({
    queryKey: ['businesses'],
    queryFn: () => base44.entities.Business.filter({ is_active: true }, 'order'),
    initialData: []
  });

  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => base44.entities.SiteSettings.list(),
    initialData: []
  });

  const setting = settings[0] || {};

  return (
    <section id="私たちの仕事" className="px-4 md:px-8 py-16 bg-gray-50">
      {setting.work_banner_url && (
        <div className="mb-12 rounded-lg overflow-hidden shadow-lg max-w-6xl mx-auto">
          <img 
            src={setting.work_banner_url} 
            alt="Our Work" 
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      <h2 className="text-center mb-12">私たちの仕事</h2>

      <div className="max-w-6xl mx-auto space-y-16">
        {businesses.map((business) => (
          <div key={business.id} className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="mb-4">
              {business.title_link ? (
                <a 
                  href={business.title_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  {business.title}
                </a>
              ) : (
                business.title
              )}
            </h3>

            <p className="mb-6 whitespace-pre-line leading-relaxed">
              {business.description}
            </p>

            {business.images && business.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {business.images.map((img, idx) => (
                  <div key={idx} className="rounded-lg overflow-hidden shadow">
                    {img.link ? (
                      <a href={img.link} target="_blank" rel="noopener noreferrer">
                        <img 
                          src={img.url} 
                          alt={`${business.title} ${idx + 1}`}
                          className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                        />
                      </a>
                    ) : (
                      <img 
                        src={img.url} 
                        alt={`${business.title} ${idx + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}