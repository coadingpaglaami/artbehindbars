"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { INITIAL_FEATURES } from "@/data/admin";
import { FeatureAccess, Role } from "@/interface/admin";
import { cn } from "@/lib/utils";

import { AdminHeading } from "@/webcomponents/reusable";
import { AlertCircle, RotateCcw, Save } from "lucide-react";
import { useMemo, useState } from "react";

export const AccessControl = () => {
  const [features, setFeatures] = useState<FeatureAccess[]>(INITIAL_FEATURES);
  const [original, setOriginal] = useState<FeatureAccess[]>(INITIAL_FEATURES);

  const hasChanges = useMemo(() => {
    return JSON.stringify(features) !== JSON.stringify(original);
  }, [features, original]);

  const handleToggle = (id: string, role: Role) => {
    setFeatures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [role]: !f[role] } : f)),
    );
  };

  const handleSave = () => {
    // TODO: send to backend / API
    console.log("Saving new permissions:", features);
    setOriginal(features); // mark as saved
    // You can show toast/notification here
  };

  const handleReset = () => {
    setFeatures(original);
  };
  return (
    <div className="py-16 flex flex-col gap-6">
      <AdminHeading
        heading="Access Control"
        subheading="Manage feature access permissions for Visitors, Members, and Admins."
      />
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            {hasChanges && (
              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                  Reset
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="mr-1.5 h-3.5 w-3.5" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-1">
          {/* Table Header */}
          <div className="grid grid-cols-[minmax(200px,2fr)_repeat(3,80px)] gap-3 pb-2 border-b text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <div className="pl-1">Feature</div>
            <div className="text-center">Visitor (Public)</div>
            <div className="text-center">Member</div>
            <div className="text-center">Admin</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-border">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={cn(
                  "grid grid-cols-[minmax(100px,2fr)_repeat(3,80px)] gap-3 py-3 items-center",
                  "hover:bg-muted/40 transition-colors",
                )}
              >
                <div className="pl-1 text-sm font-medium leading-5">
                  {feature.label}
                </div>

                <div className="flex justify-center">
                  <Switch
                    checked={feature.visitor}
                    className="data-[state=checked]:bg-blue-600" 
                    onCheckedChange={() => handleToggle(feature.id, "visitor")}
                    disabled={feature.admin === false} // safety: can't allow visitor if admin is off
                  />
                </div>

                <div className="flex justify-center">
                  <Switch
                    checked={feature.member}
                    className="data-[state=checked]:bg-blue-600"
                    onCheckedChange={() => handleToggle(feature.id, "member")}
                  />
                </div>

                <div className="flex justify-center">
                  <Switch
                    checked={feature.admin}
                   className="
    data-[state=checked]:bg-blue-600
    
  "
                    onCheckedChange={() => handleToggle(feature.id, "admin")}
                    // You can add className="data-[state=checked]:bg-red-600" if you want visual warning
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Optional unsaved indicator at bottom */}
          {hasChanges && (
            <div className="mt-4 text-xs text-center text-amber-700 bg-amber-50 py-2 rounded border border-amber-200">
              You have unsaved changes • Click &quot;Save Changes&quot; to apply
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
