import { useState, useCallback } from 'react';

export function useDialogForm(initialState) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(initialState);

  const openDialog = useCallback((item = null) => {
    setEditingItem(item || null);
    if (item) {
      setFormData(item);
    } else {
      setFormData(initialState);
    }
    setIsDialogOpen(true);
  }, [initialState]);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    setEditingItem(null);
  }, []);

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  return {
    isDialogOpen,
    setIsDialogOpen,
    editingItem,
    formData,
    setFormData,
    openDialog,
    closeDialog,
    updateField,
  };
}