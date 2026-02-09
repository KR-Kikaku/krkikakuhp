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

  if (!businesses.length) return null;

  return (
    <section id="business" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-6">私たちの仕事</h2>
        
        {settings?.work_banner_url && (
          <img src={settings.work_banner_url} alt="" className="w-full h-64 object-cover rounded shadow-lg mb-12" />
        )}
        
        <div className="space-y-12">
          {businesses.map((business) => (
            <div key={business.id} className="bg-white rounded shadow-md p-8">
              {business.title_link ? (
                <a href={business.title_link} target="_blank" rel="noopener noreferrer">
                  <h3 className="mb-4 hover:text-blue-600 transition">{business.title}</h3>
                </a>
              ) : (
                <h3 className="mb-4">{business.title}</h3>
              )}
              
              <p className="mb-6 whitespace-pre-wrap">{business.description}</p>
              
              {business.images && business.images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {business.images.map((img, idx) => (
                    <div key={idx}>
                      {img.link ? (
                        <a href={img.link} target="_blank" rel="noopener noreferrer">
                          <img src={img.url} alt="" className="w-full h-48 object-cover rounded hover:opacity-90 transition" />
                        </a>
                      ) : (
                        <img src={img.url} alt="" className="w-full h-48 object-cover rounded" />
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