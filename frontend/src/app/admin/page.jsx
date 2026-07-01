'use client';

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome back. Select a section to manage.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        <a href="/admin/services" className="bg-white rounded-lg border p-5 hover:shadow-md transition">
          <h2 className="font-semibold text-lg">Services</h2>
          <p className="text-gray-500 text-sm mt-1">Add, edit, reorder, and toggle services</p>
        </a>

        <a href="/admin/case-studies" className="bg-white rounded-lg border p-5 hover:shadow-md transition">
          <h2 className="font-semibold text-lg">Case Studies</h2>
          <p className="text-gray-500 text-sm mt-1">Manage portfolio case studies</p>
        </a>

        <a href="/admin/working-processes" className="bg-white rounded-lg border p-5 hover:shadow-md transition">
          <h2 className="font-semibold text-lg">Working Process</h2>
          <p className="text-gray-500 text-sm mt-1">Manage process steps</p>
        </a>

        <a href="/admin/team-members" className="bg-white rounded-lg border p-5 hover:shadow-md transition">
          <h2 className="font-semibold text-lg">Team Members</h2>
          <p className="text-gray-500 text-sm mt-1">Manage team profiles</p>
        </a>

        <a href="/admin/testimonials" className="bg-white rounded-lg border p-5 hover:shadow-md transition">
          <h2 className="font-semibold text-lg">Testimonials</h2>
          <p className="text-gray-500 text-sm mt-1">Manage client testimonials</p>
        </a>

        <a href="/admin/contact-submissions" className="bg-white rounded-lg border p-5 hover:shadow-md transition">
          <h2 className="font-semibold text-lg">Contact Submissions</h2>
          <p className="text-gray-500 text-sm mt-1">View and triage messages</p>
        </a>

      </div>
    </div>
  );
}