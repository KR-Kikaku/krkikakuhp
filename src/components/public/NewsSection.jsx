import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function NewsSection() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await base44.entities.News.filter({ status: 'published' }, '-publish_date', 3);
      setNews(data);
    };
    fetchNews();
  }, []);

  if (news.length === 0) return null;

  return (
    <section id="news" className="py-16 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 tracking-wide text-gray-800">
          お知らせ
        </h2>

        <div className="space-y-4">
          {news.map((item) => (
            <Link
              key={item.id}
              to={createPageUrl(`NewsDetail?slug=${item.slug}`)}
              className="block bg-white rounded-lg p-4 md:p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center md:flex-row md:items-start gap-4">
                {item.thumbnail_image && (
                  <img
                    src={item.thumbnail_image}
                    alt={item.title}
                    className="w-32 h-32 md:w-32 md:h-32 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center md:items-center gap-3 mb-2 justify-center md:justify-start">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {item.publish_date && format(new Date(item.publish_date), 'yyyy.MM.dd', { locale: ja })}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to={createPageUrl('NewsList')}
            className="inline-block text-blue-600 hover:text-blue-800 font-medium"
          >
            一覧を見る →
          </Link>
        </div>
      </div>
    </section>
  );
}