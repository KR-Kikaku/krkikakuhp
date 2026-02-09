import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export default function BusinessSection() {
  const [businesses, setBusinesses] = useState([]);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [businessData, settingsData] = await Promise.all([
        base44.entities.Business.filter({ is_active: true }, 'order'),
        base44.entities.SiteSettings.list()
      ]);
      setBusinesses(businessData);
      if (settingsData.length > 0) {
        setSettings(settingsData[0]);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="business" className="py-12 md:py-20 bg-gray-50 -mx-4 md:mx-0 px-4 md:px-0 notranslate" translate="no" lang="ja">
      <div className="max-w-[1280px] mx-auto md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          事業紹介
        </h2>

        <div className="space-y-8">
          {businesses.map((business, idx) => (
            <div
              key={business.id}
              className={`grid grid-cols-1 ${
                idx % 2 === 0 ? 'md:grid-cols-2' : 'md:grid-cols-2'
              } gap-8 items-center`}
            >
              {/* テキスト部分 */}
              <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
                {business.title_link ? (
                  <a href={business.title_link} target="_blank" rel="noopener noreferrer">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 hover:text-gray-600 transition-colors">
                      {business.title}
                    </h3>
                  </a>
                ) : (
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {business.title}
                  </h3>
                )}
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {business.description}
                </p>
              </div>

              {/* 画像部分 */}
              <div className={`space-y-4 ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                {business.images && business.images.map((image, imgIdx) => (
                  <div key={imgIdx} className="overflow-hidden rounded-lg">
                    {image.link ? (
                      <a href={image.link} target="_blank" rel="noopener noreferrer">
                        <img
                          src={image.url}
                          alt={`${business.title} ${imgIdx + 1}`}
                          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </a>
                    ) : (
                      <img
                        src={image.url}
                        alt={`${business.title} ${imgIdx + 1}`}
                        className="w-full h-auto object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}