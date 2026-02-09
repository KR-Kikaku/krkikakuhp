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
      className="py-12 md:py-20 bg-gray-50 -mx-4 md:mx-0 px-4 md:px-0 notranslate"
      translate="no"
      lang="ja"
    >
      <div className="max-w-2xl mx-auto md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          お問い合わせ
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-lg">
          <div>
            <Label htmlFor="company_name">会社名</Label>
            <Input
              id="company_name"
              name="company_name"
              type="text"
              value={formData.company_name}
              onChange={handleChange}
              placeholder="例：株式会社XXX"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="name">
              お名前 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="山田 太郎"
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">
              メールアドレス <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.com"
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">電話番号</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="090-XXXX-XXXX"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="message">
              お問い合わせ内容 <span className="text-red-500">*</span>
            </Label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="お問い合わせ内容をご入力ください"
              rows={6}
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-900 hover:bg-gray-800"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                送信中...
              </>
            ) : (
              '送信'
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}