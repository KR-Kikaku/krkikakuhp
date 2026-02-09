import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function NewsSection() {
  const { data: news } = useQuery({
    queryKey: ['latestNews'],
    queryFn: () => base44.entities.News.filter({ status: 'published' }, '-publish_date', 6),
    initialData: []
  });

  return (
    <section id="お知らせ" className="px-4 md:px-8 py-16 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h2>お知らせ</h2>
        <Link 
          to={createPageUrl('NewsList')} 
          className="text-blue-600 hover:text-blue-700 transition-colors"
        >
          すべて見る →
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <Link 
            key={item.id}
            to={createPageUrl(`NewsDetail?slug=${item.slug}`)}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img 
              src={item.thumbnail_image || item.cover_image} 
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {item.category}
                </span>
                <span>
                  {format(new Date(item.publish_date), 'yyyy年M月d日', { locale: ja })}
                </span>
              </div>
              <h3 className="line-clamp-2">{item.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}