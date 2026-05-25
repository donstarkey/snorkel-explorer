import { getApiBase } from "../utils/getApiBase";

// GET ALL DESTINATIONS
export async function getDestinations() {
  const API = getApiBase();
  const res = await fetch(`${API}/api/Destinations`);
  return res.json();
}

// GET SINGLE DESTINATION
export async function getDestination(id) {
  const API = getApiBase();
  const res = await fetch(`${API}/api/Destinations/${id}`);
  return res.json();
}

// GET TOP 10 DESTINATIONS
export async function getTop10() {
  const API = getApiBase();
  const res = await fetch(`${API}/api/Top10`);
  return res.json();
}

// IMAGE UPLOAD
export async function uploadImage(formData) {
  const API = getApiBase();
  const res = await fetch(`${API}/api/Images/uploadtest`, {
    method: "POST",
    body: formData
  });

  return res.json();
}
