import { Vacation } from "@/types";
import api from "./api";


export const updateVacation = async (id: number, vacation: Omit<Vacation, "id" | "count" | "isFollowedByUser">) => {
  const result = await api.put(`/vacation?id=${id}`, vacation);
  return result.data.vacation as Vacation;
}   
