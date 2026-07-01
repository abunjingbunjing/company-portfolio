'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';
import { SERVICE_ICONS } from "@/constants/serviceIcons";

const empty = { title: '', description: '', backgroundColor: "gray", iconName: '', iconUrl: '', websiteUrl: '', sortOrder: 0, isActive: true };

export default function NewServicePage() {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await adminApi.createService({ ...form, sortOrder: Number(form.sortOrder) });
      router.push('/admin/services');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">New Service</h1>
      <ServiceForm form={form} onChange={handleChange} onSubmit={handleSubmit} error={error} loading={loading} />
    </div>
  );
}

export function ServiceForm({ form, onChange, onSubmit, error, loading }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-lg border">
      <div>
        <label className="block text-sm font-medium mb-1">Title *</label>
        <input name="title" value={form.title} onChange={onChange} required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description *</label>
        <textarea name="description" value={form.description} onChange={onChange} required rows={4} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Website URL
        </label>

        <input
          type="url"
          name="websiteUrl"
          value={form.websiteUrl}
          onChange={onChange}
          placeholder="https://example.com"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
        <div>
        <label className="block text-sm font-medium mb-1">
            Service Icon
        </label>
        <select
            name="iconName"
            value={form.iconName}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            >
            <option value="">Select icon</option>

            {SERVICE_ICONS.map((icon) => (
                <option key={icon.value} value={icon.value}>
                {icon.label}
                </option>
            ))}
        </select>
        </div>
        <div>
        <label className="block text-sm font-medium mb-1">
            Background Color
        </label>

        <select
            name="backgroundColor"
            value={form.backgroundColor}
            onChange={onChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        >
            <option value="gray">Gray</option>
            <option value="green">Green</option>
            <option value="white">White</option>
        </select>
        </div>
      <div>
        <label className="block text-sm font-medium mb-1">Sort Order</label>
        <input type="number" name="sortOrder" value={form.sortOrder} onChange={onChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" name="isActive" id="isActive" checked={form.isActive} onChange={onChange} className="h-4 w-4" />
        <label htmlFor="isActive" className="text-sm font-medium">Active (visible on public site)</label>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50 transition">
          {loading ? 'Saving...' : 'Save'}
        </button>
        <a href="/admin/services" className="px-6 py-2 rounded border hover:bg-gray-50 transition">Cancel</a>
      </div>
    </form>
  );
}