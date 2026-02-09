import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function CompanySection() {
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => base44.entities.SiteSettings.list(),
    select: (data) => data[0]
  });

  if (!settings) return null;

  return (
    <section id="company" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-12 font-semibold">会社情報</h2>
        
        {settings.company_banner_url && (
          <img src={settings.company_banner_url} alt="" className="w-full h-64 object-cover rounded shadow-lg mb-12" />
        )}
        
        {settings.ceo_message && (
          <div className="bg-white rounded shadow-md p-8 mb-12">
            <h3 className="mb-4 font-semibold">{settings.ceo_title || '社長の言葉'}</h3>
            <div className="ceo-message whitespace-pre-wrap mb-4">
              {settings.ceo_message}
            </div>
            {settings.ceo_name && (
              <div className="text-right text-gray-600">{settings.ceo_name}</div>
            )}
          </div>
        )}
        
        <div className="bg-white rounded shadow-md p-8">
          <div className="space-y-4">
            {settings.company_name && (
              <div className="grid md:grid-cols-4 gap-4">
                <div className="company-label">会社名</div>
                <div className="md:col-span-3 company-value">{settings.company_name}</div>
              </div>
            )}
            {settings.representative && (
              <div className="grid md:grid-cols-4 gap-4">
                <div className="company-label">代表</div>
                <div className="md:col-span-3 company-value">{settings.representative}</div>
              </div>
            )}
            {settings.established_date && (
              <div className="grid md:grid-cols-4 gap-4">
                <div className="company-label">設立</div>
                <div className="md:col-span-3 company-value">{settings.established_date}</div>
              </div>
            )}
            {settings.address && (
              <div className="grid md:grid-cols-4 gap-4">
                <div className="company-label">所在地</div>
                <div className="md:col-span-3 company-value">{settings.address}</div>
              </div>
            )}
            {settings.phone && (
              <div className="grid md:grid-cols-4 gap-4">
                <div className="company-label">電話番号</div>
                <div className="md:col-span-3 company-value">{settings.phone}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}