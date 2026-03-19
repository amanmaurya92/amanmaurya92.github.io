import axios from "axios";

const apiRoot = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";
const baseURL = apiRoot ? `${apiRoot}/api` : "/api";

export const api = axios.create({
  baseURL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

export async function getProfile() {
  const { data } = await api.get("/profile");
  return data.data;
}

export async function getExperiences() {
  const { data } = await api.get("/experience");
  return data.data || [];
}

export async function getProjects(params = {}) {
  const { data } = await api.get("/projects", { params });
  return data.data || [];
}

export async function getProject(id) {
  const { data } = await api.get(`/projects/${id}`);
  return data.data;
}

export async function submitContact(payload) {
  const { data } = await api.post("/contact", payload);
  return data;
}
