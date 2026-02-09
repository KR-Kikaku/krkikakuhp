import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function NewsSection() {
  const navigate = useNavigate();
  const { data: news } = useQuery({
    queryKey: ['news'],
    queryFn: () => base44.entities.News.filter({ status: 'published' }, '-publish_date', 3),
    initialData: []
  });

  if (!news.length) return null;

  return (
    <section id="news" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-12 font-semibold">ニュース</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {news.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(createPageUrl('NewsDetail') + `?slug=${item.slug}`)}
              className="bg-white rounded shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
            >
              {item.thumbnail_image && (
                <img src={item.thumbnail_image} alt="" className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <div className="text-sm text-gray-500 mb-2">{item.category}</div>
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <div className="text-sm text-gray-500">
                  {new Date(item.publish_date).toLocaleDateString('ja-JP')}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button
            onClick={() => navigate(createPageUrl('NewsList'))}
            className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition font-semibold"
          >
            ニュース一覧へ
          </button>
        </div>
      </div>
    </section>
  );
}