import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

/**
 * 画像アップロードフィールド
 * @param {string} label - ラベルテキスト
 * @param {string} value - 現在の画像URL
 * @param {function} onChange - ファイル変更時のコールバック
 * @param {boolean} isUploading - アップロード中フラグ
 * @param {string} recommendedSize - 推奨サイズ表示
 * @param {string} inputId - input要素のID
 * @param {string} accept - 受け付けるファイル形式
 */
export default function ImageUploadField({
  label,
  value,
  onChange,
  isUploading,
  recommendedSize,
  inputId,
  accept = 'image/*',
}) {
  const handleUploadButtonClick = () => {
    document.getElementById(inputId).click();
  };

  return (
    <div>
      <Label>{label}</Label>
      {recommendedSize && (
        <p className="text-xs text-gray-500 mt-1 whitespace-nowrap">{recommendedSize}</p>
      )}
      <div className="mt-2 flex items-center gap-4">
        {value && (
          <img
            src={value}
            alt=""
            className="max-w-full h-auto max-h-20 object-contain"
          />
        )}
        <div>
          <input
            type="file"
            id={inputId}
            accept={accept}
            onChange={onChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleUploadButtonClick}
            disabled={isUploading}
          >
            {isUploading ? 'アップロード中...' : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                {value ? '変更' : 'アップロード'}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}