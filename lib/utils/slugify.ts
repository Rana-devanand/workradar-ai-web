export const slugifyOrg = (name?: string): string => {
  if (!name) return "workspace";
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "workspace"
  );
};

