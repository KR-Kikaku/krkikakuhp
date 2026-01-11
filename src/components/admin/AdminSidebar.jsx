import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  LayoutDashboard, 
  Images, 
  Briefcase, 
  Newspaper, 
  MessageSquare, 
  Settings, 
  Users,
  LogOut,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminSidebar({ currentPage }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('adminSession');
    navigate(createPageUrl('AdminLogin'));
  };

  const menuItems = [
    { id: 'dashboard', label: 'ダッシュボード', icon: LayoutDashboard, page: 'AdminDashboard' },
    { id: 'carousel', label: 'TOP画像', icon: Images, page: 'AdminCarousel' },
    { id: 'business', label: '事業内容', icon: Briefcase, page: 'AdminBusiness' },
    { id: 'news', label: 'お知らせ', icon: Newspaper, page: 'AdminNews' },
    { id: 'contacts', label: 'お問い合わせ', icon: MessageSquare, page: 'AdminContacts' },
    { id: 'settings', label: 'サイト設定', icon: Settings, page: 'AdminSettings' },
    { id: 'admins', label: '管理者', icon: Users, page: 'AdminUsers' },
  ];

  return (
    <div className="w-64 bg-gray-900 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800 flex justify-center">
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696397724eafe2f0916bfdff/b2e3098a5_S__649773062.jpg" 
          alt="KR企画 管理" 
          className="h-12 object-contain"
        />
      </div>

      <nav className="flex-1 py-6">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={createPageUrl(item.page)}
            className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
              currentPage === item.id
                ? 'bg-gray-800 text-white border-r-2 border-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800 space-y-2">
        <Link
          to={createPageUrl('Home')}
          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <Home size={18} />
          サイトを見る
        </Link>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <LogOut size={18} />
          ログアウト
        </Button>
      </div>
    </div>
  );
}