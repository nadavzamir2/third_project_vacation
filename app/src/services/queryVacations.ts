import { FilterDate, Vacation, Filters } from "@/types";
import api from "./api";

type QueryVacationResponse = {
  list: Array<Vacation>;
  total: number;
}

export const queryVacations = async ({followedOnly = false, date = FilterDate.All}: Filters = {}) => {
  const result = await api.post("/vacations", { followedOnly, date, limit: 4, offset: 0, currentPage: 0 });
  return result.data as QueryVacationResponse;
}
