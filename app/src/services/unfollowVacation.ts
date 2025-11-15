import api from "./api";

export const unfollowVacation = async (id: number) => {
    await api.post(`/vacation/unfollow`, { vacationId: id });
}