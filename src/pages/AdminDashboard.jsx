import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Images, Briefcase, Newspaper, MessageSquare, Eye } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    carousel: 0,
    business: 0,
    news: 0,
    contacts: 0,
    unreadContacts: 0,
    visitors: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [carousel, business, news, contacts, visitors] = await Promise.all([
        base44.entities.CarouselImage.list(),
        base44.entities.Business.list(),
        base44.entities.News.list(),
        base44.entities.Contact.list(),
        base44.entities.Visitor.list()
      ]);

      const today = new Date().toISOString().split('T')[0];
      const todayVisitors = visitors.filter(v => v.visit_date === today).length;

      setStats({
        carousel: carousel.length,
        business: business.length,
        news: news.length,
        contacts: contacts.length,
        unreadContacts: contacts.filter(c => c.status === '未対応').length,
        visitors: todayVisitors
      });
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: '本日の訪問者数', value: stats.visitors, icon: Eye, color: 'bg-indigo-500' },
    { title: 'TOP画像', value: stats.carousel, icon: Images, color: 'bg-blue-500' },
    { title: '事業内容', value: stats.business, icon: Briefcase, color: 'bg-green-500' },
    { title: 'お知らせ', value: stats.news, icon: Newspaper, color: 'bg-purple-500' },
    { title: 'お問い合わせ', value: stats.contacts, subtitle: `${stats.unreadContacts}件未対応`, icon: MessageSquare, color: 'bg-orange-500' },
  ];

  return (
    <AdminLayout currentPage="dashboard">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">ダッシュボード</h1>
        <p className="text-gray-500 mt-1">サイト管理の概要</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              {stat.subtitle && (
                <p className="text-xs text-orange-500 mt-1">{stat.subtitle}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}