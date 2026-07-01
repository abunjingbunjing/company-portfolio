import { getTeamMembers } from '@/lib/api';
import Link from 'next/link';

export default async function TeamMembersPage() {
  const team = await getTeamMembers();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {team.map((member) => (
          <Link
            key={member.id}
            href={`/team/${member.id}`}
            className="border rounded-lg p-5 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{member.role}</p>
            <p className="mt-3 text-gray-700 line-clamp-3">{member.bio}</p>
          </Link>
        ))}
        {team.length === 0 && <p>No team yet.</p>}
      </div>
    </main>
  );
}