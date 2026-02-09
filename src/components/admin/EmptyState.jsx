import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

/**
 * データなし状態を表示するコンポーネント
 * @param {string} message - 表示するメッセージ
 */
export default function EmptyState({ message }) {
  return (
    <Card>
      <CardContent className="py-12 text-center text-gray-500">
        {message}
      </CardContent>
    </Card>
  );
}