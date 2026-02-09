import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    company_name: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('必須項目を入力してください');
      return;
    }

    setIsSubmitting(true);
    try {
      await base44.entities.Contact.create(formData);
      toast.success('お問い合わせを送信しました');
      setFormData({
        company_name: '',
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      toast.error('送信に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 md:px-8 notranslate" translate="no" lang="ja">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          お問い合わせ
        </h2>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="company_name">会社名</Label>
              <Input
                id="company_name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="株式会社〇〇"
              />
            </div>

            <div>
              <Label htmlFor="name">お名前 <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="山田 太郎"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">メールアドレス <span className="text-red-500">*</span></Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
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
                placeholder="03-1234-5678"
              />
            </div>

            <div>
              <Label htmlFor="message">お問い合わせ内容 <span className="text-red-500">*</span></Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="お問い合わせ内容をご記入ください"
                className="h-32"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? '送信中...' : '送信する'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}