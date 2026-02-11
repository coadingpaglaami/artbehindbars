"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteDialogProps {
  isOpen: boolean;
  title?: string;
  targetName: string; // 👈 the string you pass
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
}

export const DeleteDialog = ({
  isOpen,
  title = "Confirm Deletion",
  targetName,
  onClose,
  onConfirm,
}: DeleteDialogProps) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 size={18} />
            {title}
          </DialogTitle>
          <DialogDescription className="pt-2">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900">
              {targetName}
            </span>
            ?  
            <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
