import { Vacation } from "@/types";
import api from "./api";
 
export const createVacation = async (vacation: Omit<Vacation, "id" | "count" | "isFollowedByUser">) => {
  const result = await api.post("/vacation", vacation);
  return result.data.vacation as Vacation;
}

    
