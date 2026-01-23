export type Role = 'visitor' | 'member' | 'admin';

export interface FeatureAccess {
  id: string;
  label: string;
  visitor: boolean;
  member: boolean;
  admin: boolean;     // usually always true, but kept editable for flexibility
}