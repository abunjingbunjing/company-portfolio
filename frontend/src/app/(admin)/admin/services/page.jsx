'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '@/lib/adminApi';
import { SERVICE_ICONS } from "@/constants/serviceIcons";

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    try {
      const data = await adminApi.getServices();
      setServices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this service? This cannot be undone.')) return;
    try {
      await adminApi.deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
        <Link href="/admin/services/new" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition text-sm">
          + New Service
        </Link>
      </div>
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium">Title</th>
              <th className="text-left px-4 py-3 text-sm font-medium">Sort Order</th>
              <th className="text-left px-4 py-3 text-sm font-medium">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 && (
              <tr><td colSpan="4" className="px-4 py-6 text-gray-400 text-center">No services yet.</td></tr>
            )}
            {services.map((s) => (
              <tr key={s.id} className="border-b last:border-0">
                <td className="px-4 py-3">{s.title}</td>
                <td className="px-4 py-3">{s.sortOrder}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {s.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link href={`/admin/services/${s.id}/edit`} className="text-blue-600 hover:underline text-sm">Edit</Link>
                  <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}