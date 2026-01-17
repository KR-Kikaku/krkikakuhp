import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function GreetingSection() {
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      const data = await base44.entities.SiteSettings.list();
      return data.length > 0 ? data[0] : null;
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const defaultTitle = 'あなたの日常を明るく、楽しいものへ';
  const defaultText = `合同会社KR企画のホームページをご覧いただき、心よりありがとうございます。
私たちは、ITを軸にしながら、イベント企画や物販など、ジャンルにとらわれない企画やアイデアを形にする会社です。
「挑戦するなら、とことん自分たち、みんなが楽しめるものをつくりたい」そんなシンプルな思いが、KR企画のスタートでした。
楽しさを掘り起こし、技術と発想を組み合わせて、もっと身近に届けていきたい。
そして、この事業を通じて、皆さまの日常が少し明るくなる瞬間を増やせたら、これほど嬉しいことはありません。`;

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <p id="greeting" className="text-2xl md:text-3xl font-semibold text-center mb-6 tracking-wide text-gray-800">
          ご挨拶
        </p>
        <h2 className="text-xl md:text-2xl font-medium text-left mb-12 tracking-wide text-gray-700">
          {settings?.greeting_title || defaultTitle}
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="text-gray-700 text-left whitespace-pre-line text-sm md:text-base font-medium tracking-wide" style={{ lineHeight: '2' }}>
            {settings?.greeting_text || defaultText}
          </div>
        </div>

        {(settings?.greeting_image_url || !settings) && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
            <img
              src={settings?.greeting_image_url || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"}
              alt="Greeting"
              className="w-full h-48 object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
              alt="Office"
              className="w-full h-48 object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop"
              alt="Team"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}