import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Loader2 } from 'lucide-react';

/**
 * 管理画面のページヘッダーコンポーネント
 * @param {string} title - ページタイトル
 * @param {string} description - ページ説明
 * @param {function} onSave - 保存ボタンクリック時のコールバック
 * @param {boolean} isSaving - 保存中フラグ
 * @param {ReactNode} actionButton - カスタムアクションボタン
 */
export default function AdminPageHeader({
  title,
  description,
  onSave,
  isSaving,
  actionButton = null,
}) {
  return (
    <div className="mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {description && <p className="text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="flex items-center gap-2">
        {actionButton}
        {onSave && (
          <Button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="bg-gray-900 hover:bg-gray-800"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                保存中...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                設定を保存
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}