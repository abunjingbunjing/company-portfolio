import { getCaseStudies } from '@/lib/api';
import Link from 'next/link';

export default async function CaseStudiesPage() {
  const caseStudy = await getCaseStudies();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Case Studies by the Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {caseStudy.map((caseStudy) => (
          <Link
            key={caseStudy.id}
            href={`/case-studies/${caseStudy.id}`}
            className="border rounded-lg p-5 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{caseStudy.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{caseStudy.shortDescription}</p>
            <p className="mt-3 text-gray-700 line-clamp-3">{caseStudy.coverImageUrl}</p>
          </Link>
        ))}
        {caseStudy.length === 0 && <p>No case studies yet.</p>}
      </div>
    </main>
  );
}