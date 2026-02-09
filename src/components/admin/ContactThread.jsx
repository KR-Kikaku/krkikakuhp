import React from 'react';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function ContactThread({ contact }) {
  const replies = contact.replies || [];

  return (
    <div>
      <Label className="text-gray-400">やり取り履歴</Label>
      <div className="mt-2 space-y-3">
        {replies.map((reply, index) => {
          const isFromCustomer = reply.from === contact.email;
          return (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                isFromCustomer
                  ? 'bg-gray-50 border-l-4 border-gray-400'
                  : 'bg-blue-50 border-l-4 border-blue-500'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium">
                  {isFromCustomer ? `${contact.name}様` : 'KR企画'}
                </span>
                <span className="text-xs text-gray-400">
                  {format(new Date(reply.timestamp), 'yyyy/MM/dd HH:mm', {
                    locale: ja,
                  })}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{reply.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}