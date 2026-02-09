import { useState, useCallback } from 'react';

/**
 * フォームデータの管理Hook
 * @param {Object} initialState - フォームの初期状態
 * @returns {Object} formData, updateField, updateFields, reset, setFormData
 */
export function useAdminForm(initialState) {
  const [formData, setFormData] = useState(initialState);

  const updateField = useCallback((fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  }, []);

  const updateFields = useCallback((updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const reset = useCallback(() => {
    setFormData(initialState);
  }, [initialState]);

  return { formData, updateField, updateFields, reset, setFormData };
}