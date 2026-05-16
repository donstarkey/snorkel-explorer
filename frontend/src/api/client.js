const API_BASE = import.meta.env.VITE_API_BASE;

export async function getDestinations() {
  const res = await fetch(`${API_BASE}/api/Destinations`);
  return res.json();
}

export async function getDestination(id) {
  const res = await fetch(`${API_BASE}/api/Destinations/${id}`);
  return res.json();
}

export async function uploadImage(formData) {
  const res = await fetch(`${API_BASE}/api/Images/uploadtest`, {
    method: 'POST',
    body: formData
  });
  return res.json();
}
