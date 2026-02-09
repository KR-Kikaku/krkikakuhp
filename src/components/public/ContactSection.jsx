import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center mb-12 font-semibold">お問い合わせ</h2>
        
        <form onSubmit={handleSubmit} className="bg-white rounded shadow-md p-8 space-y-6">
          <div>
            <label className="block mb-2 font-semibold">会社名</label>
            <Input
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block mb-2 font-semibold">お名前 <span className="text-red-500">*</span></label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block mb-2 font-semibold">メールアドレス <span className="text-red-500">*</span></label>
            <Input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block mb-2 font-semibold">電話番号</label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block mb-2 font-semibold">お問い合わせ内容 <span className="text-red-500">*</span></label>
            <Textarea
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 font-semibold"
          >
            {isSubmitting ? '送信中...' : '送信する'}
          </Button>
        </form>
      </div>
    </section>
  );
}