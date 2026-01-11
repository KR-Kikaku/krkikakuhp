import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Trash2, Pencil, User } from 'lucide-react';

export default function AdminUsers() {
  const [admins, setAdmins] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({
    login_id: '',
    password: '',
    name: '',
    is_active: true
  });

  const fetchAdmins = async () => {
    const data = await base44.entities.Admin.list();
    setAdmins(data);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const openDialog = (admin = null) => {
    if (admin) {
      setEditingAdmin(admin);
      setFormData({
        login_id: admin.login_id || '',
        password: '',
        name: admin.name || '',
        is_active: admin.is_active !== false
      });
    } else {
      setEditingAdmin(null);
      setFormData({
        login_id: '',
        password: '',
        name: '',
        is_active: true
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.login_id) {
      toast.error('ログインIDを入力してください');
      return;
    }

    if (!editingAdmin && !formData.password) {
      toast.error('パスワードを入力してください');
      return;
    }

    const dataToSave = { ...formData };
    if (!dataToSave.password) {
      delete dataToSave.password;
    }

    if (editingAdmin) {
      await base44.entities.Admin.update(editingAdmin.id, dataToSave);
      toast.success('更新しました');
    } else {
      await base44.entities.Admin.create(dataToSave);
      toast.success('追加しました');
    }

    setIsDialogOpen(false);
    fetchAdmins();
  };

  const handleDelete = async (id) => {
    if (admins.length <= 1) {
      toast.error('管理者は最低1人必要です');
      return;
    }
    if (!confirm('この管理者を削除しますか？')) return;
    await base44.entities.Admin.delete(id);
    toast.success('削除しました');
    fetchAdmins();
  };

  const toggleActive = async (admin) => {
    await base44.entities.Admin.update(admin.id, { is_active: !admin.is_active });
    toast.success(admin.is_active ? '無効にしました' : '有効にしました');
    fetchAdmins();
  };

  return (
    <AdminLayout currentPage="admins">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">管理者設定</h1>
          <p className="text-gray-500 mt-1">管理画面へのアクセス権限</p>
        </div>
        <Button onClick={() => openDialog()} className="bg-gray-900 hover:bg-gray-800">
          <Plus className="w-4 h-4 mr-2" />
          管理者を追加
        </Button>
      </div>

      <div className="space-y-4">
        {admins.map((admin) => (
          <Card key={admin.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">{admin.name || admin.login_id}</h3>
                    <p className="text-sm text-gray-500">ID: {admin.login_id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={admin.is_active}
                      onCheckedChange={() => toggleActive(admin)}
                    />
                    <span className={`text-sm ${admin.is_active ? 'text-green-600' : 'text-gray-400'}`}>
                      {admin.is_active ? '有効' : '無効'}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => openDialog(admin)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(admin.id)}
                    className="text-red-500"
                    disabled={admins.length <= 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {admins.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              管理者がいません。「管理者を追加」ボタンから追加してください。
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingAdmin ? '管理者を編集' : '管理者を追加'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label>管理者名</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
                placeholder="田中 太郎"
              />
            </div>
            <div>
              <Label>ログインID *</Label>
              <Input
                value={formData.login_id}
                onChange={(e) => setFormData({ ...formData, login_id: e.target.value })}
                className="mt-1"
                placeholder="admin01"
              />
            </div>
            <div>
              <Label>パスワード {editingAdmin ? '（変更する場合のみ）' : '*'}</Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label>有効</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={handleSave} className="bg-gray-900 hover:bg-gray-800">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}