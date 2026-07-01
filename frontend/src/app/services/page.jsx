import { getServices } from '@/lib/api';
import Link from 'next/link';

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((services) => (
          <Link
            key={services.id}
            href={`/services/${services.id}`}
            className="border rounded-lg p-5 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{services.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{services.description}</p>
            <p className="mt-3 text-gray-700 line-clamp-3">{services.iconUrl}</p>
          </Link>
        ))}
        {services.length === 0 && <p>No services offered yet.</p>}
      </div>
    </main>
  );
}