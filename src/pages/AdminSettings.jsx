import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { useAdminForm } from '@/components/admin/useAdminForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import ReactQuill from 'react-quill';

export default function AdminSettings() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const [settingsId, setSettingsId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState({});
  const [activeTab, setActiveTab] = useState('logo');
  const { formData: settings, updateField: updateSettings, setFormData: setSettings } = useAdminForm(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    } else {
      setActiveTab('logo');
    }
  }, [location.search]);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await base44.entities.SiteSettings.list();
      if (data.length > 0) {
        setSettings(data[0]);
        setSettingsId(data[0].id);
      } else {
        const DEFAULT_PRIVACY_POLICY = `<div style="line-height: 2;">

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 3rem; margin-bottom: 1rem; color: #1f2937;">1. 個人情報の定義</h2>
<p style="margin-bottom: 1.5rem; color: #4b5563;">「個人情報」とは、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別することができるもの、及び他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものをいいます。</p>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 3rem; margin-bottom: 1rem; color: #1f2937;">2. 個人情報の収集</h2>
<p style="margin-bottom: 1.5rem; color: #4b5563;">当社は、お客様から個人情報を収集する場合、あらかじめその利用目的を明示し、適法かつ公正な手段によって収集いたします。</p>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 3rem; margin-bottom: 1rem; color: #1f2937;">3. 個人情報の利用目的</h2>
<p style="margin-bottom: 1rem; color: #4b5563;">当社は、お客様から収集した個人情報を以下の目的で利用いたします。</p>
<ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style: disc; color: #4b5563;">
<li style="margin-bottom: 0.5rem;">サービスの提供・運営</li>
<li style="margin-bottom: 0.5rem;">お客様からのお問い合わせへの対応</li>
<li style="margin-bottom: 0.5rem;">サービスに関するご案内やお知らせの配信</li>
<li style="margin-bottom: 0.5rem;">利用規約に違反した利用者への対応</li>
<li style="margin-bottom: 0.5rem;">その他、上記利用目的に付随する目的</li>
</ul>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 3rem; margin-bottom: 1rem; color: #1f2937;">4. 個人情報の第三者提供</h2>
<p style="margin-bottom: 1rem; color: #4b5563;">当社は、以下の場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。</p>
<ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style: disc; color: #4b5563;">
<li style="margin-bottom: 0.5rem;">法令に基づく場合</li>
<li style="margin-bottom: 0.5rem;">人の生命、身体または財産の保護のために必要がある場合</li>
<li style="margin-bottom: 0.5rem;">公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
<li style="margin-bottom: 0.5rem;">国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
</ul>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 3rem; margin-bottom: 1rem; color: #1f2937;">5. 個人情報の安全管理</h2>
<p style="margin-bottom: 1.5rem; color: #4b5563;">当社は、個人情報の漏えい、滅失またはき損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。</p>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 3rem; margin-bottom: 1rem; color: #1f2937;">6. 個人情報の開示・訂正・削除</h2>
<p style="margin-bottom: 1.5rem; color: #4b5563;">当社は、お客様ご本人から個人情報の開示、訂正、削除等のご請求があった場合、ご本人確認の上、合理的な期間内に対応いたします。</p>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 3rem; margin-bottom: 1rem; color: #1f2937;">7. お問い合わせ窓口</h2>
<p style="margin-bottom: 1.5rem; color: #4b5563;">個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。</p>
<p style="margin-bottom: 1.5rem; color: #4b5563;">合同会社 KR企画<br>
電話番号：00-0000-0000</p>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 3rem; margin-bottom: 1rem; color: #1f2937;">8. プライバシーポリシーの変更</h2>
<p style="margin-bottom: 1.5rem; color: #4b5563;">当社は、必要に応じて本プライバシーポリシーを変更することがあります。変更した場合には、当ウェブサイト上で通知いたします。</p>

<p style="margin-top: 3rem; text-align: right; color: #6b7280;">制定日：2025年12月23日<br>合同会社 KR企画</p>

</div>`;

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
          privacy_policy: DEFAULT_PRIVACY_POLICY
        });
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      const method = settingsId
        ? () => base44.entities.SiteSettings.update(settingsId, settings)
        : () => base44.entities.SiteSettings.create(settings).then(r => { setSettingsId(r.id); return r; });

      await method();
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
      toast.success('変更が完了しました');
    } catch (error) {
      toast.error('保存に失敗しました');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(prev => ({ ...prev, [field]: true }));
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      updateSettings(field, file_url);
      toast.success('画像をアップロードしました');
    } catch (error) {
      toast.error('アップロードに失敗しました');
    } finally {
      setIsUploading(prev => ({ ...prev, [field]: false }));
    }
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

  const getPageMeta = () => {
    const meta = {
      logo: { title: 'ロゴ設定', description: 'ヘッダーとフッターのロゴを管理' },
      greeting: { title: 'ご挨拶', description: 'トップページのご挨拶セクションを管理' },
      company: { title: '会社情報', description: '会社の基本情報を管理' },
    };
    return meta[activeTab] || meta.logo;
  };

  const pageMeta = getPageMeta();

  return (
    <AdminLayout currentPage={activeTab}>
      <AdminPageHeader
        title={pageMeta.title}
        description={pageMeta.description}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        {activeTab === 'company' && (
          <TabsList>
            <TabsTrigger value="company">会社情報</TabsTrigger>
          </TabsList>
        )}

        <TabsContent value="logo">
          <Card>
            <CardHeader>
              <CardTitle>ロゴ設定</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ImageUploadField
                label="ヘッダーロゴ"
                value={settings?.logo_url}
                onChange={(e) => handleImageUpload(e, 'logo_url')}
                isUploading={isUploading.logo_url}
                recommendedSize="推奨サイズ: 横 200-400px、縦 50-100px"
                inputId="logoUpload"
              />
              <ImageUploadField
                label="フッターロゴ"
                value={settings?.footer_logo_url}
                onChange={(e) => handleImageUpload(e, 'footer_logo_url')}
                isUploading={isUploading.footer_logo_url}
                recommendedSize="推奨サイズ: 横 200-400px、縦 50-100px"
                inputId="footerLogoUpload"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="greeting">
          <Card>
            <CardHeader>
              <CardTitle>ご挨拶</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>タイトル</Label>
                <Input
                  value={settings?.greeting_title || ''}
                  onChange={(e) => updateSettings('greeting_title', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>挨拶文</Label>
                <Textarea
                  value={settings?.greeting_text || ''}
                  onChange={(e) => updateSettings('greeting_text', e.target.value)}
                  className="mt-1 min-h-40"
                />
              </div>
              <ImageUploadField
                label="ご挨拶画像"
                value={settings?.greeting_image_url}
                onChange={(e) => handleImageUpload(e, 'greeting_image_url')}
                isUploading={isUploading.greeting_image_url}
                recommendedSize="推奨サイズ: 横 800-1200px、縦 600-800px"
                inputId="greetingImageUpload"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>会社情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ImageUploadField
                label="バナー画像"
                value={settings?.company_banner_url}
                onChange={(e) => handleImageUpload(e, 'company_banner_url')}
                isUploading={isUploading.company_banner_url}
                recommendedSize="推奨サイズ: 横 1280px、縦 320px"
                inputId="companyBannerUpload"
              />
              
              <div className="border-t pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>社長の言葉タイトル</Label>
                    <Input
                      value={settings?.ceo_title || ''}
                      onChange={(e) => updateSettings('ceo_title', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>代表者名</Label>
                    <Input
                      value={settings?.ceo_name || ''}
                      onChange={(e) => updateSettings('ceo_name', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label>社長の言葉本文</Label>
                  <Textarea
                    value={settings?.ceo_message || ''}
                    onChange={(e) => updateSettings('ceo_message', e.target.value)}
                    className="mt-1 min-h-32"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>会社名</Label>
                    <Input
                      value={settings?.company_name || ''}
                      onChange={(e) => updateSettings('company_name', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>代表</Label>
                    <Input
                      value={settings?.representative || ''}
                      onChange={(e) => updateSettings('representative', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>設立日</Label>
                    <Input
                      value={settings?.established_date || ''}
                      onChange={(e) => updateSettings('established_date', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>電話番号</Label>
                    <Input
                      value={settings?.phone || ''}
                      onChange={(e) => updateSettings('phone', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label>所在地</Label>
                  <Input
                    value={settings?.address || ''}
                    onChange={(e) => updateSettings('address', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>


      </Tabs>
    </AdminLayout>
  );
}