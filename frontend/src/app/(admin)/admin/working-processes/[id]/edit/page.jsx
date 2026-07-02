'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';
import { WorkingProcessForm } from '../../new/page';

export default function EditWorkingProcessPage({ params }) {
  const { id } = use(params);
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    adminApi.getWorkingProcessById(id).then((data) => {
      setForm({
        stepNo: data.stepNo,
        title: data.title,
        description: data.description,
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
      await adminApi.updateWorkingProcess(id, {
        ...form,
        stepNo: Number(form.stepNo),
        sortOrder: Number(form.sortOrder),
      });
      router.push('/admin/working-processes');
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
      <h1 className="text-2xl font-bold mb-6">Edit Process Step</h1>
      <WorkingProcessForm form={form} onChange={handleChange} onSubmit={handleSubmit} error={error} loading={loading} />
    </div>
  );
}