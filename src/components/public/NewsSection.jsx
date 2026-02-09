import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await base44.entities.News.list('-publish_date');
        const published = data.filter(n => n.status === 'published').slice(0, 6);
        setNews(published);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <div className="h-96 bg-gray-100" />;

  return (
    <section id="news" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">お知らせ</h2>

        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map(article => (
              <a
                key={article.id}
                href={createPageUrl(`NewsDetail?slug=${article.slug}`)}
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
              >
                {article.cover_image && (
                  <div className="aspect-video overflow-hidden bg-gray-200">
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded">
                      {article.category}
                    </span>
                    {article.publish_date && (
                      <span className="text-xs text-gray-500">
                        {format(new Date(article.publish_date), 'yyyy/MM/dd', { locale: ja })}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg text-center text-gray-500">
            お知らせがありません
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href={createPageUrl('NewsList')}
            className="inline-block px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition"
          >
            すべてのお知らせを見る →
          </a>
        </div>
      </div>
    </section>
  );
}