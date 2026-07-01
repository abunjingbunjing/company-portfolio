import { getServicesById } from '@/lib/api';

export default async function ServiceDetailPage({ params }) {
  const service = await getServicesById(params.id);

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold">{service.title}</h1>
      <p className="text-sm text-gray-500 mt-1">{service.category}</p>
      <p className="mt-6 text-gray-700 leading-relaxed">{service.description}</p>
      {service.link && (
        <a href={service.link} className="inline-block mt-6 text-blue-600 underline">
          Visit Services
        </a>
      )}
    </main>
  );
}