import { Vacation } from "@/types";
import api from "./api";

export const getVacationById = async (id: string) => {
  const result = await api.get(`/vacation?id=${id}`);
  return result.data.vacation as Vacation;
}