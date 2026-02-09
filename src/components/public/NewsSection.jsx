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
      const data = await base44.entities.News.filter(
        { status: 'published' },
        '-publish_date',
        3
      );
      setNews(data);
    };
    fetchNews();
  }, []);

  return (
    <section id="news" className="py-16 md:py-24 bg-gray-50 notranslate" translate="no" lang="ja">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          お知らせ
        </h2>

        {news.length > 0 ? (
          <div className="space-y-6 mb-12">
            {news.map((item) => (
              <Link
                key={item.id}
                to={createPageUrl(`NewsDetail?slug=${item.slug}`)}
                className="block bg-white rounded-lg p-6 md:p-8 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-6">
                  {item.cover_image && (
                    <img
                      src={item.cover_image}
                      alt={item.title}
                      className="w-32 h-32 md:w-40 md:h-40 object-cover rounded flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {item.publish_date &&
                          format(new Date(item.publish_date), 'yyyy.MM.dd', {
                            locale: ja
                          })}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 hover:text-blue-600 transition">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            お知らせはまだありません
          </div>
        )}

        <div className="text-center">
          <Link
            to={createPageUrl('NewsList')}
            className="inline-block px-8 py-3 border-2 border-gray-900 text-gray-900 font-bold rounded hover:bg-gray-900 hover:text-white transition-all"
          >
            一覧を見る
          </Link>
        </div>
      </div>
    </section>
  );
}