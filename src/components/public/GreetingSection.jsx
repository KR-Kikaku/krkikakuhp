import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export default function GreetingSection() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await base44.entities.SiteSettings.list();
      if (data.length > 0) setSettings(data[0]);
    };
    fetchSettings();
  }, []);

  const defaultTitle = 'あなたの日常を明るく、楽しいものへ';
  const defaultText = `合同会社KR企画のホームページをご覧いただき、心よりありがとうございます。
私たちは、ITを軸にしながら、イベント企画や物販など、ジャンルにとらわれない企画やアイデアを形にする会社です。
「挑戦するなら、とことん自分たち、みんなが楽しめるものをつくりたい」そんなシンプルな思いが、KR企画のスタートでした。
楽しさを掘り起こし、技術と発想を組み合わせて、もっと身近に届けていきたい。
そして、この事業を通じて、皆さまの日常が少し明るくなる瞬間を増やせたら、これほど嬉しいことはありません。`;

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div id="greeting" className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* 左側：縦書き「ご挨拶」 */}
          <div className="flex-shrink-0">
            <div className="md:writing-mode-vertical-rl md:text-orientation-upright text-2xl md:text-3xl font-bold tracking-widest text-gray-800 border-l-4 border-gray-800 pl-4 md:pl-0 md:pr-4">
              ご挨拶
            </div>
          </div>

          {/* 右側：コンテンツ */}
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-medium mb-8 tracking-wide text-gray-800">
              {settings?.greeting_title || defaultTitle}
            </h2>
            
            <div className="text-gray-700 text-left whitespace-pre-line text-sm md:text-base font-medium tracking-wide mb-8" style={{ lineHeight: '2' }}>
              {settings?.greeting_text || defaultText}
            </div>

            {(settings?.greeting_image_url || !settings) && (
              <div className="mt-8">
                <img
                  src={settings?.greeting_image_url || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop"}
                  alt="Greeting"
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}