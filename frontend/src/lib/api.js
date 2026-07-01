import { API_URL } from "@/lib/config";

export async function getServices() {
  const res = await fetch(`${API_URL}/services`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
}

export async function getServicesById(id) {
  const res = await fetch(`${API_URL}/services/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
}

export async function getWorkingProcess() {
  const res = await fetch(`${API_URL}/working-process`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch working process');
  return res.json();
}

export async function getTeamMembers() {
  const res = await fetch(`${API_URL}/team`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch team');
  return res.json();
}

export async function getTestimonials() {
  const res = await fetch(`${API_URL}/testimonials`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch testimonials');
  return res.json();
}

export async function getCaseStudies() {
  const res = await fetch(`${API_URL}/case-studies`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch case studies');
  return res.json();
}

export async function submitContactForm(data) {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to submit');
  }
  return res.json();
}