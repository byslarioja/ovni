import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@tanstack/react-router";
import React from "react";
import { useBreadcrumbs } from "./useBreadcrumbs";

export function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            {index === breadcrumbs.length - 1 ? (
              <NonLinkableBreadcrumb title={breadcrumb.title} />
            ) : (
              <LinkableBreadcrumb
                title={breadcrumb.title}
                path={breadcrumb.path}
              />
            )}
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function NonLinkableBreadcrumb({ title }: NonLinkableBreadProps) {
  return (
    <BreadcrumbItem>
      <BreadcrumbLink>
        <BreadcrumbPage>{title}</BreadcrumbPage>
      </BreadcrumbLink>
    </BreadcrumbItem>
  );
}

function LinkableBreadcrumb({ title, path }: LinkableBreadProps) {
  return (
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link to={path}>{title}</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
  );
}

type NonLinkableBreadProps = { title: string };

type LinkableBreadProps = NonLinkableBreadProps & { path: string };
