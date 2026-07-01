'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';
import { TeamMemberForm } from '../../new/page';

export default function EditTeamMemberPage({ params }) {
  const { id } = use(params);
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    adminApi.getTeamMemberById(id).then((data) => {
      setForm({
        name: data.name,
        role: data.role,
        avatarUrl: data.avatarUrl || '',
        socialsJson: data.socialsJson || '',
        sortOrder: data.sortOrder,
        isActive: data.isActive,
      });
    }).catch((err) => setError(err.message));
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await adminApi.updateTeamMember(id, { ...form, sortOrder: Number(form.sortOrder) });
      router.push('/admin/team-members');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (error) return <p className="text-red-600">{error}</p>;
  if (!form) return <p>Loading...</p>;

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Edit Team Member</h1>
      <TeamMemberForm form={form} onChange={handleChange} onSubmit={handleSubmit} error={error} loading={loading} />
    </div>
  );
}