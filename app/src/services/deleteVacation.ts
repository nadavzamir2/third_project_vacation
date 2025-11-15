import { Vacation } from "@/types";
import api from "./api";
 
export const deleteVacation = async (id: number) => {
  await api.delete(`/vacation?id=${id}`);
}
