'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

const empty = { title: '', shortDescription: '', coverImageUrl: '', linkUrl: '', tags: '', sortOrder: 0, isActive: true };

export default function NewCaseStudyPage() {
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
      await adminApi.createCaseStudy({ ...form, sortOrder: Number(form.sortOrder) });
      router.push('/admin/case-studies');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">New Case Study</h1>
      <CaseStudyForm form={form} onChange={handleChange} onSubmit={handleSubmit} error={error} loading={loading} />
    </div>
  );
}

export function CaseStudyForm({ form, onChange, onSubmit, error, loading }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-lg border">
      <div>
        <label className="block text-sm font-medium mb-1">Title *</label>
        <input name="title" value={form.title} onChange={onChange} required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Short Description *</label>
        <textarea name="shortDescription" value={form.shortDescription} onChange={onChange} required rows={3} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Cover Image URL (optional)</label>
        <input name="coverImageUrl" value={form.coverImageUrl} onChange={onChange} placeholder="https://..." className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">External URL (optional)</label>
        <input name="linkUrl" value={form.linkUrl} onChange={onChange} placeholder="https://..." className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Tags (optional, comma-separated)</label>
        <input name="tags" value={form.tags} onChange={onChange} placeholder="web, fintech, redesign" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
        <p className="text-xs text-gray-400 mt-1">e.g. web, mobile, fintech</p>
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
        <a href="/admin/case-studies" className="px-6 py-2 rounded border hover:bg-gray-50 transition">Cancel</a>
      </div>
    </form>
  );
}