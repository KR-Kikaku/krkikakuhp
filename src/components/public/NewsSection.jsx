import React, { useState, useEffect } from 'react';
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
    <section id="news" className="py-12 md:py-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 tracking-wide text-gray-800">
          お知らせ
        </h2>

        <div className="space-y-4 md:space-y-6">
          {news.map((item) => (
            <Link
              key={item.id}
              to={createPageUrl(`NewsDetail?slug=${item.slug}`)}
              className="block bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col sm:flex-row">
                {item.cover_image && (
                  <div className="flex-shrink-0 w-full sm:w-32 md:w-40 h-32 md:h-32 overflow-hidden">
                    <img
                      src={item.cover_image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 p-4 md:p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {item.publish_date && format(new Date(item.publish_date), 'yyyy.MM.dd', { locale: ja })}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-medium text-gray-800 line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Link
            to={createPageUrl('NewsList')}
            className="inline-block px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            お知らせ一覧
          </Link>
        </div>
      </div>
    </section>
  );
}