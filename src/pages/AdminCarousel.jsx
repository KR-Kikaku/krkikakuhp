import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import EmptyState from '@/components/admin/EmptyState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Plus, Trash2, Upload, GripVertical } from 'lucide-react';

export default function AdminCarousel() {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const fetchImages = async () => {
    const data = await base44.entities.CarouselImage.list('order');
    setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (images.length >= 5) {
      toast.error('画像は最大5枚までです');
      return;
    }

    setIsUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });

      await base44.entities.CarouselImage.create({
        image_url: file_url,
        link_url: '',
        order: images.length,
        is_active: true,
      });

      toast.success('画像を追加しました');
      fetchImages();
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdate = async (id, field, value) => {
    await base44.entities.CarouselImage.update(id, { [field]: value });
    fetchImages();
  };

  const handleDelete = async (id) => {
    if (!confirm('この画像を削除しますか？')) return;
    await base44.entities.CarouselImage.delete(id);
    toast.success('画像を削除しました');
    fetchImages();
  };

  return (
    <AdminLayout currentPage="carousel">
      <AdminPageHeader
        title="TOP画像管理"
        description="カルーセル画像（最大5枚・推奨サイズ: 横 1280px、縦 500px）"
        actionButton={
          <div>
            <input
              type="file"
              id="upload"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              onClick={() => document.getElementById('upload').click()}
              disabled={isUploading || images.length >= 5}
              className="bg-gray-900 hover:bg-gray-800"
            >
              {isUploading ? (
                'アップロード中...'
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  画像を追加
                </>
              )}
            </Button>
          </div>
        }
      />

      <div className="space-y-4">
        {images.map((image, index) => (
          <Card key={image.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <GripVertical className="text-gray-300 cursor-move" />
                <img
                  src={image.image_url}
                  alt={`Slide ${index + 1}`}
                  className="w-32 h-20 object-cover rounded"
                />
                <div className="flex-1 space-y-2">
                  <div>
                    <Label className="text-xs text-gray-500">リンクURL（任意）</Label>
                    <Input
                      value={image.link_url || ''}
                      onChange={(e) => handleUpdate(image.id, 'link_url', e.target.value)}
                      placeholder="https://example.com"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={image.is_active}
                      onCheckedChange={(checked) => handleUpdate(image.id, 'is_active', checked)}
                    />
                    <span className="text-sm text-gray-500">
                      {image.is_active ? '表示' : '非表示'}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(image.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {images.length === 0 && (
          <EmptyState message="画像がありません。「画像を追加」ボタンから追加してください。" />
        )}
      </div>
    </AdminLayout>
  );
}