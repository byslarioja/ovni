import { useRouter } from "@tanstack/react-router";

export function useBreadcrumbs() {
  const router = useRouter();

  const breadcrumbs = router.state.matches.map((match) => {
    return {
      title: match.context.title,
      path: match.pathname,
    };
  });

  return breadcrumbs.filter((_, i) => i > 0);
}
