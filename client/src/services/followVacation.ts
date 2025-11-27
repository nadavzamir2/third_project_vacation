import api from "./api";

export const followVacation = async (id: number) => {
  await api.post(`/vacation/follow`, { vacationId: id });
}
