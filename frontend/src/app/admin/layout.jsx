import Link from 'next/link';
import LogoutButton from './LogoutButton';
import AuthGuard from "@/components/admin/AuthGuard";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </div>
        <nav className="flex flex-col gap-1 p-4 flex-1">
          <Link href="/admin" className="px-3 py-2 rounded hover:bg-gray-700 text-sm transition">
            Dashboard
          </Link>
          <Link href="/admin/services" className="px-3 py-2 rounded hover:bg-gray-700 text-sm transition">
            Services
          </Link>
          <Link href="/admin/case-studies" className="px-3 py-2 rounded hover:bg-gray-700 text-sm transition">
            Case Studies
          </Link>
          <Link href="/admin/working-processes" className="px-3 py-2 rounded hover:bg-gray-700 text-sm transition">
            Working Process
          </Link>
          <Link href="/admin/team-members" className="px-3 py-2 rounded hover:bg-gray-700 text-sm transition">
            Team Members
          </Link>
          <Link href="/admin/testimonials" className="px-3 py-2 rounded hover:bg-gray-700 text-sm transition">
            Testimonials
          </Link>
          <Link href="/admin/contact-submissions" className="px-3 py-2 rounded hover:bg-gray-700 text-sm transition">
            Contact Submissions
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}