const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const toURL = (p) => new URL(p, BASE).toString();

async function req(path, { method='GET', body, headers={} } = {}) {
  const res = await fetch(toURL(path), {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch {}
  if (!res.ok) throw new Error(data.error || data.message || `HTTP ${res.status}`);
  return data;
}

function qs(obj = {}) {
  const e = Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null && v !== '');
  return e.length ? `?${new URLSearchParams(e)}` : '';
}

export const api = {
  candidates: {
    list:   (params)    => req(`/api/candidates${qs(params)}`),
    create: (body)      => req('/api/candidates', { method: 'POST', body }),
    get:    (id)        => req(`/api/candidates/${id}`),
    update: (id, body)  => req(`/api/candidates/${id}`, { method: 'PUT', body }),
    remove: (id)        => req(`/api/candidates/${id}`, { method: 'DELETE' }),
    moveStage: (id, s)  => req(`/api/candidates/${id}/stage`, { method: 'POST', body: { stage: s } }), // POST alias works everywhere
  }
};
