import { useState, useCallback } from 'react';

export function useAdminForm(initialState) {
  const [formData, setFormData] = useState(initialState);

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateFields = useCallback((updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const reset = useCallback(() => {
    setFormData(initialState);
  }, [initialState]);

  return { formData, updateField, updateFields, reset, setFormData };
}