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
  Home,
  Menu,
  X,
  HandHeart,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminSidebar({ currentPage, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('adminSession');
    navigate(createPageUrl('AdminLogin'));
  };

  const menuItems = [
    { id: 'dashboard', label: 'ダッシュボード', icon: LayoutDashboard, page: 'AdminDashboard' },
    { id: 'carousel', label: 'TOP画像', icon: Images, page: 'AdminCarousel' },
    { id: 'greeting', label: 'ご挨拶', icon: HandHeart, page: 'AdminSettings', tab: 'greeting' },
    { id: 'business', label: '私たちの仕事', icon: Briefcase, page: 'AdminBusiness' },
    { id: 'news', label: 'お知らせ', icon: Newspaper, page: 'AdminNews' },
    { id: 'contacts', label: 'お問い合わせ', icon: MessageSquare, page: 'AdminContacts' },
    { id: 'settings', label: '会社情報', icon: Settings, page: 'AdminSettings' },
    { id: 'privacy', label: 'プライバシーポリシー', icon: FileText, page: 'AdminSettings', tab: 'privacy' },
    { id: 'admins', label: '管理者', icon: Users, page: 'AdminUsers' },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 z-50 flex items-center justify-between p-4">
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696397724eafe2f0916bfdff/b2e3098a5_S__649773062.jpg" 
          alt="KR企画 管理" 
          className="h-8 object-contain"
        />
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white p-2"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed md:fixed top-0 left-0 h-full w-64 bg-gray-900 z-40
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
        flex flex-col
        pt-16 md:pt-0
      `}>
        <div className="hidden md:block p-6 border-b border-gray-800">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696397724eafe2f0916bfdff/b2e3098a5_S__649773062.jpg" 
            alt="KR企画 管理" 
            className="h-12 object-contain mx-auto"
          />
        </div>

        <nav className="flex-1 py-6 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.tab ? `${createPageUrl(item.page)}?tab=${item.tab}` : createPageUrl(item.page)}
              onClick={() => setIsMobileMenuOpen(false)}
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
            onClick={() => setIsMobileMenuOpen(false)}
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

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}