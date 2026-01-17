import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Mail, Eye, Trash2, Send, CheckCircle, X } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [emailGreeting, setEmailGreeting] = useState('お問い合わせありがとうございます。');
  const [emailSignature, setEmailSignature] = useState('---\n合同会社 KR企画');

  const fetchContacts = async () => {
    const data = await base44.entities.Contact.list('-created_date');
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const openDialog = async (contact) => {
    setSelectedContact(contact);
    setReplyText('');
    setIsDialogOpen(true);
    
    // Mark as read
    if (!contact.is_read) {
      await base44.entities.Contact.update(contact.id, { is_read: true });
      fetchContacts();
    }
  };

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      toast.error('返信内容を入力してください');
      return;
    }

    setIsSending(true);

    try {
      const newReply = {
        from: 'support@kr-kikaku.co.jp',
        message: replyText,
        timestamp: new Date().toISOString()
      };

      const updatedReplies = [...(selectedContact.replies || []), newReply];

      // Send email to customer
      await base44.integrations.Core.SendEmail({
        from_name: '合同会社 KR企画',
        to: selectedContact.email,
        subject: `Re: お問い合わせへの返信`,
        body: `${selectedContact.name}様\n\n${emailGreeting}\n\n${replyText}\n\n${emailSignature}`
      });

      // Update contact record
      await base44.entities.Contact.update(selectedContact.id, {
        replies: updatedReplies,
        needs_reply: false
      });

      toast.success('返信メールを送信しました');
      setReplyText('');
      
      const updated = { ...selectedContact, replies: updatedReplies, needs_reply: false };
      setSelectedContact(updated);
      fetchContacts();
    } catch (error) {
      console.error('送信エラー:', error);
      toast.error('メール送信に失敗しました');
    } finally {
      setIsSending(false);
    }
  };

  const handleNoReplyNeeded = async () => {
    await base44.entities.Contact.update(selectedContact.id, {
      needs_reply: false
    });
    toast.success('返信不要としてマークしました');
    const updated = { ...selectedContact, needs_reply: false };
    setSelectedContact(updated);
    fetchContacts();
  };

  const handleDelete = async (id) => {
    if (!confirm('このお問い合わせを削除しますか？')) return;
    await base44.entities.Contact.delete(id);
    toast.success('削除しました');
    fetchContacts();
  };

  const unreadCount = contacts.filter(c => !c.is_read).length;
  const needsReplyCount = contacts.filter(c => c.needs_reply && c.is_read).length;

  return (
    <AdminLayout currentPage="contacts">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">お問い合わせ管理</h1>
            <p className="text-gray-500 mt-1">
              受信: {contacts.length}件 | 未読: {unreadCount}件 | 未返信: {needsReplyCount}件
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {contacts.map((contact) => {
          const isUnread = !contact.is_read;
          const needsReply = contact.needs_reply && contact.is_read;
          const replyCount = (contact.replies || []).length;

          return (
            <Card key={contact.id} className={isUnread ? 'border-2 border-blue-500' : ''}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {isUnread && (
                        <Badge className="bg-blue-500">未読</Badge>
                      )}
                      {needsReply && (
                        <Badge variant="outline" className="border-orange-500 text-orange-700">未返信</Badge>
                      )}
                      {!contact.needs_reply && replyCount > 1 && (
                        <Badge variant="outline" className="border-green-500 text-green-700">対応完了</Badge>
                      )}
                      <span className="text-xs text-gray-400">
                        {format(new Date(contact.created_date), 'yyyy/MM/dd HH:mm', { locale: ja })}
                      </span>
                      {replyCount > 1 && (
                        <span className="text-xs text-gray-500">
                          ({replyCount - 1}件の返信)
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div>
                        <span className="text-gray-400">会社名:</span>
                        <span className="ml-2">{contact.company_name || '-'}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">お名前:</span>
                        <span className="ml-2 font-medium">{contact.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">メール:</span>
                        <span className="ml-2">{contact.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">電話:</span>
                        <span className="ml-2">{contact.phone || '-'}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {contact.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="ghost" size="icon" onClick={() => openDialog(contact)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(contact.id)} className="text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {contacts.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              お問い合わせがありません
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>お問い合わせ詳細</DialogTitle>
          </DialogHeader>

          {selectedContact && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-gray-400">会社名</Label>
                  <p className="mt-1">{selectedContact.company_name || '-'}</p>
                </div>
                <div>
                  <Label className="text-gray-400">お名前</Label>
                  <p className="mt-1 font-medium">{selectedContact.name}</p>
                </div>
                <div>
                  <Label className="text-gray-400">メールアドレス</Label>
                  <p className="mt-1">{selectedContact.email}</p>
                </div>
                <div>
                  <Label className="text-gray-400">電話番号</Label>
                  <p className="mt-1">{selectedContact.phone || '-'}</p>
                </div>
              </div>

              {/* Thread Display */}
              <div>
                <Label className="text-gray-400">やり取り履歴</Label>
                <div className="mt-2 space-y-3">
                  {(selectedContact.replies || []).map((reply, index) => {
                    const isFromCustomer = reply.from === selectedContact.email;
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg ${
                          isFromCustomer ? 'bg-gray-50 border-l-4 border-gray-400' : 'bg-blue-50 border-l-4 border-blue-500'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium">
                            {isFromCustomer ? `${selectedContact.name}様` : 'KR企画'}
                          </span>
                          <span className="text-xs text-gray-400">
                            {format(new Date(reply.timestamp), 'yyyy/MM/dd HH:mm', { locale: ja })}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{reply.message}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Email Template Settings */}
              {selectedContact.needs_reply && (
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="text-xs text-gray-500">挨拶文</Label>
                    <Input
                      value={emailGreeting}
                      onChange={(e) => setEmailGreeting(e.target.value)}
                      className="mt-1 text-sm"
                      placeholder="お問い合わせありがとうございます。"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">署名</Label>
                    <Textarea
                      value={emailSignature}
                      onChange={(e) => setEmailSignature(e.target.value)}
                      className="mt-1 text-sm min-h-16"
                      placeholder="---&#10;合同会社 KR企画"
                    />
                  </div>
                </div>
              )}

              {/* Reply Form */}
              {selectedContact.needs_reply && (
                <div>
                  <Label className="text-gray-400">返信内容</Label>
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="mt-2 min-h-32"
                    placeholder="返信内容を入力..."
                  />
                </div>
              )}

              {!selectedContact.needs_reply && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  このお問い合わせは対応完了済みです
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex justify-between">
            <div>
              {selectedContact?.needs_reply && (
                <Button
                  variant="outline"
                  onClick={handleNoReplyNeeded}
                  className="border-gray-300 text-gray-600"
                >
                  <X className="w-4 h-4 mr-2" />
                  返信の必要なし
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                閉じる
              </Button>
              {selectedContact?.needs_reply && (
                <Button
                  onClick={handleSendReply}
                  disabled={isSending || !replyText.trim()}
                  className="bg-gray-900 hover:bg-gray-800"
                >
                  {isSending ? '送信中...' : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      返信を送信
                    </>
                  )}
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}