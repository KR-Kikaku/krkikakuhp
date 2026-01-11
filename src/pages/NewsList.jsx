import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default function NewsList() {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      const data = await base44.entities.News.filter({ status: 'published' }, '-publish_date');
      setNews(data);
    };
    fetchNews();
  }, []);

  const handleNavigate = (id) => {
    navigate(createPageUrl('Home') + `#${id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={handleNavigate} />
      <main className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl font-light text-center mb-12 tracking-wide text-gray-800">
            お知らせ
          </h1>

          <div className="space-y-6">
            {news.map((item) => (
              <Link
                key={item.id}
                to={createPageUrl(`NewsDetail?slug=${item.slug}`)}
                className="block bg-white rounded-lg p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {item.cover_image && (
                    <img
                      src={item.cover_image}
                      alt={item.title}
                      className="w-full md:w-40 h-32 object-cover rounded-lg"
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
            ))}

            {news.length === 0 && (
              <div className="text-center text-gray-500 py-12">
                お知らせはまだありません
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}