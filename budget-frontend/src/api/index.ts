const API_BASE_URL = "http://localhost:4000";

// Utility function to get the auth token from local storage
const getAuthToken = () => {
  return localStorage.getItem("auth-token");
};

// Utility function to handle API requests
const request = async (
  url: string,
  method: string = "GET",
  body?: any
) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const token = getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${url}`, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const api = {
  // Auth API
  login: (data: { email: string; password: string }) =>
    request("/login", "POST", data),

  signup: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    budget: string;
  }) => request("/signup", "POST", data),

  // Profile API
  getProfile: () => request("/profile"),
  updateProfile: (data: any) => request("/profile", "PUT", data),

  // Users API
  getUsers: () => request("/users"),
  updateUser: (id: string, data: any) =>
    request(`/users/${id}`, "PUT", data),
  deleteUser: (id: string) => request(`/users/${id}`, "DELETE"),

  // Expenses API
  getExpenses: () => request("/expenses"),
  createExpense: (data: { title: string; price: number; date: Date }) =>
    request("/expenses", "POST", data),
  updateExpense: (id: string, data: { title: string; price: number; date: Date }) =>
    request(`/expenses/${id}`, "PUT", data),
  deleteExpense: (id: string) => request(`/expenses/${id}`, "DELETE"),

  // Notifications API
  getNotifications: () => request("/notifications"),

  getMonthlyExpenses: () => request("/expenses/monthly"),
};
