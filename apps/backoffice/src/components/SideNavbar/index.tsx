import { useState } from "react";
import { Nav, NavLinkType } from "./nav";
import {
  ChevronRight,
  ChevronLeft,
  Users,
  Video,
  Settings,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function SideNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNav = () => setIsCollapsed((prev) => !prev);

  return (
    <div
      className={cn(
        "relative border-r px-3 pb-10 pt-24",
        isCollapsed ? "min-w-[80px]" : "min-w-[200px] sm:mid-w-[150px]"
      )}
    >
      <div className="absolute right-[-20px] top-7">
        <Button
          variant="secondary"
          className="rounded-full p-2 border"
          onClick={toggleNav}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <Nav links={links} isCollapsed={isCollapsed} />
    </div>
  );
}

const links: NavLinkType[] = [
  {
    title: "Usuarios",
    icon: Users,
    href: "/users",
  },
  {
    title: "Videos",
    label: "9",
    icon: Video,
    href: "/videos",
  },
  {
    title: "Configuración",
    icon: Settings,
    href: "/settings",
  },
];
