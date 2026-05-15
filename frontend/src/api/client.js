export async function getDestinations() {
  const res = await fetch('/api/Destinations')
  return res.json()
}

export async function getDestination(id) {
  const res = await fetch(`/api/Destinations/${id}`)
  return res.json()
}
export async function uploadImage(formData) {
  const res = await fetch('/api/Images/uploadtest', {
    method: 'POST',
    body: formData
  });
  return res.json();
}
