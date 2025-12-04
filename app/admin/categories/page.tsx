'use client';

import { useState } from 'react';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CategoryRead } from '@/lib/api/types';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '@/lib/hooks/useQueries';

interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
}

export default function AdminCategoriesPage() {
  const { data: categoryList = [], isLoading: loading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', description: '', icon: '' });

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setIconPreview(base64String);
        setFormData({ ...formData, icon: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredCategories = categoryList.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingCategory(null);
    setIconFile(null);
    setIconPreview('');
    setFormData({ name: '', description: '', icon: '' });
    setShowModal(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIconFile(null);
    setIconPreview(category.icon || '');
    setFormData({ name: category.name, description: category.description || '', icon: category.icon || '' });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory.mutateAsync(id);
      } catch (error) {
        console.error('Failed to delete category:', error);
        alert('Failed to delete category');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingCategory) {
        await updateCategory.mutateAsync({
          id: editingCategory.id,
          data: {
            name: formData.name,
            description: formData.description || null,
            icon: formData.icon || null,
          }
        });
      } else {
        await createCategory.mutateAsync({
          name: formData.name,
          description: formData.description || null,
          icon: formData.icon || null,
        });
      }
      setShowModal(false);
      setFormData({ name: '', description: '', icon: '' });
    } catch (error) {
      console.error('Failed to save category:', error);
      alert('Failed to save category');
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-2">Manage product categories</p>
        </div>
        <Button className="flex items-center space-x-2" onClick={handleAdd}>
          <Plus className="w-5 h-5" />
          <span>Add Category</span>
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600 text-lg">No categories found</p>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{category.icon || '📁'}</div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-sm text-gray-500 mt-2">{category.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">ID: {category.id.substring(0, 8)}...</p>
              </div>
              <div className="flex justify-center space-x-2 pt-4 border-t">
                <button
                  onClick={() => handleEdit(category)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Surface Wipes"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon (Emoji or Image)
                  </label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleIconChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                    />
                    <div className="text-center text-sm text-gray-500">or</div>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) => {
                        setFormData({ ...formData, icon: e.target.value });
                        setIconPreview(e.target.value);
                      }}
                      placeholder="Enter emoji (🧼) or image URL"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                    {iconPreview && (
                      <div className="mt-2 flex justify-center">
                        {iconPreview.startsWith('data:') || iconPreview.startsWith('http') ? (
                          <img
                            src={iconPreview}
                            alt="Icon preview"
                            className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                          />
                        ) : (
                          <div className="text-4xl">{iconPreview}</div>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload an image or use an emoji to represent this category
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Brief description of this category"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingCategory ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
