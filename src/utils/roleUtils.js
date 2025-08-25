export const ROLE_ROUTE_MAP = {
  DONOR: "/donor/dashboard",
  HOSPITAL_STAFF: "/hospital/dashboard",
  ORGAN_BANK_STAFF: "/organbank/dashboard",
  ADMIN: "/admin/dashboard"
};
export const hasRole = (user, role) => user?.role === role;
