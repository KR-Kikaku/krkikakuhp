import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export default function CompanySection() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await base44.entities.SiteSettings.list();
      if (data.length > 0) {
        setSettings(data[0]);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section id="company" className="py-16 md:py-24 notranslate" translate="no" lang="ja">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          会社情報
        </h2>

        {settings?.company_banner_url && (
          <img
            src={settings.company_banner_url}
            alt="会社情報バナー"
            className="w-full h-auto rounded-lg object-cover aspect-video mb-12"
          />
        )}

        <div className="max-w-3xl mx-auto space-y-12">
          {settings?.ceo_title && (
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                {settings.ceo_title}
              </h3>
              {settings?.ceo_message && (
                <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {settings.ceo_message}
                </p>
              )}
              {settings?.ceo_name && (
                <p className="text-gray-900 font-bold mt-8">
                  {settings.ceo_name}
                </p>
              )}
            </div>
          )}

          <div className="border-t pt-8">
            <table className="w-full text-sm md:text-base">
              <tbody className="space-y-4">
                {settings?.company_name && (
                  <tr>
                    <td className="font-bold text-gray-900 pb-4 w-28">会社名</td>
                    <td className="text-gray-700 pb-4">{settings.company_name}</td>
                  </tr>
                )}
                {settings?.representative && (
                  <tr>
                    <td className="font-bold text-gray-900 pb-4">代表</td>
                    <td className="text-gray-700 pb-4">{settings.representative}</td>
                  </tr>
                )}
                {settings?.established_date && (
                  <tr>
                    <td className="font-bold text-gray-900 pb-4">設立日</td>
                    <td className="text-gray-700 pb-4">{settings.established_date}</td>
                  </tr>
                )}
                {settings?.address && (
                  <tr>
                    <td className="font-bold text-gray-900 pb-4">所在地</td>
                    <td className="text-gray-700 pb-4">{settings.address}</td>
                  </tr>
                )}
                {settings?.phone && (
                  <tr>
                    <td className="font-bold text-gray-900">電話番号</td>
                    <td className="text-gray-700">
                      <a
                        href={`tel:${settings.phone}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {settings.phone}
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}