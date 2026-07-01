'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

const empty = { name: '', roleCompany: '', message: '', avatarUrl: '', rating: '', sortOrder: 0, isActive: true };

export default function NewTestimonialPage() {
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
      await adminApi.createTestimonial({
        ...form,
        rating: form.rating ? Number(form.rating) : null,
        sortOrder: Number(form.sortOrder),
      });
      router.push('/admin/testimonials');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">New Testimonial</h1>
      <TestimonialForm form={form} onChange={handleChange} onSubmit={handleSubmit} error={error} loading={loading} />
    </div>
  );
}

export function TestimonialForm({ form, onChange, onSubmit, error, loading }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-lg border">
      <div>
        <label className="block text-sm font-medium mb-1">Name *</label>
        <input name="name" value={form.name} onChange={onChange} required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Role / Company (optional)</label>
        <input name="roleCompany" value={form.roleCompany} onChange={onChange} placeholder="CEO, Acme Corp" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message *</label>
        <textarea name="message" value={form.message} onChange={onChange} required rows={4} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Avatar URL (optional)</label>
        <input name="avatarUrl" value={form.avatarUrl} onChange={onChange} placeholder="https://..." className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Rating (optional, 1–5)</label>
        <select name="rating" value={form.rating} onChange={onChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black">
          <option value="">No rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
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
        <a href="/admin/testimonials" className="px-6 py-2 rounded border hover:bg-gray-50 transition">Cancel</a>
      </div>
    </form>
  );
}