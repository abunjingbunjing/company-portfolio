import { getWorkingProcess } from '@/lib/api';
import Link from 'next/link';

export default async function WorkingProcessPage() {
  const workingProcess = await getWorkingProcess();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Our Working Process</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {workingProcess.map((workingProcess) => (
          <Link
            key={workingProcess.id}
            href={`/working-process/${workingProcess.id}`}
            className="border rounded-lg p-5 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{workingProcess.stepNo}</h2>
            <p className="text-sm text-gray-500 mt-1">{workingProcess.title}</p>
            <p className="mt-3 text-gray-700 line-clamp-3">{workingProcess.description}</p>
          </Link>
        ))}
        {workingProcess.length === 0 && <p>No working process yet.</p>}
      </div>
    </main>
  );
}