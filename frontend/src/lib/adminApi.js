import { API_URL } from "@/lib/config";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (res.status === 401) {
      throw new Error("Not authenticated");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Request failed');
  }

  return res.json();
}

export const adminApi = {
  getCurrentUser: () => request("/auth/me"),
  //upload image
  uploadTeamImage: async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_URL}/team/upload`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  return res.json();
},

  // Services
  getServices: () => request('/services'),
  getServiceById: (id) => request(`/services/${id}`),
  createService: (data) => request('/services', { method: 'POST', body: JSON.stringify(data) }),
  updateService: (id, data) => request(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteService: (id) => request(`/services/${id}`, { method: 'DELETE' }),

  // Case Studies
  getCaseStudies: () => request('/case-studies'),
  getCaseStudyById: (id) => request(`/case-studies/${id}`),
  createCaseStudy: (data) => request('/case-studies', { method: 'POST', body: JSON.stringify(data) }),
  updateCaseStudy: (id, data) => request(`/case-studies/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCaseStudy: (id) => request(`/case-studies/${id}`, { method: 'DELETE' }),

  // Working Process
  getWorkingProcesses: () => request('/working-process'),
  getWorkingProcessById: (id) => request(`/working-process/${id}`),
  createWorkingProcess: (data) => request('/working-process', { method: 'POST', body: JSON.stringify(data) }),
  updateWorkingProcess: (id, data) => request(`/working-process/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteWorkingProcess: (id) => request(`/working-process/${id}`, { method: 'DELETE' }),

  // Team Members
  getTeamMembers: () => request('/team'),
  getTeamMemberById: (id) => request(`/team/${id}`),
  createTeamMember: (data) => request('/team', { method: 'POST', body: JSON.stringify(data) }),
  updateTeamMember: (id, data) => request(`/team/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTeamMember: (id) => request(`/team/${id}`, { method: 'DELETE' }),

  // Testimonials
  getTestimonials: () => request('/testimonials'),
  getTestimonialById: (id) => request(`/testimonials/${id}`),
  createTestimonial: (data) => request('/testimonials', { method: 'POST', body: JSON.stringify(data) }),
  updateTestimonial: (id, data) => request(`/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTestimonial: (id) => request(`/testimonials/${id}`, { method: 'DELETE' }),

  // Contact Submissions
  getSubmissions: (query = '') => request(`/contact${query}`),
  updateSubmissionStatus: (id, status) =>
    request(`/contact/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
};

