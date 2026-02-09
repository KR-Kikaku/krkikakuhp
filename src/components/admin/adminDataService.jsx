import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

/**
 * 管理画面用データ操作サービス
 * CRUD操作とファイルアップロードを統一管理
 */
export const adminDataService = {
  async createEntity(entityName, data) {
    try {
      const result = await base44.entities[entityName].create(data);
      toast.success('追加しました');
      return result;
    } catch (error) {
      toast.error('追加に失敗しました');
      throw error;
    }
  },

  async updateEntity(entityName, id, data) {
    try {
      const result = await base44.entities[entityName].update(id, data);
      toast.success('更新しました');
      return result;
    } catch (error) {
      toast.error('更新に失敗しました');
      throw error;
    }
  },

  async deleteEntity(entityName, id) {
    try {
      await base44.entities[entityName].delete(id);
      toast.success('削除しました');
      return true;
    } catch (error) {
      toast.error('削除に失敗しました');
      throw error;
    }
  },

  async listEntities(entityName, sortField = '-created_date') {
    try {
      const result = await base44.entities[entityName].list(sortField);
      return result;
    } catch (error) {
      toast.error('データの取得に失敗しました');
      throw error;
    }
  },

  async uploadFile(file) {
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      toast.success('画像をアップロードしました');
      return file_url;
    } catch (error) {
      toast.error('アップロードに失敗しました');
      throw error;
    }
  },
};