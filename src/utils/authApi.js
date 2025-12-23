import axios from "axios";

// Set axios default baseURL to avoid URL conflicts
const axiosInstance = axios.create({
	baseURL: "https://nova-auth-service.onrender.com",
	withCredentials: true,
});

// REGISTER API
export async function register(formData) {
	try {
		const payload = {
			firstName: formData.firstname,
			lastName: formData.lastname || formData.firstname,
			email: formData.email,
			password: formData.password,
			role: formData.role,
		};
		const { data } = await axiosInstance.post(`/api/auth/register`, payload);
		return data;
	} catch (err) {
		console.error("Register error:", err?.response?.data || err.message);
		throw err;
	}
}

// LOGIN API
export async function login(credentials) {
	try {
		const payload = {
			email: credentials.email,
			password: credentials.password,
		};
		const { data } = await axiosInstance.post(`/api/auth/login`, payload);
		return data;
	} catch (err) {
		console.error("Login error:", err?.response?.data || err.message);
		throw err;
	}
}

// CURRENT USER API
export async function getCurrentUser() {
	try {
		const { data } = await axiosInstance.get(`/api/auth/me`);
		return data;
	} catch (err) {
		console.warn("Failed to fetch user:", err?.response?.data || err.message);
		return null;
	}
}

// LOGOUT API
export async function logout() {
	try {
		const { data } = await axiosInstance.get(`/api/auth/logout`);
		return data;
	} catch (err) {
		console.error("Logout error:", err?.response?.data || err.message);
		throw err;
	}
}
