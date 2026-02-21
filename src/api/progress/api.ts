import axios from "@/lib/axios";
import { PaginatedResponseDto } from "@/types/auction.type";
import { UserActivity } from "@/types/progress.type";

export const UserActivies = ({
  search,
  page,
  limit,
}: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  return axios.get<PaginatedResponseDto<UserActivity>>("/user-activities", {
    params: {
      search,
      page,
      limit,
    },
  });
};
