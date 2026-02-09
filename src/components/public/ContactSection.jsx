import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    company_name: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.name || !formData.email || !formData.message) {
        toast.error('必須項目をすべて入力してください');
        setIsLoading(false);
        return;
      }

      await base44.entities.Contact.create(formData);
      toast.success('お問い合わせを送信しました。ありがとうございます。');
      
      setFormData({
        company_name: '',
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      toast.error('送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gray-50 notranslate"
      translate="no"
      lang="ja"
    >
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
          お問い合わせ
        </h2>

        <p className="text-center text-sm md:text-base text-gray-600 mb-12">
          弊社へのお問い合わせはこちらよりお願い致します。<br />
          ２営業日以内にご返信させて頂きます。
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 md:p-10 rounded-lg border border-gray-200">
          <div>
            <Label htmlFor="company_name" className="text-sm font-medium">
              会社名
            </Label>
            <Input
              id="company_name"
              name="company_name"
              type="text"
              value={formData.company_name}
              onChange={handleChange}
              className="mt-2 text-sm"
            />
          </div>

          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              お名前 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 text-sm"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              メールアドレス <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 text-sm"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium">
              電話番号
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="mt-2 text-sm"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-medium">
              お問い合わせ内容 <span className="text-red-500">*</span>
            </Label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="mt-2 w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          <div className="text-xs text-gray-500">
            入力確認画面や自動返信メールはございません。<br />
            ご入力内容を確認の上、送信ボタンを押して下さい。
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold"
          >
            {isLoading ? (
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