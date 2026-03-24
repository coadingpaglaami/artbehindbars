"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "./api";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      queryClient.setQueryData(["me"], null); // 🔥 immediately mark user logged out
      window.location.href = "/login"; // hard redirect to clear any in-memory state
    },
  });
};
