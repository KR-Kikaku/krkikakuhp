import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function CompanySection() {
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      const data = await base44.entities.SiteSettings.list();
      return data.length > 0 ? data[0] : null;
    },
  });

  const defaultCeoTitle = '「何事も挑戦」';
  const defaultCeoMessage = `私の信念は、「何事も挑戦」。
新しい企画にも、未知の分野にも、まずは一歩踏み出すこと。
その姿勢こそが、KR企画らしさであり、これからも変わらず大切にしていく想いです。
これからも、皆さまに柔軟に、誠実に、そして楽しみながら挑戦を続けてまいります。
どうぞ、今後の合同会社KR企画にご期待ください。`;
  const defaultCeoName = '代表社員 兼 CEO　田中 恭平';

  const companyInfo = [
    { label: '会社名', value: settings?.company_name || '合同会社 KR企画' },
    { label: '代表', value: settings?.representative || '田中 恭平' },
    { label: '設立日', value: settings?.established_date || '2025年12月23日' },
    { label: '所在地', value: settings?.address || '〒333-3333 岡山県岡山市XXXXXXXXXXXXXXX' },
    { label: '電話番号', value: settings?.phone || '00-0000-0000' },
  ];

  return (
    <section id="company" className="notranslate" translate="no" lang="ja">
      {/* Banner */}
      <div className="relative w-full aspect-[16/6] sm:aspect-[16/5] overflow-hidden">
        <img
          src={settings?.company_banner_url || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=400&fit=crop"}
          alt="会社情報"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* CEO Message */}
          <div className="mb-20">
            <h3 className="text-xl md:text-2xl font-semibold text-left mb-8 text-gray-800 tracking-wide">
              {settings?.ceo_title || defaultCeoTitle}
            </h3>
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-700 text-left whitespace-pre-line font-medium tracking-wide" style={{ lineHeight: '2' }}>
                {settings?.ceo_message || defaultCeoMessage}
              </p>
            </div>
            <p className="text-right mt-8 text-gray-800 font-semibold tracking-wide">
              {settings?.ceo_name || defaultCeoName}
            </p>
          </div>

          {/* Company Info Table */}
          <div className="border-t border-gray-200">
            {companyInfo.map((info, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row border-b border-gray-200 py-4"
              >
                <div className="w-full md:w-1/4 font-medium text-gray-700 mb-2 md:mb-0">
                  {info.label}
                </div>
                <div className="w-full md:w-3/4 text-gray-600">
                  {info.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}