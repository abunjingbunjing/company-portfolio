'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';
import { CaseStudyForm } from '../../new/page';

export default function EditCaseStudyPage({ params }) {
  const { id } = use(params);
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    adminApi.getCaseStudyById(id).then((data) => {
      setForm({
        title: data.title,
        shortDescription: data.shortDescription,
        coverImageUrl: data.coverImageUrl || '',
        linkUrl: data.linkUrl || '',
        tags: data.tags || '',
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
      await adminApi.updateCaseStudy(id, { ...form, sortOrder: Number(form.sortOrder) });
      router.push('/admin/case-studies');
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
      <h1 className="text-2xl font-bold mb-6">Edit Case Study</h1>
      <CaseStudyForm form={form} onChange={handleChange} onSubmit={handleSubmit} error={error} loading={loading} />
    </div>
  );
}