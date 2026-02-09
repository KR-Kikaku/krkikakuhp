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

  const info = [
    { label: '会社名', value: settings.company_name },
    { label: '代表', value: settings.representative },
    { label: '設立', value: settings.established_date },
    { label: '所在地', value: settings.address },
    { label: '電話番号', value: settings.phone }
  ].filter(i => i.value);

  return (
    <section id="company" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-6">会社情報</h2>

        {settings.company_banner_url && (
          <img src={settings.company_banner_url} alt="" className="w-full h-64 object-cover rounded shadow-lg mb-16" />
        )}

        <div className="bg-white rounded shadow-md p-8 mb-12">
          <div className="prose max-w-none">
            <h3 className="mb-6">何事も挑戦</h3>
            <p className="mb-4">
              私の信念は、「何事も挑戦」。<br />
              新しい企画にも、未知の分野にも、まずは一歩踏み出すこと。<br />
              その姿勢こそが、KR企画らしさであり、これからも変わらず大切にしていく想いです。<br />
              皆さまに柔軟に、誠実に、そして楽しみながら挑戦を続けてまいります。
            </p>
            <p className="mb-4">
              当社は、WebサービスおよびWebサイトの企画・運営・管理を中心としたIT関連事業を行っています。
            </p>
            <p className="mb-4">
              インターネットを活用した事業は変化が早く、新しい技術や仕組みに柔軟に取り組む姿勢が求められます。<br />
              当社では、その変化を前向きに捉え、常に新しいことへ挑戦する姿勢を大切にしています。
            </p>
            <p className="mb-4">
              一方で、挑戦には責任が伴うと考えています。<br />
              当社は、短期的な成果や急激な拡大を目的とするのではなく、一つひとつの事業を段階的に進め、<br />
              十分な検討と準備を重ねたうえで取り組むことを基本方針としています。
            </p>
            <p className="mb-4">
              現在は、既存Webサービスの運営引継ぎを行いながら、運営体制の整備および関連法令への対応を進めております。<br />
              必要な届出や手続きについても、関係機関と確認を行い、適切に対応してまいります。
            </p>
            <p className="mb-4">
              今後は、Webサービス運営で得た知見を活かし、Webサイト運営支援や管理業務など、<br />
              事業者様の課題解決につながる分野にも着実に挑戦していく予定です。
            </p>
            <p className="mb-4">
              法令を遵守し、社会的信用を大切にしながら、<br />
              挑戦と安定の両立を図り、信頼される企業であり続けることを目指してまいります。
            </p>
            <p className="mb-4">
              今後とも、どうぞよろしくお願いいたします。
            </p>
            <p className="text-right">
              代表社員 兼 CEO　田中 恭平
            </p>
          </div>
        </div>

        <div className="bg-white rounded shadow-md p-8">
          {info.map((item, idx) => (
            <div key={idx} className="border-b last:border-0 py-4">
              <div className="grid md:grid-cols-4 gap-4">
                <dt className="company-label">{item.label}</dt>
                <dd className="company-value md:col-span-3">{item.value}</dd>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}