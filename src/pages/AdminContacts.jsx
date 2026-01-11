import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Mail, Eye, Trash2, Send, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchContacts = async () => {
    const data = await base44.entities.Contact.list('-created_date');
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const openDialog = (contact) => {
    setSelectedContact(contact);
    setReplyText(contact.reply || '');
    setIsDialogOpen(true);
  };

  const handleStatusChange = async (contactId, newStatus) => {
    await base44.entities.Contact.update(contactId, { status: newStatus });
    toast.success('ステータスを更新しました');
    fetchContacts();
  };

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      toast.error('返信内容を入力してください');
      return;
    }

    setIsSending(true);

    // Send email
    await base44.integrations.Core.SendEmail({
      to: selectedContact.email,
      subject: `【KR企画】お問い合わせへの返信`,
      body: replyText
    });

    // Update contact record
    await base44.entities.Contact.update(selectedContact.id, {
      reply: replyText,
      replied_at: new Date().toISOString(),
      status: '完了'
    });

    toast.success('返信を送信しました');
    setIsSending(false);
    setIsDialogOpen(false);
    fetchContacts();
  };

  const handleDelete = async (id) => {
    if (!confirm('このお問い合わせを削除しますか？')) return;
    await base44.entities.Contact.delete(id);
    toast.success('削除しました');
    fetchContacts();
  };

  const filteredContacts = statusFilter === 'all' 
    ? contacts 
    : contacts.filter(c => c.status === statusFilter);

  const statusColors = {
    '未対応': 'bg-red-100 text-red-800',
    '対応中': 'bg-yellow-100 text-yellow-800',
    '完了': 'bg-green-100 text-green-800'
  };

  return (
    <AdminLayout currentPage="contacts">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">お問い合わせ管理</h1>
            <p className="text-gray-500 mt-1">受信したお問い合わせ</p>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="ステータス" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="未対応">未対応</SelectItem>
              <SelectItem value="対応中">対応中</SelectItem>
              <SelectItem value="完了">完了</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Alert className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>メール送信について</AlertTitle>
          <AlertDescription>
            返信機能は内蔵のメール送信機能を使用しています。独自のメールサーバーを設定する場合は、バックエンド関数をカスタマイズしてください。
          </AlertDescription>
        </Alert>
      </div>

      <div className="space-y-4">
        {filteredContacts.map((contact) => (
          <Card key={contact.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${statusColors[contact.status] || 'bg-gray-100'}`}>
                      {contact.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      {format(new Date(contact.created_date), 'yyyy/MM/dd HH:mm', { locale: ja })}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">会社名:</span>
                      <span className="ml-2">{contact.company_name || '-'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">お名前:</span>
                      <span className="ml-2">{contact.name}</span>
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
        ))}

        {filteredContacts.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              お問い合わせがありません
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
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
                  <p className="mt-1">{selectedContact.name}</p>
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

              <div>
                <Label className="text-gray-400">お問い合わせ内容</Label>
                <p className="mt-1 p-3 bg-gray-50 rounded-lg whitespace-pre-wrap">
                  {selectedContact.message}
                </p>
              </div>

              <div>
                <Label className="text-gray-400">ステータス</Label>
                <Select
                  value={selectedContact.status}
                  onValueChange={(value) => {
                    handleStatusChange(selectedContact.id, value);
                    setSelectedContact({ ...selectedContact, status: value });
                  }}
                >
                  <SelectTrigger className="mt-1 w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="未対応">未対応</SelectItem>
                    <SelectItem value="対応中">対応中</SelectItem>
                    <SelectItem value="完了">完了</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-400">返信</Label>
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="mt-1 min-h-32"
                  placeholder="返信内容を入力..."
                />
                {selectedContact.replied_at && (
                  <p className="text-xs text-gray-400 mt-1">
                    返信済み: {format(new Date(selectedContact.replied_at), 'yyyy/MM/dd HH:mm', { locale: ja })}
                  </p>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              閉じる
            </Button>
            <Button
              onClick={handleSendReply}
              disabled={isSending}
              className="bg-gray-900 hover:bg-gray-800"
            >
              {isSending ? '送信中...' : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  返信を送信
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}