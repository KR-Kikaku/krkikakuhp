import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Trash2, Pencil, Upload, X } from 'lucide-react';

export default function AdminBusiness() {
  const [businesses, setBusinesses] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    title_link: '',
    description: '',
    images: [],
    order: 0,
    is_active: true
  });
  const [isUploading, setIsUploading] = useState(false);
  const [bannerUrl, setBannerUrl] = useState('');
  const [settingsId, setSettingsId] = useState(null);
  const [isSavingBanner, setIsSavingBanner] = useState(false);

  const fetchBusinesses = async () => {
    const data = await base44.entities.Business.list('order');
    setBusinesses(data);
  };

  const fetchSettings = async () => {
    const settings = await base44.entities.SiteSettings.list();
    if (settings.length > 0) {
      setBannerUrl(settings[0].work_banner_url || '');
      setSettingsId(settings[0].id);
    }
  };

  useEffect(() => {
    fetchBusinesses();
    fetchSettings();
  }, []);

  const openDialog = (business = null) => {
    if (business) {
      setEditingBusiness(business);
      setFormData({
        title: business.title || '',
        title_link: business.title_link || '',
        description: business.description || '',
        images: business.images || [],
        order: business.order || 0,
        is_active: business.is_active !== false
      });
    } else {
      setEditingBusiness(null);
      setFormData({
        title: '',
        title_link: '',
        description: '',
        images: [],
        order: businesses.length,
        is_active: true
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title) {
      toast.error('タイトルを入力してください');
      return;
    }

    if (editingBusiness) {
      await base44.entities.Business.update(editingBusiness.id, formData);
      toast.success('更新しました');
    } else {
      await base44.entities.Business.create(formData);
      toast.success('追加しました');
    }

    setIsDialogOpen(false);
    fetchBusinesses();
  };

  const handleDelete = async (id) => {
    if (!confirm('この事業を削除しますか？')) return;
    await base44.entities.Business.delete(id);
    toast.success('削除しました');
    fetchBusinesses();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (formData.images.length >= 3) {
      toast.error('画像は最大3枚までです');
      return;
    }

    setIsUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, { url: file_url, link: '' }]
    }));
    setIsUploading(false);
  };

  const updateImageLink = (index, link) => {
    const newImages = [...formData.images];
    newImages[index].link = link;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsSavingBanner(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setBannerUrl(file_url);
      
      if (settingsId) {
        await base44.entities.SiteSettings.update(settingsId, { work_banner_url: file_url });
      } else {
        const newSettings = await base44.entities.SiteSettings.create({ work_banner_url: file_url });
        setSettingsId(newSettings.id);
      }
      
      toast.success('バナー画像を更新しました');
    } catch (error) {
      toast.error('アップロードに失敗しました');
    }
    setIsSavingBanner(false);
  };

  return (
    <AdminLayout currentPage="business">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">私たちの仕事管理</h1>
          <p className="text-gray-500 mt-1">事業・サービスの紹介</p>
        </div>
        <Button onClick={() => openDialog()} className="bg-gray-900 hover:bg-gray-800">
          <Plus className="w-4 h-4 mr-2" />
          事業を追加
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">バナー画像</h3>
          <p className="text-sm text-gray-500 mb-4">推奨サイズ: 横 1920px、縦 400-600px</p>
          
          {bannerUrl && (
            <div className="mb-4">
              <img src={bannerUrl} alt="バナー" className="w-full h-40 object-cover rounded-lg" />
            </div>
          )}
          
          <input
            type="file"
            id="bannerUpload"
            accept="image/*"
            onChange={handleBannerUpload}
            className="hidden"
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById('bannerUpload').click()}
            disabled={isSavingBanner}
          >
            {isSavingBanner ? 'アップロード中...' : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                バナー画像を{bannerUrl ? '変更' : 'アップロード'}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {businesses.map((business, index) => (
          <Card key={business.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-light text-gray-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium">{business.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {business.description}
                    </p>
                    {business.images && business.images.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {business.images.map((img, i) => (
                          <img
                            key={i}
                            src={img.url}
                            alt=""
                            className="w-16 h-12 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${business.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                    {business.is_active ? '表示中' : '非表示'}
                  </span>
                  <Button variant="ghost" size="icon" onClick={() => openDialog(business)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(business.id)} className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {businesses.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              事業がありません。「事業を追加」ボタンから追加してください。
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingBusiness ? '事業を編集' : '事業を追加'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label>タイトル *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1"
                placeholder="マッチングサービス「スキピ」"
              />
            </div>

            <div>
              <Label>タイトルリンク（任意）</Label>
              <Input
                value={formData.title_link}
                onChange={(e) => setFormData({ ...formData, title_link: e.target.value })}
                className="mt-1"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <Label>説明文</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 min-h-24"
              />
            </div>

            <div>
              <Label>画像（最大3枚）</Label>
              <p className="text-xs text-gray-500 mt-1">推奨サイズ: 横 800-1200px、縦 600-800px</p>
              <div className="space-y-3 mt-2">
                {formData.images.map((img, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <img src={img.url} alt="" className="w-20 h-14 object-cover rounded" />
                    <div className="flex-1">
                      <Input
                        value={img.link || ''}
                        onChange={(e) => updateImageLink(index, e.target.value)}
                        placeholder="リンクURL（任意）"
                        className="text-sm"
                      />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeImage(index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                
                {formData.images.length < 3 && (
                  <div>
                    <input
                      type="file"
                      id="businessImage"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('businessImage').click()}
                      disabled={isUploading}
                      className="w-full"
                    >
                      {isUploading ? 'アップロード中...' : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          画像を追加
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label>サイトに表示する</Label>
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