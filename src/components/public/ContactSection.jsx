import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Loader2, CheckCircle } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    company_name: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('必須項目を入力してください');
      return;
    }

    if (!agreedToPrivacy) {
      toast.error('プライバシーポリシーに同意してください');
      return;
    }

    setIsSubmitting(true);
    
    await base44.entities.Contact.create({
      ...formData,
      status: '未対応'
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('お問い合わせを送信しました');
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 md:py-32 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-6" />
          <h2 className="text-2xl font-light mb-4">送信完了</h2>
          <p className="text-gray-600">
            お問い合わせいただきありがとうございます。<br />
            担当者より折り返しご連絡いたします。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-3 tracking-wide text-gray-800">
          お問い合わせ
        </h2>
        <p className="text-xs text-gray-600 text-center mb-12" style={{ lineHeight: '1.8' }}>
          弊社へのお問い合わせはこちらよりお願い致します。<br />
          ２営業日以内にご返信させて頂きます。
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
          <div>
            <Label htmlFor="company_name" className="text-gray-700">会社名</Label>
            <Input
              id="company_name"
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              className="mt-2"
              placeholder="株式会社〇〇"
            />
          </div>

          <div>
            <Label htmlFor="name" className="text-gray-700">
              お名前 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-2"
              placeholder="山田 太郎"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-700">
              メールアドレス <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-2"
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-gray-700">電話番号</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-2"
              placeholder="000-0000-0000"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-gray-700">
              お問い合わせ内容 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="mt-2 min-h-32"
              placeholder="お問い合わせ内容をご記入ください"
              required
            />
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="privacy"
              checked={agreedToPrivacy}
              onCheckedChange={setAgreedToPrivacy}
              className="mt-1"
            />
            <Label htmlFor="privacy" className="text-sm text-gray-700 cursor-pointer">
              プライバシーポリシーに同意する <span className="text-red-500">*</span>
            </Label>
          </div>

          <div className="text-xs text-gray-500 text-center pt-2 tracking-wide" style={{ lineHeight: '1.8' }}>
            入力確認画面や自動返信メールはございません。<br />
            ご入力内容を確認の上、送信ボタンを押して下さい。
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !agreedToPrivacy}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                送信中...
              </>
            ) : (
              '送信する'
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}