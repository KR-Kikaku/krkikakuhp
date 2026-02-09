import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      const data = await base44.entities.News.filter(
        { status: 'published' },
        '-publish_date',
        3
      );
      setNews(data);
    };
    fetchNews();
  }, []);

  const handleNewsClick = (slug) => {
    navigate(createPageUrl('NewsDetail') + `?slug=${slug}`);
  };

  if (news.length === 0) return null;

  return (
    <section id="news" className="py-12 md:py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg md:text-3xl font-bold text-center mb-8 md:mb-12">お知らせ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {news.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNewsClick(item.slug)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="w-[36%] md:w-full mx-auto">
                <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                  <img
                    src={item.thumbnail_image || item.cover_image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <span>
                    {new Date(item.publish_date).toLocaleDateString('ja-JP')}
                  </span>
                </div>
                <h3 className="text-xs md:text-lg font-semibold line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => navigate(createPageUrl('NewsList'))}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            一覧を見る
          </button>
        </div>
      </div>
    </section>
  );
}