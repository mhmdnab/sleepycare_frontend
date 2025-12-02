'use client';

import { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Partner {
  id: string;
  name: string;
  icon: string;
}

const initialPartners: Partner[] = [
  { id: '1', name: 'Baby Wipes', icon: '👶' },
  { id: '2', name: 'Antibacterial Wipes', icon: '🦠' },
  { id: '3', name: 'Kitchen Wipes', icon: '🍽️' },
  { id: '4', name: 'Furniture Wipes', icon: '🛋️' },
  { id: '5', name: 'Glass Wipes', icon: '🪟' },
  { id: '6', name: 'Floor Wipes', icon: '🧹' },
];

export default function AdminPartnersPage() {
  const [partnerList, setPartnerList] = useState<Partner[]>(initialPartners);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState({ name: '', icon: '' });

  const filteredPartners = partnerList.filter((partner) =>
    partner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingPartner(null);
    setFormData({ name: '', icon: '' });
    setShowModal(true);
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({ name: partner.name, icon: partner.icon });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this partner?')) {
      setPartnerList(partnerList.filter((partner) => partner.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPartner) {
      // Update existing partner
      setPartnerList(
        partnerList.map((partner) =>
          partner.id === editingPartner.id
            ? { ...partner, name: formData.name, icon: formData.icon }
            : partner
        )
      );
    } else {
      // Add new partner
      const newPartner: Partner = {
        id: Date.now().toString(),
        name: formData.name,
        icon: formData.icon,
      };
      setPartnerList([...partnerList, newPartner]);
    }

    setShowModal(false);
    setFormData({ name: '', icon: '' });
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
        {filteredPartners.length === 0 ? (
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
                <div className="text-4xl mb-3">{partner.icon}</div>
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
                    Icon (Emoji)
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                    placeholder="e.g., 👶"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use an emoji to represent this partner
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
