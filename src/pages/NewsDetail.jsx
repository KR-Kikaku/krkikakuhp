import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default function NewsDetail() {
  const [news, setNews] = useState(null);
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  useEffect(() => {
    const fetchNews = async () => {
      const data = await base44.entities.News.filter({ slug: slug, status: 'published' });
      if (data.length > 0) setNews(data[0]);
    };
    if (slug) fetchNews();
  }, [slug]);

  const handleNavigate = (id) => {
    navigate(createPageUrl('Home') + `#${id}`);
  };

  if (!news) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={handleNavigate} />
      <main className="pt-8 pb-20">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            to={createPageUrl('NewsList')}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-8"
          >
            <ArrowLeft size={16} />
            一覧に戻る
          </Link>

          {news.cover_image && (
            <img
              src={news.cover_image}
              alt={news.title}
              className="w-full h-64 md:h-80 object-cover rounded-lg mb-8"
            />
          )}

          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm px-3 py-1 bg-gray-100 rounded text-gray-600">
              {news.category}
            </span>
            <span className="text-sm text-gray-400">
              {news.publish_date && format(new Date(news.publish_date), 'yyyy年MM月dd日', { locale: ja })}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-medium text-gray-800 mb-8">
            {news.title}
          </h1>

          <div 
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          {news.updated_date && (
            <p className="mt-12 text-sm text-gray-400 text-right">
              最終更新: {format(new Date(news.updated_date), 'yyyy年MM月dd日', { locale: ja })}
            </p>
          )}
        </div>
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}