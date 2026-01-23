import { FeatureAccess } from "@/interface/admin";

export const INITIAL_FEATURES: FeatureAccess[] = [
  { id: "view-home-about",        label: "View Home / About",         visitor: true,  member: true,  admin: true },
  { id: "view-shop-art",          label: "View Shop Art",             visitor: true,  member: true,  admin: true },
  { id: "purchase-bid",           label: "Purchase / Bid",            visitor: false, member: true,  admin: true },
  { id: "view-artist-profiles",   label: "View Artist Profiles",      visitor: false, member: true,  admin: true },
  { id: "connect-forum",          label: "CONNECT Forum",             visitor: false, member: true,  admin: true },
  { id: "send-fan-mail",          label: "Send Fan Mail",             visitor: false, member: true,  admin: true },
  { id: "delete-posts-ban",       label: "Delete Posts / Ban Users",  visitor: false, member: false, admin: true },
  { id: "post-anonymous",         label: "Post Anonymous",            visitor: false, member: true,  admin: true },
  { id: "post-anonymous-art",     label: "Post Anonymous Art",        visitor: false, member: false, admin: true },
];