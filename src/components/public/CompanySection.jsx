import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function CompanySection() {
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => base44.entities.SiteSettings.list(),
    select: (data) => data[0]
  });

  if (!settings?.company_name) return null;

  const companyInfo = [
    { label: '会社名', value: settings.company_name },
    { label: '代表', value: settings.representative },
    { label: '設立', value: settings.established_date },
    { label: '所在地', value: settings.address },
    { label: '電話番号', value: settings.phone }
  ].filter(item => item.value);

  return (
    <section id="company" className="py-16 md:py-24 px-4 md:px-8 bg-gray-50 notranslate" translate="no" lang="ja">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
          会社情報
        </h2>

        {settings?.company_banner_url && (
          <div className="mb-12">
            <img 
              src={settings.company_banner_url} 
              alt="Company" 
              className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="space-y-6">
            {companyInfo.map((item, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="grid md:grid-cols-4 gap-4">
                  <dt className="company-label text-gray-900">
                    {item.label}
                  </dt>
                  <dd className="company-value md:col-span-3 text-gray-700">
                    {item.value}
                  </dd>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}