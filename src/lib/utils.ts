import { ApiErrorResponse } from "@/types/api-error";
import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(error: unknown): string {
  if (!error) return "Something went wrong";

  if (error instanceof Error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    const data = axiosError.response?.data;

    if (!data) return error.message;

    if (Array.isArray(data.message)) {
      return data.message.join(", ");
    }

    if (typeof data.message === "string") {
      return data.message;
    }
  }

  return "Something went wrong";
}


// utils/formatSuspensionMessage.ts

import { intervalToDuration, formatDuration, isPast } from "date-fns";

export function formatSuspensionMessage(message: string): string {
  const match = message.match(/until (.*)$/);

  if (!match) return message;

  const suspendedUntil = new Date(match[1]);
  const now = new Date();

  if (isPast(suspendedUntil)) {
    return "Your suspension has expired. Please try again.";
  }

  const duration = intervalToDuration({
    start: now,
    end: suspendedUntil,
  });

  const formatted = formatDuration(duration, {
    format: ["days", "hours", "minutes", "seconds"],
  });

  return `Your account is suspended for ${formatted}.`;
}