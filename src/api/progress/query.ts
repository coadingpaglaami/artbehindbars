import { useQuery } from "@tanstack/react-query";
import { UserActivies } from "./api";

export const useGetUserActivities = ({
  search,
  page = 1,
  limit = 10,
}: {
  search?: string;
  page?: number;
  limit?: number;
}) =>
  useQuery({
    queryKey: ["user-activities", { search, page, limit }],
    queryFn: () => UserActivies({ search, page, limit }),
  });
