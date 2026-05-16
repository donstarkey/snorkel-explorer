//const API_BASE = import.meta.env.VITE_API_BASE;
const API = import.meta.env.VITE_API_URL;

export async function getDestinations() {
  const res = await fetch(`${API}/api/Destinations`);
  return res.json();
}


export async function getDestination(id) {
  const res = await fetch(`${API}/api/Destinations/${id}`);
  return res.json();
}

export async function uploadImage(formData) {
  const res = await fetch(`${API}/api/Images/uploadtest`, {
    method: 'POST',
    body: formData
  });
  return res.json();
}

