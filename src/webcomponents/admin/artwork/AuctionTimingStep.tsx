"use client";

import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  type ForwardedRef,
} from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock, Gavel, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AuctionResponseDto } from "@/types/auction.type";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuctionTimingStepProps {
  createdArtworkId: string;
  onAuctionSuccess: (auction: AuctionResponseDto) => void;
  onAuctionSkip: () => void;
  isPending: boolean;
  onSubmitAuction: (payload: {
    artworkId: string;
    startAt: string;
    endAt: string;
  }) => void;
  error: string | null;
}

export interface AuctionTimingStepRef {
  submit: () => void;
}

interface DateTimeValue {
  date: Date | undefined;
  time: string;
}

// ─── Inner render function — typed separately so forwardRef gets clean generics
function AuctionTimingStepInner(
  props: AuctionTimingStepProps,
  ref: ForwardedRef<AuctionTimingStepRef>,
) {
  const {
    createdArtworkId,
    onAuctionSuccess: _onAuctionSuccess, // kept for prop interface compatibility
    onAuctionSkip,
    isPending,
    onSubmitAuction,
    error,
  } = props;

  const today = new Date();

  const [startDateTime, setStartDateTime] = useState<DateTimeValue>({
    date: today,
    time: format(today, "HH:mm"),
  });

  const [endDateTime, setEndDateTime] = useState<DateTimeValue>({
    date: undefined,
    time: "23:59",
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const buildDateTime = (dt: DateTimeValue): Date => {
    if (!dt.date) return new Date(0);
    const [hours, minutes] = dt.time.split(":").map(Number);
    const result = new Date(dt.date);
    result.setHours(hours, minutes, 0, 0);
    return result;
  };

  const toBackendISO = (dt: DateTimeValue): string =>
    buildDateTime(dt)
      .toISOString()
      .replace(/\.\d{3}Z$/, "Z");

  useEffect(() => {
    if (startDateTime.date && endDateTime.date) {
      const startFull = buildDateTime(startDateTime);
      const endFull = buildDateTime(endDateTime);
      setValidationError(
        endFull <= startFull
          ? "End date/time must be after start date/time"
          : null,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDateTime, endDateTime]);

  // ✅ No generics needed here — ref is already typed via ForwardedRef<AuctionTimingStepRef>
  useImperativeHandle(ref, () => ({
    submit: () => {
      if (!startDateTime.date) {
        setValidationError("Please select a start date");
        return;
      }
      if (!endDateTime.date) {
        setValidationError("Please select an end date");
        return;
      }
      const startFull = buildDateTime(startDateTime);
      const endFull = buildDateTime(endDateTime);
      if (endFull <= startFull) {
        setValidationError("End date/time must be after start date/time");
        return;
      }
      setValidationError(null);
      onSubmitAuction({
        artworkId: createdArtworkId,
        startAt: toBackendISO(startDateTime),
        endAt: toBackendISO(endDateTime),
      });
    },
  }));

  const displayError = validationError || error;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Gavel size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Auction Details
          </h3>
          <p className="text-sm text-gray-500">
            Set when your auction starts and ends
          </p>
        </div>
      </div>

      {/* Artwork Created Confirmation */}
      <div
        className="flex items-start gap-3 p-3 rounded-lg border"
        style={{ backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" }}
      >
        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-white text-xs font-bold">✓</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-green-900">
            Artwork uploaded successfully!
          </p>
          <p className="text-xs text-green-700 mt-0.5 font-mono break-all">
            ID: {createdArtworkId}
          </p>
        </div>
      </div>

      {/* Start Date & Time */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Start Date & Time <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDateTime.date && "text-muted-foreground",
                )}
              >
                <CalendarIcon size={16} className="mr-2 shrink-0" />
                {startDateTime.date
                  ? format(startDateTime.date, "MMM dd, yyyy")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDateTime.date}
                onSelect={(date) =>
                  setStartDateTime((prev) => ({
                    ...prev,
                    date: date ?? undefined,
                  }))
                }
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                autoFocus
              />
            </PopoverContent>
          </Popover>

          <div className="relative">
            <Clock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <Input
              type="time"
              value={startDateTime.time}
              onChange={(e) =>
                setStartDateTime((prev) => ({
                  ...prev,
                  time: e.target.value,
                }))
              }
              className="pl-9"
              
            />
          </div>
        </div>
        {startDateTime.date && (
          <p className="text-xs text-gray-400 font-mono">
            →{" "}
            <span className="text-primary">{toBackendISO(startDateTime)}</span>
          </p>
        )}
      </div>

      {/* End Date & Time */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          End Date & Time <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDateTime.date && "text-muted-foreground",
                )}
              >
                <CalendarIcon size={16} className="mr-2 shrink-0" />
                {endDateTime.date
                  ? format(endDateTime.date, "MMM dd, yyyy")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDateTime.date}
                onSelect={(date) =>
                  setEndDateTime((prev) => ({
                    ...prev,
                    date: date ?? undefined,
                  }))
                }
                disabled={(date) => {
                  const minDate = startDateTime.date
                    ? new Date(
                        startDateTime.date.getFullYear(),
                        startDateTime.date.getMonth(),
                        startDateTime.date.getDate(),
                      )
                    : new Date(new Date().setHours(0, 0, 0, 0));
                  return date < minDate;
                }}
                autoFocus
              />
            </PopoverContent>
          </Popover>

          <div className="relative">
            <Clock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <Input
              type="time"
              value={endDateTime.time}
              onChange={(e) =>
                setEndDateTime((prev) => ({
                  ...prev,
                  time: e.target.value,
                }))
              }
              className="pl-9"
            />
          </div>
        </div>
        {endDateTime.date && (
          <p className="text-xs text-gray-400 font-mono">
            → <span className="text-primary">{toBackendISO(endDateTime)}</span>
          </p>
        )}
      </div>

      {/* Duration Preview */}
      {startDateTime.date && endDateTime.date && !validationError && (
        <div
          className="p-3 rounded-lg border"
          style={{ backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }}
        >
          <p className="text-xs font-medium text-blue-900 mb-0.5">
            Auction Duration
          </p>
          <p className="text-sm text-blue-700 font-semibold">
            {(() => {
              const diffMs =
                buildDateTime(endDateTime).getTime() -
                buildDateTime(startDateTime).getTime();
              const d = Math.floor(diffMs / 86400000);
              const h = Math.floor((diffMs % 86400000) / 3600000);
              const m = Math.floor((diffMs % 3600000) / 60000);
              return (
                [d > 0 && `${d}d`, h > 0 && `${h}h`, m > 0 && `${m}m`]
                  .filter(Boolean)
                  .join(" ") || "Less than a minute"
              );
            })()}
          </p>
        </div>
      )}

      {/* Error */}
      {displayError && (
        <div
          className="p-3 rounded-lg border flex items-start gap-2"
          style={{ backgroundColor: "#FEF2F2", borderColor: "#FECACA" }}
        >
          <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{displayError}</p>
        </div>
      )}

      {/* Skip */}
      <p className="text-xs text-gray-500 text-center">
        You can also{" "}
        <button
          type="button"
          onClick={onAuctionSkip}
          className="text-primary underline hover:no-underline font-medium"
          disabled={isPending}
        >
          skip auction setup
        </button>{" "}
        and configure it later.
      </p>
    </div>
  );
}

// ✅ forwardRef wraps the named inner function — no inline generics needed
// TypeScript infers T and P correctly from the function signature above
export const AuctionTimingStep = forwardRef(AuctionTimingStepInner);
