'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '@/lib/adminApi';

export default function AdminCaseStudiesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await adminApi.getCaseStudies();
    setItems(data);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm('Delete this case study?')) return;
    await adminApi.deleteCaseStudy(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Case Studies</h1>
        <Link href="/admin/case-studies/new" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition text-sm">
          + New Case Study
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
            {items.length === 0 && (
              <tr><td colSpan="4" className="px-4 py-6 text-gray-400 text-center">No case studies yet.</td></tr>
            )}
            {items.map((item) => (
              <tr key={item.id} className="border-b last:border-0">
                <td className="px-4 py-3">{item.title}</td>
                <td className="px-4 py-3">{item.sortOrder}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link href={`/admin/case-studies/${item.id}/edit`} className="text-blue-600 hover:underline text-sm">Edit</Link>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}