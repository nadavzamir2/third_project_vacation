import constate from "constate";


const useUserInternal = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  return {firstName: parsedUser?.firstName, email: parsedUser?.email, role: parsedUser?.role };
};

export const [UserProvider, useUser] = constate(useUserInternal);
