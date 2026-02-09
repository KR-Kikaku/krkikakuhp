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
    <section
      id="company"
      className="py-12 md:py-20 bg-gray-50 -mx-4 md:mx-0 px-4 md:px-0 notranslate"
      translate="no"
      lang="ja"
    >
      <div className="max-w-[1280px] mx-auto md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          会社情報
        </h2>

        {settings?.company_banner_url && (
          <img
            src={settings.company_banner_url}
            alt="会社情報バナー"
            className="w-full h-auto rounded-lg object-cover aspect-video mb-12"
          />
        )}

        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
            {settings?.ceo_title && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {settings.ceo_title}
                </h3>
                {settings?.ceo_message && (
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                    {settings.ceo_message}
                  </p>
                )}
                {settings?.ceo_name && (
                  <p className="text-gray-700 font-medium mt-4">
                    {settings.ceo_name}
                  </p>
                )}
              </div>
            )}

            {/* 会社情報テーブル */}
            <div className="border-t pt-8">
              <table className="w-full text-sm">
                <tbody className="space-y-4">
                  {settings?.company_name && (
                    <tr>
                      <td className="font-medium text-gray-900 pb-3 w-32">
                        会社名
                      </td>
                      <td className="text-gray-600 pb-3">
                        {settings.company_name}
                      </td>
                    </tr>
                  )}
                  {settings?.representative && (
                    <tr>
                      <td className="font-medium text-gray-900 pb-3">代表</td>
                      <td className="text-gray-600 pb-3">
                        {settings.representative}
                      </td>
                    </tr>
                  )}
                  {settings?.established_date && (
                    <tr>
                      <td className="font-medium text-gray-900 pb-3">
                        設立日
                      </td>
                      <td className="text-gray-600 pb-3">
                        {settings.established_date}
                      </td>
                    </tr>
                  )}
                  {settings?.address && (
                    <tr>
                      <td className="font-medium text-gray-900 pb-3">
                        所在地
                      </td>
                      <td className="text-gray-600 pb-3">
                        {settings.address}
                      </td>
                    </tr>
                  )}
                  {settings?.phone && (
                    <tr>
                      <td className="font-medium text-gray-900">電話番号</td>
                      <td className="text-gray-600">
                        <a
                          href={`tel:${settings.phone}`}
                          className="hover:text-gray-900 transition-colors"
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
      </div>
    </section>
  );
}