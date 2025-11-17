import api from "./api";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
}

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export const createUser = () => {
  throw new Error("Registration is currently disabled");
}

export const loginUser = async ({ email, password }: { email: string, password: string }) => {
  try {
    const result = await api.post("/login", { email, password });
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("user", JSON.stringify(result.data.user));
    return result.data.user as { email: string, role: string };
  } catch (error) {
    throw new Error("Invalid email or password");
  }
}