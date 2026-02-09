import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

export default function BusinessSection() {
  const [businesses, setBusinesses] = useState([]);
  const [bannerUrl, setBannerUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [businessData, settingsData] = await Promise.all([
          base44.entities.Business.list('order'),
          base44.entities.SiteSettings.list()
        ]);

        const activeBusiness = businessData.filter(b => b.is_active !== false);
        setBusinesses(activeBusiness);

        if (settingsData.length > 0) {
          setBannerUrl(settingsData[0].work_banner_url || '');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="h-96 bg-gray-100" />;

  return (
    <section id="business" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* バナー */}
        {bannerUrl && (
          <div className="mb-12 rounded-lg overflow-hidden">
            <img src={bannerUrl} alt="事業バナー" className="w-full h-auto object-cover" />
          </div>
        )}

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">私たちの仕事</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {businesses.map((business, index) => (
            <div key={business.id} className="flex gap-6">
              {/* 番号 */}
              <div className="flex-shrink-0">
                <span className="text-5xl font-light text-gray-200">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* コンテンツ */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {business.title_link ? (
                    <a href={business.title_link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
                      {business.title}
                    </a>
                  ) : (
                    business.title
                  )}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {business.description}
                </p>

                {/* 画像 */}
                {business.images && business.images.length > 0 && (
                  <div className="flex gap-3">
                    {business.images.map((img, i) => (
                      <a
                        key={i}
                        href={img.link || '#'}
                        target={img.link ? '_blank' : undefined}
                        rel={img.link ? 'noopener noreferrer' : undefined}
                      >
                        <img
                          src={img.url}
                          alt={`${business.title} ${i + 1}`}
                          className="w-24 h-24 object-cover rounded cursor-pointer hover:opacity-80 transition"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}