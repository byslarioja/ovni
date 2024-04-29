import { useRouter } from "@tanstack/react-router";

export function useBreadcrumbs() {
  const router = useRouter();

  const breadcrumbs = router.state.matches.map((match) => {
    return {
      title: match.context.title,
      path: match.pathname,
    };
  });

  return breadcrumbs.filter(
    (breadcrumb, index, self) =>
      index ===
      self.findIndex(
        (t) => t.path === breadcrumb.path && t.title === breadcrumb.title
      )
  );
}
