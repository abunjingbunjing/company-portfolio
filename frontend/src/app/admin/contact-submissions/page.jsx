'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/adminApi';

const STATUSES = ['new', 'read', 'archived'];

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [filter]);

  async function load() {
    setLoading(true);
    const query = filter === 'all' ? '' : `?status=${filter}`;
    const data = await adminApi.getSubmissions(query);
    setSubmissions(data);
    setLoading(false);
  }

  async function handleStatusChange(id, newStatus) {
    await adminApi.updateSubmissionStatus(id, newStatus);
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Contact Submissions</h1>

      <div className="flex gap-2 mb-6">
        {['all', ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded border ${filter === s ? 'bg-black text-white' : ''}`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.id} className="border-b align-top">
                <td className="py-2">{s.name}</td>
                <td>{s.email}</td>
                <td className="max-w-xs">{s.message}</td>
                <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                <td>
                  <select
                    value={s.status}
                    onChange={(e) => handleStatusChange(s.id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    {STATUSES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {submissions.length === 0 && (
              <tr><td colSpan="5" className="py-4 text-gray-500">No submissions found.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}