'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

const empty = { name: '', role: '', avatarUrl: '', socialsJson: '', sortOrder: 0, isActive: true };


export default function NewTeamMemberPage() {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const router = useRouter();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  }

  function handleImageChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {let avatarUrl = form.avatarUrl;

      if (image) {
        const uploaded = await adminApi.uploadTeamImage(image);
        avatarUrl = uploaded.avatarUrl;
      }

      await adminApi.createTeamMember({
        ...form,
        avatarUrl,
        sortOrder: Number(form.sortOrder),
      });

      router.push("/admin/team-members");

    } catch (err) {
        setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">New Team Member</h1>
      <TeamMemberForm form={form} onChange={handleChange} onImageChange={handleImageChange} onSubmit={handleSubmit} error={error} loading={loading} />
    </div>
  );
}

export function TeamMemberForm({ form, onChange, onImageChange, onSubmit, error, loading }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-lg border">
      <div>
        <label className="block text-sm font-medium mb-1">Name *</label>
        <input name="name" value={form.name} onChange={onChange} required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Role *</label>
        <input name="role" value={form.role} onChange={onChange} required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Avatar URL (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Social Links (optional)</label>
        <textarea
          name="socialsJson"
          value={form.socialsJson}
          onChange={onChange}
          rows={3}
          placeholder={'{"linkedin":"https://...","twitter":"https://..."}'}
          className="w-full border rounded px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <p className="text-xs text-gray-400 mt-1">Enter as JSON, e.g. {`{"linkedin":"https://..."}`}</p>
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
        <a href="/admin/team-members" className="px-6 py-2 rounded border hover:bg-gray-50 transition">Cancel</a>
      </div>
    </form>
  );
}