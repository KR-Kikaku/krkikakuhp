import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Upload, Save, Loader2 } from 'lucide-react';
import ReactQuill from 'react-quill';

export default function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [settingsId, setSettingsId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await base44.entities.SiteSettings.list();
      if (data.length > 0) {
        setSettings(data[0]);
        setSettingsId(data[0].id);
      } else {
        setSettings({
          logo_url: '',
          greeting_title: 'あなたの日常を明るく、楽しいものへ',
          greeting_text: '',
          greeting_image_url: '',
          work_banner_url: '',
          company_banner_url: '',
          ceo_title: '「何事も挑戦」',
          ceo_message: '',
          ceo_name: '代表社員 兼 CEO　田中 恭平',
          company_name: '合同会社 KR企画',
          representative: '田中 恭平',
          established_date: '2025年12月23日',
          address: '〒333-3333 岡山県岡山市XXXXXXXXXXXXXXX',
          phone: '00-0000-0000',
          privacy_policy: ''
        });
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    
    if (settingsId) {
      await base44.entities.SiteSettings.update(settingsId, settings);
    } else {
      const newSettings = await base44.entities.SiteSettings.create(settings);
      setSettingsId(newSettings.id);
    }

    toast.success('設定を保存しました');
    setIsSaving(false);
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading({ ...isUploading, [field]: true });
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setSettings({ ...settings, [field]: file_url });
    setIsUploading({ ...isUploading, [field]: false });
  };

  if (!settings) {
    return (
      <AdminLayout currentPage="settings">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="settings">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-light text-gray-800">サイト設定</h1>
          <p className="text-gray-500 mt-1">サイト全体の設定</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-gray-900 hover:bg-gray-800">
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              保存中...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              設定を保存
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList>
          <TabsTrigger value="basic">基本設定</TabsTrigger>
          <TabsTrigger value="greeting">ご挨拶</TabsTrigger>
          <TabsTrigger value="banners">バナー画像</TabsTrigger>
          <TabsTrigger value="company">会社情報</TabsTrigger>
          <TabsTrigger value="privacy">プライバシーポリシー</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>基本設定</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>会社ロゴ（ヘッダー用）</Label>
                <div className="mt-2 flex items-center gap-4">
                  {settings.logo_url && (
                    <img src={settings.logo_url} alt="Logo" className="h-12 object-contain" />
                  )}
                  <div>
                    <input
                      type="file"
                      id="logoUpload"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'logo_url')}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('logoUpload').click()}
                      disabled={isUploading.logo_url}
                    >
                      {isUploading.logo_url ? 'アップロード中...' : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          ロゴを変更
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <Label>会社ロゴ（フッター用）</Label>
                <div className="mt-2 flex items-center gap-4">
                  {settings.footer_logo_url && (
                    <img src={settings.footer_logo_url} alt="Footer Logo" className="h-12 object-contain" />
                  )}
                  <div>
                    <input
                      type="file"
                      id="footerLogoUpload"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'footer_logo_url')}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('footerLogoUpload').click()}
                      disabled={isUploading.footer_logo_url}
                    >
                      {isUploading.footer_logo_url ? 'アップロード中...' : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          ロゴを変更
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="greeting">
          <Card>
            <CardHeader>
              <CardTitle>ご挨拶セクション</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>タイトル</Label>
                <Input
                  value={settings.greeting_title || ''}
                  onChange={(e) => setSettings({ ...settings, greeting_title: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>挨拶文</Label>
                <Textarea
                  value={settings.greeting_text || ''}
                  onChange={(e) => setSettings({ ...settings, greeting_text: e.target.value })}
                  className="mt-1 min-h-40"
                />
              </div>
              <div>
                <Label>ご挨拶画像</Label>
                <div className="mt-2 flex items-center gap-4">
                  {settings.greeting_image_url && (
                    <img src={settings.greeting_image_url} alt="" className="w-32 h-20 object-cover rounded" />
                  )}
                  <div>
                    <input
                      type="file"
                      id="greetingImageUpload"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'greeting_image_url')}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('greetingImageUpload').click()}
                      disabled={isUploading.greeting_image_url}
                    >
                      {isUploading.greeting_image_url ? 'アップロード中...' : '画像を変更'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banners">
          <Card>
            <CardHeader>
              <CardTitle>バナー画像</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>「私たちの仕事」バナー</Label>
                <div className="mt-2 flex items-center gap-4">
                  {settings.work_banner_url && (
                    <img src={settings.work_banner_url} alt="" className="w-48 h-16 object-cover rounded" />
                  )}
                  <div>
                    <input
                      type="file"
                      id="workBannerUpload"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'work_banner_url')}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('workBannerUpload').click()}
                      disabled={isUploading.work_banner_url}
                    >
                      {isUploading.work_banner_url ? 'アップロード中...' : '画像を変更'}
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Label>「会社情報」バナー</Label>
                <div className="mt-2 flex items-center gap-4">
                  {settings.company_banner_url && (
                    <img src={settings.company_banner_url} alt="" className="w-48 h-16 object-cover rounded" />
                  )}
                  <div>
                    <input
                      type="file"
                      id="companyBannerUpload"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'company_banner_url')}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('companyBannerUpload').click()}
                      disabled={isUploading.company_banner_url}
                    >
                      {isUploading.company_banner_url ? 'アップロード中...' : '画像を変更'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>会社情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>社長の言葉タイトル</Label>
                  <Input
                    value={settings.ceo_title || ''}
                    onChange={(e) => setSettings({ ...settings, ceo_title: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>代表者名</Label>
                  <Input
                    value={settings.ceo_name || ''}
                    onChange={(e) => setSettings({ ...settings, ceo_name: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label>社長の言葉本文</Label>
                <Textarea
                  value={settings.ceo_message || ''}
                  onChange={(e) => setSettings({ ...settings, ceo_message: e.target.value })}
                  className="mt-1 min-h-32"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>会社名</Label>
                  <Input
                    value={settings.company_name || ''}
                    onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>代表</Label>
                  <Input
                    value={settings.representative || ''}
                    onChange={(e) => setSettings({ ...settings, representative: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>設立日</Label>
                  <Input
                    value={settings.established_date || ''}
                    onChange={(e) => setSettings({ ...settings, established_date: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>電話番号</Label>
                  <Input
                    value={settings.phone || ''}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label>所在地</Label>
                <Input
                  value={settings.address || ''}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>プライバシーポリシー</CardTitle>
            </CardHeader>
            <CardContent>
              <ReactQuill
                theme="snow"
                value={settings.privacy_policy || ''}
                onChange={(value) => setSettings({ ...settings, privacy_policy: value })}
                className="bg-white"
                style={{ height: '400px', marginBottom: '50px' }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}