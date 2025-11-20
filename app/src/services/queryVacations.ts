import { FilterDate, Vacation, Filters } from "@/types";
import api from "./api";

type QueryVacationResponse = {
  list: Array<Vacation>;
  total: number;
}

export const queryVacations = async ({onlyFollowed = false, filterDate = FilterDate.All}: Filters = {}) => {
  const result = await api.post("/vacations", { onlyFollowed, filterDate, limit: 20, offset: 0, currentPage: 0 });
  return result.data as QueryVacationResponse;
}
