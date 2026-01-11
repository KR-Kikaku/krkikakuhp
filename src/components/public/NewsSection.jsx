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

  return (
    <section id="news" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 tracking-wide text-gray-800">
          お知らせ
        </h2>

        <div className="space-y-6">
          {news.length > 0 ? (
            news.map((item) => (
              <Link
                key={item.id}
                to={createPageUrl(`NewsDetail?slug=${item.slug}`)}
                className="block bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {item.cover_image && (
                    <img
                      src={item.cover_image}
                      alt={item.title}
                      className="w-full md:w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
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
            ))
          ) : (
            <div className="text-center text-gray-500 py-12">
              お知らせはまだありません
            </div>
          )}
        </div>

        {news.length >= 3 && (
          <div className="text-center mt-12">
            <Link
              to={createPageUrl('NewsList')}
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gray-800 rounded-full text-sm font-semibold text-gray-800 hover:bg-gray-800 hover:text-white transition-all"
            >
              more <span className="text-lg">+</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}