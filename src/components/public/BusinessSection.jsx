import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export default function BusinessSection() {
  const [settings, setSettings] = useState(null);
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [settingsData, businessData] = await Promise.all([
        base44.entities.SiteSettings.list(),
        base44.entities.Business.filter({ is_active: true }, 'order')
      ]);
      if (settingsData.length > 0) setSettings(settingsData[0]);
      setBusinesses(businessData);
    };
    fetchData();
  }, []);

  return (
    <section id="work" className="notranslate" translate="no" lang="ja">
      {/* Banner */}
      <div className="relative w-full aspect-[16/6] sm:aspect-[16/5] overflow-hidden">
        <img
          src={settings?.work_banner_url || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=400&fit=crop"}
          alt="私たちの仕事"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-widest">
            私たちの仕事
          </h2>
        </div>
      </div>

      {/* Business Items */}
      <div className="py-20 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          {businesses.length > 0 ? (
            businesses.map((business, index) => (
              <div key={business.id} className="mb-20 last:mb-0">
                <div className="flex items-start gap-6 mb-8">
                  <span className="text-4xl md:text-5xl font-light text-gray-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    {business.title_link ? (
                      <a
                        href={business.title_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl md:text-2xl font-medium text-gray-800 hover:text-blue-600 transition-colors"
                      >
                        {business.title}
                      </a>
                    ) : (
                      <h3 className="text-xl md:text-2xl font-medium text-gray-800">
                        {business.title}
                      </h3>
                    )}
                    <p className="mt-4 text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {business.description}
                    </p>
                  </div>
                </div>

                {business.images && business.images.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-0 md:ml-16">
                    {business.images.slice(0, 3).map((img, imgIndex) => (
                      img.link ? (
                        <a
                          key={imgIndex}
                          href={img.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <img
                            src={img.url}
                            alt={`${business.title} ${imgIndex + 1}`}
                            className="w-full aspect-[4/3] object-cover rounded-lg hover:opacity-90 transition-opacity"
                          />
                        </a>
                      ) : (
                        <img
                          key={imgIndex}
                          src={img.url}
                          alt={`${business.title} ${imgIndex + 1}`}
                          className="w-full aspect-[4/3] object-cover rounded-lg"
                        />
                      )
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="mb-20">
              <div className="flex items-start gap-6 mb-8">
                <span className="text-4xl md:text-5xl font-light text-gray-300">01</span>
                <div>
                  <h3 className="text-xl md:text-2xl font-medium text-gray-800">
                    マッチングサービス「スキピ」
                  </h3>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    2025年12月より、マッチングサービス「スキピ」の運営を引き継いでおります。人生を一緒に楽しめる相手と巡りあうお手伝いが出来るように、日々改善しながら、心を込めて運営しております。
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-0 md:ml-16">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
                  alt="Service 1"
                  className="w-full aspect-[4/3] object-cover rounded-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"
                  alt="Service 2"
                  className="w-full aspect-[4/3] object-cover rounded-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
                  alt="Service 3"
                  className="w-full aspect-[4/3] object-cover rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}