import { FilterDate, Vacation } from "@/types";
import api from "./api";


export const updateVacation = async (id: number, vacation: Vacation) => {
  const result = await api.put(`/vacation?id=${id}`, vacation);
  return result.data.vacation as Vacation;
}   
