'use client';

import { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { adminPartnersApi } from '@/lib/api/api';
import { PartnerRead } from '@/lib/api/types';

interface Partner {
  id: string;
  name: string;
  icon: string;
}

export default function AdminPartnersPage() {
  const [partnerList, setPartnerList] = useState<Partner[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', icon: '' });
  const [loading, setLoading] = useState(true);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLogoPreview(base64String);
        setFormData({ ...formData, icon: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      const data = await adminPartnersApi.getAll();
      setPartnerList(data);
    } catch (error) {
      console.error('Failed to load partners:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPartners = partnerList.filter((partner) =>
    partner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingPartner(null);
    setLogoFile(null);
    setLogoPreview('');
    setFormData({ name: '', icon: '' });
    setShowModal(true);
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setLogoFile(null);
    setLogoPreview(partner.icon);
    setFormData({ name: partner.name, icon: partner.icon });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this partner?')) {
      try {
        await adminPartnersApi.delete(id);
        await loadPartners();
      } catch (error) {
        console.error('Failed to delete partner:', error);
        alert('Failed to delete partner');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingPartner) {
        await adminPartnersApi.update(editingPartner.id, {
          name: formData.name,
          icon: formData.icon,
        });
      } else {
        await adminPartnersApi.create({
          name: formData.name,
          icon: formData.icon,
        });
      }
      await loadPartners();
      setShowModal(false);
      setFormData({ name: '', icon: '' });
    } catch (error) {
      console.error('Failed to save partner:', error);
      alert('Failed to save partner');
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Available At Partners</h1>
          <p className="text-gray-600 mt-2">Manage where products are available</p>
        </div>
        <Button className="flex items-center space-x-2" onClick={handleAdd}>
          <Plus className="w-5 h-5" />
          <span>Add Partner</span>
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search partners..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredPartners.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600 text-lg">No partners found</p>
          </div>
        ) : (
          filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="text-center mb-4">
                <div className="flex justify-center items-center mb-3 h-20">
                  {partner.icon ? (
                    <img
                      src={partner.icon}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Logo';
                      }}
                    />
                  ) : (
                    <div className="text-4xl text-gray-400">🏢</div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {partner.name}
                </h3>
              </div>
              <div className="flex justify-center space-x-2 pt-4 border-t">
                <button
                  onClick={() => handleEdit(partner)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(partner.id)}
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
                {editingPartner ? 'Edit Partner' : 'Add New Partner'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partner Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Baby Wipes"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partner Logo
                  </label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                    />
                    <div className="text-center text-sm text-gray-500">or</div>
                    <input
                      type="url"
                      value={formData.icon}
                      onChange={(e) => {
                        setFormData({ ...formData, icon: e.target.value });
                        setLogoPreview(e.target.value);
                      }}
                      placeholder="Enter image URL"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                    {logoPreview && (
                      <div className="mt-2 flex justify-center">
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="w-32 h-32 object-contain rounded-lg border border-gray-300 bg-white p-2"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload an image or enter the URL of the partner's logo
                  </p>
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
                    {editingPartner ? 'Update' : 'Create'}
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
