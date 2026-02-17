/** Admin allowlist email (server truth - use env) */
export const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "md.ragy@gmail.com";

export function isAllowedAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase().trim();
}
