import { getTestimonials } from '@/lib/api';
import Link from 'next/link';

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Testimonials from Clients</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonials) => (
          <Link
            key={testimonials.id}
            href={`/testimonials/${testimonials.id}`}
            className="border rounded-lg p-5 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{testimonials.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{testimonials.message}</p>
            <p className="mt-3 text-gray-700 line-clamp-3">{testimonials.description}</p>
          </Link>
        ))}
        {testimonials.length === 0 && <p>No testimonials yet.</p>}
      </div>
    </main>
  );
}