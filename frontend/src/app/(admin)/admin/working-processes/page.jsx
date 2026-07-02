'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminApi } from '@/lib/adminApi';

export default function AdminWorkingProcessesPage() {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await adminApi.getWorkingProcesses();
    setSteps(data);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm('Delete this step?')) return;
    await adminApi.deleteWorkingProcess(id);
    setSteps((prev) => prev.filter((s) => s.id !== id));
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Working Process</h1>
        <Link href="/admin/working-processes/new" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition text-sm">
          + New Step
        </Link>
      </div>
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium">Step No.</th>
              <th className="text-left px-4 py-3 text-sm font-medium">Title</th>
              <th className="text-left px-4 py-3 text-sm font-medium">Sort Order</th>
              <th className="text-left px-4 py-3 text-sm font-medium">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {steps.length === 0 && (
              <tr><td colSpan="5" className="px-4 py-6 text-gray-400 text-center">No steps yet.</td></tr>
            )}
            {steps.map((s) => (
              <tr key={s.id} className="border-b last:border-0">
                <td className="px-4 py-3">{s.stepNo}</td>
                <td className="px-4 py-3">{s.title}</td>
                <td className="px-4 py-3">{s.sortOrder}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {s.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link href={`/admin/working-processes/${s.id}/edit`} className="text-blue-600 hover:underline text-sm">Edit</Link>
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