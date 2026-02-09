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
        6
      );
      setNews(data);
    };
    fetchNews();
  }, []);

  return (
    <section id="news" className="py-12 md:py-20 notranslate" translate="no" lang="ja">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
        お知らせ
      </h2>

      {news.length > 0 ? (
        <div className="space-y-4 mb-8">
          {news.map((item) => (
            <Link
              key={item.id}
              to={createPageUrl(`NewsDetail?slug=${item.slug}`)}
              className="block bg-white rounded-lg p-4 md:p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                {item.cover_image && (
                  <img
                    src={item.cover_image}
                    alt={item.title}
                    className="w-24 h-20 md:w-32 md:h-24 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {item.publish_date &&
                        format(new Date(item.publish_date), 'yyyy.MM.dd', {
                          locale: ja
                        })}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-medium text-gray-800 hover:text-gray-600 line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          お知らせはまだありません
        </div>
      )}

      <div className="text-center">
        <Link
          to={createPageUrl('NewsList')}
          className="inline-block px-6 py-3 border-2 border-gray-900 text-gray-900 font-medium rounded hover:bg-gray-900 hover:text-white transition-all"
        >
          一覧を見る
        </Link>
      </div>
    </section>
  );
}