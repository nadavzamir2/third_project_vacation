import { FilterDate, Vacation, Filters } from "@/types";
import api from "./api";

type QueryVacationResponse = {
  list: Array<Vacation>;
  total: number;
}

export const queryVacations = async ({onlyFollowed = false, filterDate = FilterDate.All}: Filters = {}, limit: number, pageNumber: number) => {
  const result = await api.post("/vacations", { onlyFollowed, filterDate, limit, pageNumber });
  return result.data as QueryVacationResponse;
}

