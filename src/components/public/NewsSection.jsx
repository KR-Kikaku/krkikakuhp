import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function NewsSection() {
  const { data: news } = useQuery({
    queryKey: ['latestNews'],
    queryFn: () => base44.entities.News.filter({ status: 'published' }, '-publish_date', 3),
    initialData: []
  });

  if (news.length === 0) return null;

  return (
    <section id="news" className="py-16 md:py-24 px-4 md:px-8 notranslate" translate="no" lang="ja">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            ニュース
          </h2>
          <Link 
            to={createPageUrl('NewsList')}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2 text-sm font-medium"
          >
            すべて見る
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item) => (
            <Link
              key={item.id}
              to={createPageUrl('NewsDetail') + `?slug=${item.slug}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {item.thumbnail_image && (
                <img 
                  src={item.thumbnail_image} 
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {item.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {format(new Date(item.publish_date), 'yyyy.MM.dd', { locale: ja })}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}