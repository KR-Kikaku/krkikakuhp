import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function CompanySection() {
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => base44.entities.SiteSettings.list(),
    initialData: []
  });

  const setting = settings[0] || {};

  const companyInfo = [
    { label: '会社名', value: setting.company_name },
    { label: '代表', value: setting.representative },
    { label: '設立', value: setting.established_date },
    { label: '所在地', value: setting.address },
    { label: '電話番号', value: setting.phone }
  ];

  return (
    <section id="会社情報" className="px-4 md:px-8 py-16 max-w-6xl mx-auto">
      {setting.company_banner_url && (
        <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
          <img 
            src={setting.company_banner_url} 
            alt="Company" 
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      <h2 className="text-center mb-12">会社情報</h2>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto">
        {companyInfo.map((item, index) => (
          item.value && (
            <div 
              key={index}
              className={`grid md:grid-cols-3 gap-4 p-6 ${
                index !== companyInfo.length - 1 ? 'border-b' : ''
              }`}
            >
              <div className="company-label">{item.label}</div>
              <div className="md:col-span-2 company-value">{item.value}</div>
            </div>
          )
        ))}
      </div>
    </section>
  );
}