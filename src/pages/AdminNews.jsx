import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import ImageUploadField from '@/components/admin/ImageUploadField';
import EmptyState from '@/components/admin/EmptyState';
import { useAdminForm } from '@/components/admin/useAdminForm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Trash2, Pencil, Eye, EyeOff } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const INITIAL_FORM_STATE = {
  title: '',
  slug: '',
  content: '',
  cover_image: '',
  thumbnail_image: '',
  category: 'お知らせ',
  status: 'draft',
  publish_date: '',
};

export default function AdminNews() {
  const [newsList, setNewsList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { formData, updateField, setFormData } = useAdminForm(INITIAL_FORM_STATE);

  const fetchNews = async () => {
    const data = await base44.entities.News.list('-created_date');
    setNewsList(data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const openDialog = (news = null) => {
    setEditingNews(news || null);
    if (news) {
      setFormData({
        title: news.title || '',
        slug: news.slug || '',
        content: news.content || '',
        cover_image: news.cover_image || '',
        thumbnail_image: news.thumbnail_image || '',
        category: news.category || 'お知らせ',
        status: news.status || 'draft',
        publish_date: news.publish_date ? news.publish_date.slice(0, 16) : '',
      });
    } else {
      setFormData(INITIAL_FORM_STATE);
    }
    setIsDialogOpen(true);
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + Date.now();
  };

  const handleSave = async () => {
    if (!formData.title) {
      toast.error('タイトルを入力してください');
      return;
    }

    const slug = formData.slug || generateSlug(formData.title);
    const dataToSave = { ...formData, slug };

    if (editingNews) {
      await base44.entities.News.update(editingNews.id, dataToSave);
      toast.success('更新しました');
    } else {
      await base44.entities.News.create(dataToSave);
      toast.success('追加しました');
    }

    setIsDialogOpen(false);
    fetchNews();
  };

  const handleDelete = async (id) => {
    if (!confirm('この記事を削除しますか？')) return;
    await base44.entities.News.delete(id);
    toast.success('削除しました');
    fetchNews();
  };

  const toggleStatus = async (news) => {
    const newStatus = news.status === 'published' ? 'draft' : 'published';
    await base44.entities.News.update(news.id, { status: newStatus });
    toast.success(newStatus === 'published' ? '公開しました' : '下書きに変更しました');
    fetchNews();
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      updateField('cover_image', file_url);
    } finally {
      setIsUploading(false);
    }
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      updateField('thumbnail_image', file_url);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AdminLayout currentPage="news">
      <AdminPageHeader
        title="お知らせ管理"
        description="ニュース・お知らせの投稿"
        actionButton={
          <Button onClick={() => openDialog()} className="bg-gray-900 hover:bg-gray-800">
            <Plus className="w-4 h-4 mr-2" />
            記事を追加
          </Button>
        }
      />

      <div className="space-y-4">
        {newsList.map((news) => (
          <Card key={news.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {news.cover_image && (
                  <img
                    src={news.cover_image}
                    alt=""
                    className="w-24 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      news.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {news.status === 'published' ? '公開中' : '下書き'}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded">
                      {news.category}
                    </span>
                  </div>
                  <h3 className="font-medium">{news.title}</h3>
                  <div className="text-xs text-gray-400 mt-1">
                    {news.publish_date && format(new Date(news.publish_date), 'yyyy/MM/dd HH:mm', { locale: ja })}
                    {news.updated_date && (
                      <span className="ml-3">
                        更新: {format(new Date(news.updated_date), 'yyyy/MM/dd HH:mm', { locale: ja })}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleStatus(news)}
                    title={news.status === 'published' ? '下書きに戻す' : '公開する'}
                  >
                    {news.status === 'published' ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openDialog(news)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(news.id)} className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {newsList.length === 0 && (
          <EmptyState message="記事がありません。「記事を追加」ボタンから追加してください。" />
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingNews ? '記事を編集' : '記事を追加'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>タイトル *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Slug（自動生成可）</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => updateField('slug', e.target.value)}
                  className="mt-1"
                  placeholder="auto-generated"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>カテゴリー</Label>
                <Select value={formData.category} onValueChange={(value) => updateField('category', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="お知らせ">お知らせ</SelectItem>
                    <SelectItem value="イベント">イベント</SelectItem>
                    <SelectItem value="プレスリリース">プレスリリース</SelectItem>
                    <SelectItem value="その他">その他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>ステータス</Label>
                <Select value={formData.status} onValueChange={(value) => updateField('status', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">下書き</SelectItem>
                    <SelectItem value="published">公開</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>公開日時</Label>
                <Input
                  type="datetime-local"
                  value={formData.publish_date}
                  onChange={(e) => updateField('publish_date', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <ImageUploadField
              label="カバー画像"
              value={formData.cover_image}
              onChange={handleCoverUpload}
              isUploading={isUploading}
              recommendedSize="推奨サイズ: 1200px×600px（比率2:1）"
              inputId="coverImage"
            />

            <ImageUploadField
              label="サムネイル画像"
              value={formData.thumbnail_image}
              onChange={handleThumbnailUpload}
              isUploading={isUploading}
              recommendedSize="推奨サイズ: 400px×400px（正方形）"
              inputId="thumbnailImage"
            />

            <div>
              <Label>本文</Label>
              <div className="mt-2">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(value) => updateField('content', value)}
                  modules={QUILL_MODULES}
                  className="bg-white"
                  style={{ height: '300px', marginBottom: '50px' }}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={handleSave} className="bg-gray-900 hover:bg-gray-800">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}