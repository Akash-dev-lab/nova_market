import axios from "axios";

const API = "http://localhost:3000/api/auth";

// REGISTER API
export async function register(formData) {
  try {
    const payload = {
      firstName: formData.firstname,
      lastName: formData.lastname,
      email: formData.email,
      role: formData.role,
      password: formData.password,
    };

    const {data} = await axios.post(`${API}/register`, payload, {
      withCredentials: true, // because backend sets httpOnly cookie
    });

    console.log("Register response data:", data);

    return data; // contains message + user
  } catch (err) {
    throw err;
  }
}

// LOGIN API
export async function login(credentials) {
  try {
    const { data } = await axios.post(`${API}/login`, credentials, {
      withCredentials: true, // backend also sets cookie here
    });
    return data;
  } catch (err) {
    throw err;
  }
}

// CURRENT USER API
export async function getCurrentUser() {
  try {
    const { data } = await axios.get(`${API}/me`, {
      withCredentials: true, // sends cookie to backend
    });

    return data.user; // your backend returns user object
  } catch (err) {
    return null;
  }
}
