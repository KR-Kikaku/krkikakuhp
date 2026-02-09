import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function BusinessSection() {
  const [businesses, setBusinesses] = useState([]);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const businessData = await base44.entities.Business.filter(
        { is_active: true },
        'order'
      );
      const settingsData = await base44.entities.SiteSettings.list();
      setBusinesses(businessData);
      if (settingsData.length > 0) {
        setSettings(settingsData[0]);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="business" className="py-16 md:py-24 notranslate" translate="no" lang="ja">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          私たちの仕事
        </h2>

        {businesses.length > 0 ? (
          <div className="space-y-12">
            {businesses.map((business, index) => (
              <div key={business.id} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
                  {index % 2 === 0 ? (
                    <>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                          {business.title_link ? (
                            <Link to={business.title_link} className="hover:text-blue-600">
                              {business.title}
                            </Link>
                          ) : (
                            business.title
                          )}
                        </h3>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                          {business.description}
                        </p>
                      </div>
                      <div className="flex gap-4 flex-wrap">
                        {business.images && business.images.slice(0, 3).map((img, idx) => (
                          <div key={idx} className="flex-1 min-w-40">
                            {img.link ? (
                              <a href={img.link} target="_blank" rel="noopener noreferrer">
                                <img
                                  src={img.url}
                                  alt={`${business.title}画像${idx + 1}`}
                                  className="w-full h-40 object-cover rounded-lg hover:opacity-80 transition"
                                />
                              </a>
                            ) : (
                              <img
                                src={img.url}
                                alt={`${business.title}画像${idx + 1}`}
                                className="w-full h-40 object-cover rounded-lg"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-4 flex-wrap">
                        {business.images && business.images.slice(0, 3).map((img, idx) => (
                          <div key={idx} className="flex-1 min-w-40">
                            {img.link ? (
                              <a href={img.link} target="_blank" rel="noopener noreferrer">
                                <img
                                  src={img.url}
                                  alt={`${business.title}画像${idx + 1}`}
                                  className="w-full h-40 object-cover rounded-lg hover:opacity-80 transition"
                                />
                              </a>
                            ) : (
                              <img
                                src={img.url}
                                alt={`${business.title}画像${idx + 1}`}
                                className="w-full h-40 object-cover rounded-lg"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
                          {String(index).padStart(2, '0')}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                          {business.title_link ? (
                            <Link to={business.title_link} className="hover:text-blue-600">
                              {business.title}
                            </Link>
                          ) : (
                            business.title
                          )}
                        </h3>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                          {business.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            事業情報はまだありません
          </div>
        )}
      </div>
    </section>
  );
}