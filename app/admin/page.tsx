'use client';

import { useEffect, useState } from 'react';
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import { productsApi, ordersApi, usersApi } from '@/lib/api/mockApi';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const products = await productsApi.getAll();
      const orders = await ordersApi.getAll();
      const users = await usersApi.getAll();

      const revenue = orders.reduce((sum, order) => sum + order.total_amount, 0);

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalUsers: users.length,
        totalRevenue: revenue,
      });
    };
    loadStats();
  }, []);

  const statCards = [
    {
      name: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'bg-green-500',
    },
    {
      name: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      name: 'Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/products"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <Package className="w-8 h-8 text-primary-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Manage Products</h3>
            <p className="text-sm text-gray-600">Add, edit, or remove products</p>
          </a>
          <a
            href="/admin/orders"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <ShoppingCart className="w-8 h-8 text-primary-600 mb-2" />
            <h3 className="font-semibold text-gray-900">View Orders</h3>
            <p className="text-sm text-gray-600">Process and track orders</p>
          </a>
          <a
            href="/admin/users"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <Users className="w-8 h-8 text-primary-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Manage Users</h3>
            <p className="text-sm text-gray-600">View and manage user accounts</p>
          </a>
        </div>
      </div>
    </div>
  );
}
