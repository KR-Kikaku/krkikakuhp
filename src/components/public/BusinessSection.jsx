import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function BusinessSection() {
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => base44.entities.SiteSettings.list(),
    select: (data) => data[0]
  });

  const { data: businesses } = useQuery({
    queryKey: ['businesses'],
    queryFn: () => base44.entities.Business.filter({ is_active: true }, 'order'),
    initialData: []
  });

  if (businesses.length === 0) return null;

  return (
    <section id="business" className="py-16 md:py-24 px-4 md:px-8 bg-gray-50 notranslate" translate="no" lang="ja">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
          私たちの仕事
        </h2>
        
        {settings?.work_banner_url && (
          <div className="mb-12">
            <img 
              src={settings.work_banner_url} 
              alt="Our Work" 
              className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="space-y-12">
          {businesses.map((business) => (
            <div key={business.id} className="bg-white rounded-lg shadow-md p-6 md:p-8">
              {business.title_link ? (
                <a 
                  href={business.title_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors mb-4 block"
                >
                  {business.title}
                </a>
              ) : (
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {business.title}
                </h3>
              )}
              
              <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
                {business.description}
              </p>

              {business.images && business.images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {business.images.map((image, idx) => (
                    <div key={idx}>
                      {image.link ? (
                        <a href={image.link} target="_blank" rel="noopener noreferrer">
                          <img 
                            src={image.url} 
                            alt={`${business.title} ${idx + 1}`}
                            className="w-full h-48 object-cover rounded-lg shadow hover:shadow-lg transition-shadow"
                          />
                        </a>
                      ) : (
                        <img 
                          src={image.url} 
                          alt={`${business.title} ${idx + 1}`}
                          className="w-full h-48 object-cover rounded-lg shadow"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}